const response = require("../../../helper/responseWrapper");
const query = require("../queries/query");
const blogQuery = require("../../blogs/queries/query");
const command = require("./command");
const { nanoid } = require("nanoid");
const oss = require("../../../helper/aws-s3/oss");

const addImageHandler = async (req, res) => {
  const { blog_id } = req.body;
  const file = req.file;

  const isBlogExist = await blogQuery.findOne(blog_id);
  if (isBlogExist.err) {
    return response.notFound(res, "Blog not found");
  }

  const queryParam = {
    ...req.body,
    id: `img-blog-${nanoid(20)}`,
    name: `${req.body.name}-${nanoid(16)}`,
  };

  const dbResult = await command.insertOne(queryParam);
  if (dbResult.err) {
    return response.internalServerError(res, "Error adding imagee");
  }

  const objParam = {
    Key: queryParam.name,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const ossResult = await oss.addObjectStream(objParam);
  if (ossResult.err) {
    return response.internalServerError(res, "Error uploading image");
  }

  return response.created(res, {
    message: ossResult.data,
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
