const data = (data) => {
  return { err: false, data: data };
};

const error = (message) => {
  return { err: true, message: message };
};

module.exports = {
  data,
  error,
};
