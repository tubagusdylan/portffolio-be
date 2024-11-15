const multer = require("multer");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const wrapper = require("../queryWrapper");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const userAccessKey = process.env.USER_ACCESS_KEY;
const userSecretKey = process.env.USER_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: userAccessKey,
    secretAccessKey: userSecretKey,
  },
  region: bucketRegion,
});

/* 
    params= {
        Bucket: bucketName
        Key: image-nanoid(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
*/

const addObjectStream = async (params) => {
  const newParams = {
    ...params,
    Bucket: bucketName,
  };

  const command = new PutObjectCommand(newParams);
  try {
    await s3.send(command);
    return wrapper.data("Adding object success");
  } catch (error) {
    return wrapper.error("Error adding object");
  }
};

const getObjectStream = async (params) => {
  const newParams = {
    ...params,
    Bucket: bucketName,
  };
  const command = new GetObjectCommand(newParams);
  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    return wrapper.data({ url: url });
  } catch (error) {
    return wrapper.error("Error getting object");
  }
};

const deleteObjectStream = async (params) => {
  const newParams = {
    ...params,
    Bucket: bucketName,
  };

  const command = new DeleteObjectCommand(newParams);
  try {
    await s3.send(command);
    return wrapper.data("Deleting object success");
  } catch (error) {
    return wrapper.error("Error deleting object");
  }
};

module.exports = {
  upload,
  addObjectStream,
  getObjectStream,
  deleteObjectStream,
};
