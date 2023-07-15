"use strict";

const express = require('express');
const createOrder = require('../controllers/create.order');
// const getOrderList = require('../controllers/get.product.list');

const router = express.Router();

router
    .route('/create/orders')
    .post(createOrder);
    // .get(getProductList);

module.exports = router; 