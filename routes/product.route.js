"use strict";

const express = require('express');
const saveCategoryProductList = require('../controllers/save.category.product.list');
const getCategoryProductList = require('../controllers/save.category.product.list');
const saveProductList = require('../controllers/save.product.list');
// const getProductList = require('../controllers/');

const router = express.Router();

router
    .route('/catalog/categories/products')
    .post(saveCategoryProductList)
    .get(getCategoryProductList);

router
    .route('/products')
    .post(saveProductList);
    // .get(getProductList);

module.exports = router; 