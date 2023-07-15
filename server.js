
const router = require('./routes/order.route');
const productRouter = require('./routes/product.route');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();//enable CORS for all routes
app.use(cors());

app.use(bodyParser.json({ limit: "2mb" }));

const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/api/v1", productRouter);

module.exports = app; 