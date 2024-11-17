const response = require("../../../helper/responseWrapper");
const query = require("./query");
const oss = require("../../../helper/aws-s3/oss");

const getDetailImageHandler = async (req, res) => {
  const id = req.params.id;
  const image = await query.findOne(id);
  if (image.err) {
    return response.notFound(res, image.message);
  }

  const url = await oss.getObjectStream({ Key: image.data.name });
  if (url.err) {
    return response.internalServerError(res, url.message);
  }

  const mappedData = {
    ...image.data,
    url: url.data,
  };

  return response.success(res, {
    message: "Success get image data",
    data: mappedData,
  });
};

const getImagesHandler = async (req, res) => {
  const { project_id } = req.query;
  const images = await query.findAll(project_id);
  if (images.err) {
    return response.notFound(res, images.message);
  }

  let index = 0;
  for (const image of images.data) {
    const url = await oss.getObjectStream({ Key: image.name });
    if (url.err) {
      return response.internalServerError(res, url.message);
    }
    images.data[index].url = url.data;
    index++;
  }

  return response.success(res, {
    message: "Success get images data",
    data: images.data,
  });
};

module.exports = {
  getDetailImageHandler,
  getImagesHandler,
};
