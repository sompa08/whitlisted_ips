const axios = require('axios');

const createsignature = require('../utils/create.signature');
const token =require('../middlewares/token');

const URL = 'https://sandbox.woohoo.in/rest/v3/catalog/categories/121/products?limit=10&offset=0';
const method = 'post';
const dateISO = new Date().toISOString();

async function saveProductList(req, res, next) {

  const data = JSON.stringify(req.body);
   
  const signature = createsignature(method, URL,data);
  let tokenCode = await token();
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sandbox.woohoo.in/rest/v3/orders',
    headers: { 
      'signature': signature, 
      'dateAtClient': dateISO, 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${tokenCode}`, 
      'Cookie': 'PHPSESSID=eqrp3l8qcchb6jui227150q6do; frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  

}
module.exports = saveProductList;