"use strict";

const express = require('express');
const createOrder = require('../controllers/create.order');
const saveOrderDeatils = require('../controllers/save.order.deatils')
const getOrderDeatils = require('../controllers/get.order.deatils');
const getOrderList = require('../controllers/get.order.list');

const router = express.Router();

router
    .route('/orders')
    .post(createOrder)
    .get(getOrderList);

router
    .route('/orders/details/:orderId?')
    .post(saveOrderDeatils)
    .get(getOrderDeatils);

module.exports = router; 