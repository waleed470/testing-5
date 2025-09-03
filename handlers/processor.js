const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  try {
    // Simple processing without SNS
    const data = JSON.parse(event.body || '{}');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        status: 'Data processed successfully',
        input: data,
        environment: process.env.STAGE
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Processing failed',
        message: error.message
      })
    };
  }
};