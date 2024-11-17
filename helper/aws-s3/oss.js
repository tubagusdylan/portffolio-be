const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const wrapper = require("../queryWrapper");
const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const userAccessKey = process.env.USER_ACCESS_KEY;
const userSecretKey = process.env.USER_SECRET_KEY;
const cloudFrontDistId = process.env.DISTRIBUTION_ID;

const s3 = new S3Client({
  credentials: {
    accessKeyId: userAccessKey,
    secretAccessKey: userSecretKey,
  },
  region: bucketRegion,
});

const cloudfront = new CloudFrontClient({
  credentials: {
    accessKeyId: userAccessKey,
    secretAccessKey: userSecretKey,
  },
  region: bucketRegion,
});

const addObjectStream = async (params) => {
  try {
    const newParams = {
      ...params,
      Bucket: bucketName,
    };
    const command = new PutObjectCommand(newParams);
    await s3.send(command);
    return wrapper.data("Adding object success");
  } catch (error) {
    return wrapper.error("Error adding object");
  }
};

const getObjectStream = async (params) => {
  try {
    const url = `https://d2w25xmwp9od60.cloudfront.net/${params.Key}`;
    return wrapper.data(url);
  } catch (error) {
    return wrapper.error("Error getting object");
  }
};

const deleteObjectStream = async (params) => {
  try {
    const newParams = {
      ...params,
      Bucket: bucketName,
    };
    const command = new DeleteObjectCommand(newParams);
    await s3.send(command);

    const invalidationParams = {
      DistributionId: cloudFrontDistId,
      InvalidationBatch: {
        CallerReference: params.Key,
        Paths: {
          Quantity: 1,
          Items: ["/" + params.Key],
        },
      },
    };

    const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
    await cloudfront.send(invalidationCommand);

    return wrapper.data("Deleting object success");
  } catch (error) {
    return wrapper.error("Error deleting object");
  }
};

module.exports = {
  addObjectStream,
  getObjectStream,
  deleteObjectStream,
};
