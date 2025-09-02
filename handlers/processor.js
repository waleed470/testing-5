// handlers/processor.js
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.handler = async (event) => {
  await sns.publish({
    Message: JSON.stringify(event),
    TopicArn: process.env.SNS_TOPIC_ARN
  }).promise();
  
  return { status: 'Message processed' };
}