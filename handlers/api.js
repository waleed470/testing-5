// handlers/api.js
const { Client } = require('pg');

module.exports.handler = async (event) => {
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: 'admin',
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
  
  await client.connect();
  const res = await client.query('SELECT NOW()');
  await client.end();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Data saved', time: res.rows[0].now })
  };
}