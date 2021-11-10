const conn = require('knex')({
    client: 'mysql2',
    debug: process.env.APP_ENVIRONMENT == 'development' ? true : false,
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    }
});

module.exports = conn;