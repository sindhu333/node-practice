const Product = require("../models/product");

exports.getAddProduct = (req,res) => {
    res.render("admin/edit-product", {
        pageTitle: "admin-add-product",
        editing: false
    })
}

exports.postAddProduct = (req, res) => {
    console.log("method.url", req.url);
    const reqBody = req.body;
    const title = req.url == "/add-product" ? null : reqBody.title;
    const name = reqBody.name;
    const price = reqBody.price;
    const description = reqBody.description;
    const productModel = new Product(title, name, price, description);
    productModel.save();
    res.redirect("/admin/add-product");
}

exports.getAdminProducts = (req, res) => {
        Product.fetchAll(products => {
            res.render("admin/products", {
            pageTitle: "admin-products",
            products: products
        })
    });
}

exports.getAdminEditProduct = (req, res) => {
    const productId = req.params.productId
    Product.findById(productId, product => {
        res.render("admin/edit-product", {
            pageTitle: "admin-edit-product",
            editing: true,
            product: product
        })
    })
}

exports.postAdminEditProduct = (req, res) => {
    const reqBody = req.body;
    const productId = reqBody.productId;
    const title = reqBody.title;
    const name = reqBody.name;
    const price = reqBody.price;
    const description = reqBody.description;
    const updatedProduct = new Product(productId, title, name, price, description);
    updatedProduct.save();
    res.redirect("/admin/products");
}

exports.postDeleteAdminProduct = (req, res) => {
    const productId = req.body.productId;
    Product.deleteProduct(productId);
    res.redirect("/admin/products");
}