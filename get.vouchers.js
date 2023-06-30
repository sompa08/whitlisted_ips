const express = require('express');
const Inventories = require('./models/inventory');
const { decryptVoucher } = require('./util/encrypt.decrypt');


const app = express();
const port = 3000;


// API endpoint to get all vouchers
app.get('/api/vouchers', async (req, res) => {
  const query = req.query;
  const filters = {};
  if (query) {
    filters['$or'] = [
      { vendorId: query.vendorId },
      { orderId: query.orderId },
      { productId: query.productId },
      { status: query.status },
      { vendorSkuId: query.vendorSkuId }
    ];
  }

  const vouchers = await Inventories.find(filters)
  const results = [];
  vouchers.forEach(data => {
    const decryptedCardNumber = decryptVoucher(data.cardNumber);
    const decryptedPinCode = decryptVoucher(data.pinCode);
    const decryptedClaimUrl = decryptVoucher(data.claimUrl);
    data.cardNumber = decryptedCardNumber;
    data.pinCode = decryptedPinCode;
    data.claimUrl = decryptedClaimUrl;
    results.push(data);
  });
  if (!results) {
    console.error('Error retrieving vouchers:', error);
    return res.status(400).send({ error: 'Data not found' })
  } else {
    res.json(results);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

