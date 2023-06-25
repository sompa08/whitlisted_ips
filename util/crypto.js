const crypto = require('crypto');

// Generate a client secret
const generateClientSecret = () => {
  const secretLength = 32; // Length of the secret in bytes
  return crypto.randomBytes(secretLength).toString('hex');
};

// Generate a client key
const generateClientKey = () => {
  const keyLength = 16; // Length of the key in bytes
  return crypto.randomBytes(keyLength).toString('hex');
};

// Example usage
const clientSecret = generateClientSecret();
const clientKey = generateClientKey();

console.log('Client Secret:', clientSecret);
console.log('Client Key:', clientKey);