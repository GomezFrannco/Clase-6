const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  try {
    res.status(200).render("main");
  } catch (e) {
    res.status(200).render("emptyList");
  }
});

module.exports = indexRouter;
