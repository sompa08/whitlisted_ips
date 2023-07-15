const axios = require('axios');

const createsignature = require('../utils/create.signature');
const Products = require('../models/product');

const URL = 'https://sandbox.woohoo.in/rest/v3/catalog/categories/121/products?limit=10&offset=0';
const method = 'post';
const dateISO = new Date().toISOString();

function saveProductList(req, res, next) {

  const data = JSON.stringify({
    "address": {
      "billToThis": true,
      "city": "bangalore",
      "code": "123",
      "country": "IN",
      "email": "jhon.deo@gmail.com",
      "firstname": "Jhon",
      "gstn": "1234567890",
      "lastname": "Deo",
      "line1": "address details1",
      "line2": "address details 2",
      "postcode": "560076",
      "region": "Karnataka",
      "salutation": "Mr.",
      "telephone": "+919999999999"
    },
    "billing": {
      "city": "bangalore",
      "code": "abc",
      "company": "Accenture",
      "country": "IN",
      "email": "jhon.deo@gmail.com",
      "firstname": "Jhon ",
      "gstn": "123456",
      "lastname": "Deo",
      "line1": "address details1",
      "line2": "address details 2",
      "postcode": "560076",
      "region": "Karnataka",
      "salutation": "Mr.",
      "telephone": "+919999999999"
    },
    "cardnumber": "7998892010000285",
    "coBrandImageId": "co_brand_image_id",
    "couponCode": "DISC100",
    "deliveryMode": "API",
    "egvDeliveryType": "MULTIPLE",
    "isConsolidated": false,
    "orderType": "FULFILLMENT_BY_SELLER",
    "otp": "12345",
    "outletName": "2773 - SydneyOutlet",
    "payments": [
      {
        "amount": 1000,
        "code": "svc",
        "mode": "ANY",
        "poDate": "2022-06-29 6:11:50",
        "poNumber": "johndeo01"
      }
    ],
    "products": [
      {
        "cardNumber": "7998892010000285",
        "coBrandImageId": "wowth1",
        "currency": 356,
        "giftMessage": "",
        "packaging": "minimal_packaging",
        "payout": {
          "accountNumber": "1234567890123456",
          "email": "test@gmail.com",
          "ifscCode": "001000000abc",
          "name": "abc test",
          "telephone": "+91888888888",
          "transactionType": "IMPS",
          "type": "BANK_ACCOUNT"
        },
        "price": 1000,
        "qty": 1,
        "reloadCardNumber": "7998892010000285",
        "sku": "EGVGBTNS001",
        "theme": "bwi",
        "trackData": ";7998892010000285=000000101068785?"
      }
    ],
    "refno": "001000000abc",
    "remarks": "Gift card",
    "shipping": {
      "method": "wowregisteredpost"
    },
    "syncOnly": false
  });
  const signature = createsignature(method, URL,data);
  console.log(signature)
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sandbox.woohoo.in/rest/v3/orders',
    headers: { 
      'signature': signature, 
      'dateAtClient': dateISO, 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcklkIjo0ODgsImV4cCI6MTY5MDAxNDYyMSwidG9rZW4iOiIzN2Q2MGQ4Njk2NmZlNGVkN2Q3ODUwNTgyMjFhZTg5YyJ9.nhfeTjU6fh-6FrN9l-TBtdISmfBG9E8almvv73SRxvA', 
      'Cookie': 'PHPSESSID=eqrp3l8qcchb6jui227150q6do; frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  

}
module.exports = saveProductList;