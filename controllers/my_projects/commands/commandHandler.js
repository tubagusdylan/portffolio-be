const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const userQuery = require("../../users/queries/query");
const command = require("./command");
const { nanoid } = require("nanoid");

const addProjectHandler = async (req, res) => {
  const { user_id } = req.body;

  const isUserExist = await userQuery.findOne(user_id);
  if (isUserExist.err) {
    return response.notFound(res, "User not found");
  }

  const body = {
    id: `proj-${nanoid(20)}`,
    ...req.body,
  };

  const result = await command.insertOne(body);
  if (result.err) {
    return response.internalServerError(res, "Error adding project");
  }
  return response.created(res, {
    message: result.data,
    data: { id: body.id },
  });
};

const updateProjectHandler = async (req, res) => {
  const { title, tech_stack, github_url, web_url } = req.body;
  const id = req.params.id;

  if (!title && !tech_stack && !github_url && web_url) {
    return response.badRequest(res, "No data to update");
  }

  const isProjectExist = await query.findOne(id);
  if (isProjectExist.err) {
    return response.notFound(res, "Project not found");
  }

  const result = await command.updateOne(req.body, id);
  if (result.err) {
    return response.internalServerError(res, "Error updating project");
  }
  return response.success(res, {
    message: result.data,
    data: { id: id },
  });
};

const deleteProjectHandler = async (req, res) => {
  const id = req.params.id;

  const isProjectExist = await query.findOne(id);
  if (isProjectExist.err) {
    return response.notFound(res, "Project not found");
  }

  const result = await command.deleteOne(id);
  if (result.err) {
    return response.internalServerError(res, "Error deleting project");
  }
  return response.success(res, { message: result.data });
};

module.exports = {
  addProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
};
