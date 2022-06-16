const dotenv = require("dotenv");
dotenv.config();

const config = {
  client: "better-sqlite3",
  connection: {
    filename: "./src/db/mySQL/productos.sqlite"
  },
  useNullAsDefault: true,
};

module.exports = { config };
