const path = require("path");
const fs = require("fs");
const rootDir = require("../utills/rootDir");

const productFilePath = path.join(rootDir, "data", "product.json");

const getDataFromFile = (cb) => {
    fs.readFile(productFilePath, (err, fileContent) => {
        if(err || fileContent.length == 0) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
        
    })
}

module.exports = class Product {
    constructor(id, title, name, price, description) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.price = price;
        this.description = description;
    }
    save() {
        getDataFromFile(products => {
            if(this.id) {
                console.log("idd", this.id);
                console.log("coming to if")
                const existingProductIndex = products.findIndex(
                    prod => prod.id == this.id
                );
                products[existingProductIndex] = this;
                fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productFilePath, JSON.stringify(products), err => {
                console.log(err);
            })
        }
    })
}
    static fetchAll(cb) {
        getDataFromFile(cb);
    }
    static findById(id, cb) {
        getDataFromFile(products => {
            const product = products.find(prod => prod.id == id);
            cb(product)
        })
    }
    static deleteProduct(id) {
        getDataFromFile(products => {
            const updatedProduct = products.filter(prod => prod.id != id);
            fs.writeFile(productFilePath, JSON.stringify(updatedProduct), (err) => {
                console.log(err);
            })
        })
    }
}