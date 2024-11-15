const response = require("../../../helper/responseWrapper");
const query = require("./query");
const jwt = require("jsonwebtoken");

const getUsersHandler = async (req, res) => {
  const users = await query.findAll();
  if (users.err) {
    return response.notFound(res, users.message);
  }
  return response.success(res, { message: "Success get users data", data: users.data });
};

const getDetailUserHandler = async (req, res) => {
  const id = req.params.id;
  const user = await query.findOne(id);
  if (user.err) {
    return response.notFound(res, user.message);
  }
  return response.success(res, { message: "Success get user data", data: user.data });
};

const getRefreshTokenHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return response.unAuthorized(res, "User Unauthorized");
  }

  const isUserExist = await query.findOneByToken(refreshToken);
  if (isUserExist.err) {
    return response.forbidden(res, "Forbidden user");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      return response.forbidden(res, "Invalid token");
    }
  });

  const id = isUserExist.data.id;
  const username = isUserExist.data.username;
  const profileName = isUserExist.data.profile_name;
  const isAdmin = isUserExist.data.is_admin;

  const accessToken = jwt.sign({ id, username, profileName, isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  return response.success(res, {
    message: "Get token success",
    data: {
      token: accessToken,
    },
  });
};

module.exports = {
  getDetailUserHandler,
  getUsersHandler,
  getRefreshTokenHandler,
};
