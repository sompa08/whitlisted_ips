
const productRouter = require('./routes/product.route');
const orderRouter = require('./routes/order.route');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();//enable CORS for all routes
app.use(cors());

app.use(bodyParser.json({ limit: "2mb" }));

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/api/v1", orderRouter);
app.use("/api/v1", productRouter);

module.exports = app; 