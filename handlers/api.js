const { Client } = require('pg');

module.exports.handler = async (event) => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    await client.connect();
    const res = await client.query('SELECT NOW() as current_time');
    await client.end();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        message: 'Database connection successful!', 
        current_time: res.rows[0].current_time,
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
        error: 'Database connection failed',
        message: error.message,
        details: {
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          user: process.env.DB_USERNAME
        }
      })
    };
  }
}