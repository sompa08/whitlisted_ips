const config = require('../config')
const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    // Generate the token with the client's IP address as a payload
    const token = jwt.sign({ ip: ipAddress }, config.clientSecret);
    console.log("token", token)
    return token;
}
