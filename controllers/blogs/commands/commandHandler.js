const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const userQuery = require("../../users/queries/query");
const command = require("./command");
const { nanoid } = require("nanoid");

const addBlogHandler = async (req, res) => {
  const { writer_id } = req.body;

  const isUserExist = await userQuery.findOne(writer_id);
  if (isUserExist.err) {
    return response.notFound(res, "User not found");
  }

  const bodyParams = {
    id: `blog-${nanoid(20)}`,
    ...req.body,
  };

  const result = await command.insertOne(bodyParams);
  if (result.err) {
    return response.internalServerError(res, "Error adding blog");
  }
  return response.created(res, {
    message: result.data,
    data: { id: bodyParams.id },
  });
};

const updateBlogHandler = async (req, res) => {
  const { title, body, category, tags } = req.body;
  const id = req.params.id;

  if (!title && !body && !category && !tags) {
    return response.badRequest(res, "No data to update");
  }

  const isBlogExist = await query.findOne(id);
  if (isBlogExist.err) {
    return response.notFound(res, "Blog not found");
  }

  const result = await command.updateOne(req.body, id);
  if (result.err) {
    return response.internalServerError(res, "Error updating blog");
  }
  return response.success(res, {
    message: result.data,
    data: { id: id },
  });
};

const deleteBlogHandler = async (req, res) => {
  const id = req.params.id;

  const isBlogExist = await query.findOne(id);
  if (isBlogExist.err) {
    return response.notFound(res, "Blog not found");
  }

  const result = await command.deleteOne(id);
  if (result.err) {
    return response.internalServerError(res, "Error deleting blog");
  }
  return response.success(res, { message: result.data });
};

module.exports = {
  addBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
};
