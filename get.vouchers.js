const express = require('express');
const Inventories = require('./models/inventory');

const app = express();
const port = 3000; 

// API endpoint to get all vouchers
app.get('/api/vouchers', async (req, res) => {
  const vouchers = await Inventories.find()
    if (!vouchers) {
      console.error('Error retrieving vouchers:', error);
      return res.status(400).send({ error: 'Data not found' })
    } else {
      res.json(vouchers);
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

