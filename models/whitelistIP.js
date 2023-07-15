const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whitelist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
// schema for whitelisted IP addresses
const whitelistedIPSchema = new mongoose.Schema({
  clientId: {
    type: String
  },
  clientSecret: {
    type: String,
  },
  clientKey: {
    type: String
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const WhitelistedIP = mongoose.model('WhitelistedIP', whitelistedIPSchema);

module.exports = WhitelistedIP;