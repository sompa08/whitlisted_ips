const crypto = require('crypto');

// Generate a random client ID
  exports.generateClientId = function() {
  return crypto.randomBytes(8).toString('hex');
};

// Generate a client secret
exports.generateClientSecret = function() {
  const secretLength = 32; // Length of the secret in bytes
  return crypto.randomBytes(secretLength).toString('hex');
};

// Generate a client key
exports.generateClientKey = function() {
  const keyLength = 16; // Length of the key in bytes
  return crypto.randomBytes(keyLength).toString('hex');
};





