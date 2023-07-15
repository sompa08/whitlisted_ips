"use strict";

const express = require('express');
const saveProductList = require('../controllers/save.product.list');
const getProductList = require('../controllers/get.product.list');

const router = express.Router();

router
    .route('/catalog/categories/products')
    .post(saveProductList)
    .get(getProductList);

module.exports = router; 