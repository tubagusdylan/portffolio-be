const success = (res, body) => {
  const { message, data = null } = body;
  return res.status(200).json({
    code: 200,
    success: true,
    message: message,
    data: data,
  });
};

const successPagination = (res, body) => {
  const { message, data = null, meta = null } = body;
  return res.status(200).json({
    code: 200,
    success: true,
    message: message,
    data: data,
    meta: meta,
  });
};

const created = (res, body) => {
  const { message, data } = body;
  return res.status(201).json({
    code: 201,
    success: true,
    message: message,
    data: data,
  });
};

const notFound = (res, message) => {
  return res.status(404).json({
    code: 404,
    success: false,
    message: message,
  });
};

const badRequest = (res, message) => {
  return res.status(400).json({
    code: 400,
    success: false,
    message: message,
  });
};

const internalServerError = (res, message) => {
  return res.status(500).json({
    code: 500,
    success: false,
    message: message,
  });
};

const unAuthorized = (res, message) => {
  return res.status(401).json({
    code: 401,
    success: false,
    message: message,
  });
};

const forbidden = (res, message) => {
  return res.status(403).json({
    code: 403,
    success: false,
    message: message,
  });
};

module.exports = {
  success,
  successPagination,
  created,
  notFound,
  badRequest,
  internalServerError,
  unAuthorized,
  forbidden,
};
