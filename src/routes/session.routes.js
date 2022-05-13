const { Router } = require("express");
const { getLogin, postLogin } = require("../controller/login.controller.js");
const logout = require("../controller/logout.controller.js");
const sessionRouter = Router();
let userName;

sessionRouter.post("/login", postLogin);
sessionRouter.get("/login", getLogin);
sessionRouter.get("/logout", logout);

module.exports = sessionRouter;
