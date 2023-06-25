// db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/poc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema for whitelisted IP addresses
const whitelistedIPSchema = new mongoose.Schema({
  // clientId
  // secret
  // key
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true
  },
});

const WhitelistedIP = mongoose.model('WhitelistedIP', whitelistedIPSchema);

module.exports = WhitelistedIP;