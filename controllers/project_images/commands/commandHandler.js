const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const projectQuery = require("../../my_projects/queries/query");
const command = require("./command");
const { nanoid } = require("nanoid");
const oss = require("../../../helper/aws-s3/oss");

const addImageHandler = async (req, res) => {
  const { project_id } = req.body;
  const file = req.file;

  const isProjectExist = await projectQuery.findOne(project_id);
  if (isProjectExist.err) {
    return response.notFound(res, "Project not found");
  }

  const queryParam = {
    ...req.body,
    id: `img-project-${nanoid(20)}`,
    name: `${req.body.name}-${nanoid(16)}`,
  };

  const objParam = {
    Key: queryParam.name,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const ossResult = await oss.addObjectStream(objParam);
  if (ossResult.err) {
    return response.internalServerError(res, "Error uploading image");
  }

  const dbResult = await command.insertOne(queryParam);
  if (dbResult.err) {
    return response.internalServerError(res, "Error adding image");
  }

  return response.created(res, {
    message: dbResult.data,
    data: { id: queryParam.id },
  });
};

const deleteImageHandler = async (req, res) => {
  const id = req.params.id;

  const isImageExist = await query.findOne(id);
  if (isImageExist.err) {
    return response.notFound(res, "Image not found");
  }

  const ossResult = await oss.deleteObjectStream({ Key: isImageExist.data.name });
  if (ossResult.err) {
    return response.internalServerError(res, "Error deleting image from oss");
  }

  const dbResult = await command.deleteOne(id);
  if (dbResult.err) {
    return response.internalServerError(res, "Error deleting image");
  }

  return response.success(res, { message: dbResult.data });
};

module.exports = {
  addImageHandler,
  deleteImageHandler,
};
