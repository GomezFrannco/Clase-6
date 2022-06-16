const { Server } = require("./app.js");
const dotenv = require("dotenv");

dotenv.config();

const app = new Server(process.env.PORT);
app.listen();
