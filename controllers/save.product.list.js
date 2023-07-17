const axios = require('axios');

const createsignature = require('../utils/create.signature');
const Products = require('../models/product');
const token =require('../middlewares/token');


const URL = 'https://sandbox.woohoo.in/rest/v3/catalog/categories/121/products?limit=10&offset=0';
const method = 'get';
const dateISO = new Date().toISOString();

async function saveProductList(req, res, next) {
  let tokenCode = await token();

  const signature = createsignature(method, URL);

  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: URL,
    headers: {
      'signature': signature,
      'dateAtClient': dateISO,
      'Authorization': `Bearer ${tokenCode}`,
      'Cookie': 'PHPSESSID=eqrp3l8qcchb6jui227150q6do; frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
    }
  };
console.log('config:::::::::',config);
  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const productList = Products.insertMany(response.data);
      if (!productList) {
        return next({ status: 400, name: 'customerror', message: 'Please fill the data in the file!' });
      } else {
        console.info('Data inserted successfully');
      }
      return res.status(202).send({ status: 202, message: 'Data inserted successfully' });

    })
    .catch((error) => {
      console.log(error);
    });

}
module.exports = saveProductList;