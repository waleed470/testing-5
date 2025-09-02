// handlers/queue.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    await s3.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: `data/${Date.now()}.json`,
      Body: record.body
    }).promise();
  }
  
  return { status: 'Data stored in S3' };
}