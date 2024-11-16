const response = require("../helper/responseWrapper");

const checkAdmin = async (req, res, next) => {
  if (!req.is_admin) {
    return response.forbidden(res, "This user is not admin, you can't delete data");
  }
  next();
};

module.exports = checkAdmin;
