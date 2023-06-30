const express = require('express');
const cors = require('cors');
const app = express();//enable CORS for all routes
app.use(cors());


// Middleware to parse JSON request bodies
app.use(express.json());

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

module.exports = app; 