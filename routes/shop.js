const express = require("express");
const router = express.Router();

const shopController = require('../controllers/shop');

console.log("coming to shop");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProductDetail);
router.post("/cart", shopController.postCart);
router.get("/cart", shopController.getCart);

exports.routes = router;