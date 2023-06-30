const express = require('express');

const app = express();
const cors = require('cors');
//enable CORS for all routes
app.use(cors());
app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/config', function (req, res) {
    res.json({ version: '0.0.1' });
});

module.exports = app;