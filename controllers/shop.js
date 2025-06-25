const ProductModel = require("../models/product");
const CartModel = require("../models/cart");

exports.getIndex = (req, res) => {
    ProductModel.fetchAll(products => {
        res.render("shop/index", {
            pageTitle: "index",
            products: products
        })
    })
}

exports.getProducts = (req, res) => {
    ProductModel.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "products",
            products: products
        })
    })
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.productId;
    ProductModel.findById(productId, product => {
        res.render("shop/product-details", {
            pageTitle: "product-description",
            product: product
        })
    })
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    ProductModel.findById(productId, product => {
        CartModel.addProduct(productId, product.price)
    })
}

exports.getCart = (req, res) => {
    CartModel.getCart(cart => {
        ProductModel.fetchAll(products => {
            const cartProducts = [];
            for(let product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id == product.id
                )
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            }
            res.render("shop/cart", {
                pageTitle: "cart",
                products: cartProducts

            })
        })
    })
}