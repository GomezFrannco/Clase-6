const dotenv = require("dotenv");
dotenv.config();

const config = {
  client: "mysql2",
  connection: {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
  },
};

module.exports = { config };
