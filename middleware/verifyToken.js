const jwt = require("jsonwebtoken");
const response = require("../helper/responseWrapper");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return response.unAuthorized(res, "User Unauthorized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return response.forbidden(res, "Token expired");
    }
    req.username = decoded.username;
    req.is_admin = decoded.isAdmin;
    next();
  });
};

module.exports = verifyToken;
