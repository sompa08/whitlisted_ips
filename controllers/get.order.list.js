const axios = require('axios');

const createsignature = require('../utils/create.signature');
const Inventories = require('../models/inventory');
const token =require('../middlewares/token');


const URL = 'https://sandbox.woohoo.in/rest/v3/orders';
const method = 'get';
const dateISO = new Date().toISOString();

async function saveProductList(req, res, next) {
  let tokenCode = await token();

  const signature = createsignature(method, URL);
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url :'https://sandbox.woohoo.in/rest/v3/orders',
    headers: {
      'signature': signature,
      'dateAtClient': dateISO,
      'Authorization': `Bearer ${tokenCode}`,
      'Cookie': 'PHPSESSID=eqrp3l8qcchb6jui227150q6do; frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
    }
  };
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
      return res.status(202).send({ status: 202, data: response.data });
  } catch (error) {
    console.log(error);
  }
}
module.exports = saveProductList;