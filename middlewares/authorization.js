const axios = require('axios');
const Constants = require('../config/constants');

async function getAuthorizationCode() {
    let authorizationCode;
    const data = JSON.stringify({
        "clientId": Constants.CLIENT_ID,
        "username": Constants.USERNAME,
        "password": Constants.PASSWORD
    });

    const URL = 'https://sandbox.woohoo.in/oauth2/verify';

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
        },
        data: data
    };

    try {
        let response = await axios.request(config)
        authorizationCode = response.data.authorizationCode;
    }
    catch (error) {
         console.log(error);
      }
    return authorizationCode;
}

module.exports = getAuthorizationCode;