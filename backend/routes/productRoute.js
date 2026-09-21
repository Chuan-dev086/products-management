const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const auth = require("../middlewares/auth");

router.use(express.json());

router.get("/", auth.authenticate, productController.getAllProducts);

router.get("/:id", auth.authenticate, productController.getProductById);

module.exports = router;
