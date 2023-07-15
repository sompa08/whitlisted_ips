"use strict";

const express = require('express');
const saveProductList = require('../controllers/save.product.list');

const router = express.Router();

router
    .route('/catalog/categories/products')
    .get(saveProductList);

module.exports = router; 