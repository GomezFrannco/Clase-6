const { Router } = require("express");
const { db } = require("../controller/products.js");
const test = require("../controller/faker.controller.js");
const auth = require("../middlewares/auth.middlewares.js");

const apiRouter = Router();

apiRouter.get("/productos", auth, (_req, res) => {
  try {
    db.getProducts().then((val) => res.status(200).json(val));
  } catch (e) {
    res.status(500).json({
      error: "Something unexpected happened!",
    });
  }
});

apiRouter.get("/productos-test", auth, (_req, res) => {
  try {
    const testProducts = [];
    for (let i = 1; i <= 5; i++) {
      testProducts.push(test());
    }
    res.json(testProducts);
  } catch (e) {
    res.status(500).json({
      error: "Something unexpected happened!",
    });
  }
});

module.exports = apiRouter;
