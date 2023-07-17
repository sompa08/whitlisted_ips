const axios = require('axios');
const Constants = require('../config/constants');
const getAuthorizationCode = require('../middlewares/authorization');

async function token() {
    let data = {
        "clientId": Constants.CLIENT_ID,
        "clientSecret": Constants.CLIENT_SECRET,
        "authorizationCode": await getAuthorizationCode()
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://sandbox.woohoo.in/oauth2/token',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'frontend=4jh225e6m5q667fmq7d90l2c2d; frontend_cid=W1TlOlMwtiOVBIcG'
        },
        data: data
    };
    let token;
    try {
        response = await axios.request(config);
        token = response.data.token;
    }
    catch (error) {
        console.log(error);
    }
    return token;
}

module.exports = token;