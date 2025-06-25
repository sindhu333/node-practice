const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getAdminProducts);
router.get("/edit-product/:productId", adminController.getAdminEditProduct);
router.post("/edit-product", adminController.postAdminEditProduct);
router.post("/delete/:productId", adminController.postDeleteAdminProduct);

exports.routes = router;