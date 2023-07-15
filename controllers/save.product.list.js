const axios = require('axios');

const createsignature = require('../utils/create.signature');
const Products = require('../models/product');

const URL = 'https://sandbox.woohoo.in/rest/v3/catalog/categories/121/products?limit=10&offset=0';
const method = 'get';
const dateISO = new Date().toISOString();

function saveProductList(req, res, next) {
  const signature = createsignature(method, URL);

  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: URL,
    headers: {
      'signature': signature,
      'dateAtClient': dateISO,
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcklkIjo0ODgsImV4cCI6MTY5MDAxNDYyMSwidG9rZW4iOiIzN2Q2MGQ4Njk2NmZlNGVkN2Q3ODUwNTgyMjFhZTg5YyJ9.nhfeTjU6fh-6FrN9l-TBtdISmfBG9E8almvv73SRxvA',
      'Cookie': 'PHPSESSID=eqrp3l8qcchb6jui227150q6do; frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
    }
  };

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