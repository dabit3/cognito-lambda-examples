
const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const BUCKET = process.env.BUCKET
const WIDTH = 100
const HEIGHT = 100

exports.handler = async (event, context) => {
  const KEY = event.Records[0].s3.object.key;
  const parts = key.split('/');
  const FOLDER = parts[0];
  const FILE = parts[1];

  try {
    const image = await s3.getObject({ Bucket: BUCKET, Key: KEY }).promise();

    const resizedImg = await sharp(image.Body).resize(WIDTH, HEIGHT).max().toFormat('jpeg').toBuffer();
    await s3.putObject({ Bucket, Body: resizedImg, Key: `${FOLDER}/thumbnail-${FILE}` }).promise();

    context.succeed();
  }
  catch(err) {
    context.fail(`Error resizing files: ${err}`);
  }
}