const { Router } = require("express");
const index = require("../controller/index.controller.js");
const { user } = require("../controller/login.controller.js");
const auth = require("../middlewares/auth.middlewares.js");
const indexRouter = Router();
let userName;

indexRouter.post("/login", user);
indexRouter.get("/", auth, index);

module.exports = indexRouter;
