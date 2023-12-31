const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const Cart = require("./cart");

// const products = [];
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    // save() {
    //     products.push(this);
    // }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex((prod) => {
                    return prod.id === this.id;
                });
                const updatedProducts = [...JSON.parse(products)];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static delete(id) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => {
                return prod.id === id;
            })
            const updatedProducts = products.filter((product) => {
                return product.id !== id;
            });
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        })
    }

    // static allows the function to call on the class rather than an object
    // static fetchAll() {
    //     return products;
    // }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find((p) => {
                return p.id === id;
            });
            cb(product);
        });
    }
}