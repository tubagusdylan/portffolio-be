const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const command = require("./command");
const { nanoid } = require("nanoid");

const addTestimonieHandler = async (req, res) => {
  const body = {
    id: `tsms-${nanoid(20)}`,
    ...req.body,
  };

  const result = await command.insertOne(body);
  if (result.err) {
    return response.internalServerError(res, "Error adding testimonie");
  }
  return response.created(res, {
    message: result.data,
    data: { id: body.id },
  });
};

const deleteTestimonieHandler = async (req, res) => {
  const id = req.params.id;

  const isTestimonieExist = await query.findOne(id);
  if (isTestimonieExist.err) {
    return response.notFound(res, "Testimonie not found");
  }

  const result = await command.deleteOne(id);
  if (result.err) {
    return response.internalServerError(res, "Error deleting testimonie");
  }
  return response.success(res, { message: result.data });
};

module.exports = {
  addTestimonieHandler,
  deleteTestimonieHandler,
};
