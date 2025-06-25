const path = require("path");
const fs = require("fs");

const rootDir = require("../utills/rootDir");

const cartFilePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
    static addProduct(productId, productPrice) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cart = { products:[], totalPrice: 0}
            if(!err && fileContent.length != 0) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id == productId);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                console.log("existingProduct", existingProduct);
                updatedProduct = {...existingProduct};
                console.log("updated Product", updatedProduct);
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: productId, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice+ +productPrice;
            fs.writeFile(cartFilePath, JSON.stringify(cart), err=> {
                console.log(err);
            })
        })
    }
    static getCart(cb) {
        fs.readFile(cartFilePath, (err, fileContent) => {
            if(err || fileContent.length == 0) {
                cb(null)
            } else {
                cb(JSON.parse(fileContent));
            }
        })
    }
}