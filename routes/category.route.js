"use strict";

const express = require('express');
const getCatalogCategory = require('../controllers/get.catalog.category');

const router = express.Router();

router
    .route('/catalog/categories/:id')
    .get(getCatalogCategory);

module.exports = router; 