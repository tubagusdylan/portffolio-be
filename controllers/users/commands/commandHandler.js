const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const command = require("./command");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const addUserHandler = async (req, res) => {
  const { username, password, profileName, isAdmin } = req.body;

  const isUsernameExist = await query.findOneByUsername(username);
  if (!isUsernameExist.err) {
    return response.badRequest(res, "Username is exist, try another");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const id = `user-${nanoid()}`;

  const result = await command.insertOne({ id, username, password: hashPassword, profileName, isAdmin });

  if (result.err) {
    return response.internalServerError(res, "Error adding user");
  }

  return response.created(res, { message: result.data, data: { id: id } });
};

const updateUserHandler = async (req, res) => {
  const { username, password, profileName, isAdmin } = req.body;
  const id = req.params.id;

  if (!username && !password && !profileName && !isAdmin) {
    return response.badRequest(res, "No data to update");
  }

  const isUserExist = await query.findOne(id);
  if (isUserExist.err) {
    return response.notFound(res, isUserExist.message);
  }

  const isUsernameExist = await query.findOneByUsername(username);
  if (!isUsernameExist.err) {
    return response.badRequest(res, "Username is exist, try another");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const result = await command.updateOne({ username, password: hashPassword, profileName, isAdmin }, id);
  if (result.err) {
    return response.internalServerError(res, "Error updating user");
  }
  return response.success(res, { message: result.data, data: { id: id } });
};

const deleteUserHandler = async (req, res) => {
  const id = req.params.id;

  const isUserExist = await query.findOne(id);
  if (isUserExist.err) {
    return response.notFound(res, isUserExist.message);
  }

  if (isUserExist.data.profile_name === "Super Admin") {
    return response.badRequest(res, "Deleting Super Admin is forbidden");
  }

  const result = await command.deleteOne(id);
  if (result.err) {
    return response.internalServerError(res, "Error deleting user");
  }

  return response.success(res, { message: result.data });
};

const loginHandler = async (req, res) => {
  const { username, password } = req.body;

  const isUserExist = await query.findOneByUsername(username);
  if (isUserExist.err) {
    return response.notFound(res, "Wrong username");
  }

  const matchPassword = await bcrypt.compare(password, isUserExist.data.password);
  if (!matchPassword) {
    return response.badRequest(res, "Wrong password");
  }

  const id = isUserExist.data.id;
  const profileName = isUserExist.data.profile_name;
  const isAdmin = isUserExist.data.is_admin;
  const accessToken = jwt.sign(
    {
      id,
      username,
      profileName,
      isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    {
      id,
      username,
      profileName,
      isAdmin,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const result = await command.updateRefreshToken(refreshToken, id);
  if (result.err) {
    return response.internalServerError(res, "Error updating token");
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return response.success(res, {
    message: "Login success",
    data: {
      token: accessToken,
    },
  });
};

const logoutHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return response.unAuthorized(res, "User unauthorized");
  }

  const isUserExist = await query.findOneByToken(refreshToken);
  if (isUserExist.err) {
    return response.notFound(res, "User not found");
  }

  const id = isUserExist.data.id;
  const result = await command.updateRefreshToken(null, id);
  if (result.err) {
    return response.internalServerError(res, "Error updating token");
  }

  res.clearCookie("refreshToken");
  return response.success(res, { message: "Logout success" });
};

module.exports = {
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
  logoutHandler,
};
