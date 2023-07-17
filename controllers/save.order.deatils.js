const axios = require('axios');

const createsignature = require('../utils/create.signature');
const Orders = require('../models/order');
const token = require('../middlewares/token');


const URL = 'https://sandbox.woohoo.in/rest/v3/orders/{order_id}';
const method = 'get';
const dateISO = new Date().toISOString();

async function saveProductList(req, res, next) {
  let orderId =req.query.orderId;
  let tokenCode = await token();

  const signature = createsignature(method, URL);


  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://sandbox.woohoo.in/rest/v3/orders/${orderId}`,
    headers: {
      'dateAtClient': dateISO,
      'Authorization': `Bearer ${tokenCode}`,
      'signature': signature,
      'Cookie': 'frontend=ra5nssih6vce5hm1r3584k2vho; frontend_cid=JPJ7yVzHjYL9wKMt'
    }
  };

  try {
    let response = await axios.request(config);
    let ordersDeatils = await new Orders(response);
    return ordersDeatils.save();
  }
  catch (error) {
    console.log(error);
  }

}

module.exports = saveProductList;