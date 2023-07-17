"use strict";

const express = require('express');
const createOrder = require('../controllers/create.order');
const saveOrderDeatils = require('../controllers/save.order.deatils')
const getOrderDeatils = require('../controllers/get.order.deatils');

const router = express.Router();

router
    .route('/create/orders')
    .post(createOrder)

router
    .route('/orders/details/:orderId?')
    .post(saveOrderDeatils)
    .get(getOrderDeatils);

module.exports = router; 