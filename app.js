const express = require('express');
const cors = require('cors');
const app = express();

//enable CORS for all routes
app.use(cors());


// Middleware to parse JSON request bodies
app.use(express.json());


module.exports = app; 