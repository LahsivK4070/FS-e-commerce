const path = require('path');

const express = require('express');

// const rootDir = require("../util/path");
const adminController = require('../controllers/admin')


// router is like a mini express app tied to other exress app which we can export
const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

// get and post performs exact match

router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);
module.exports = router;
// exports.routes = router;
// exports.products = products;