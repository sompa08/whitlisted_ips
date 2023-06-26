const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config')
const crypto = require('./util/crypto');
const verifyToken = require('./middleware/authToken');

const WhitelistedIP = require('./db');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

//enable CORS for all routes
app.use(cors());


// Middleware to parse JSON request bodies
app.use(express.json());

// Rate Limiting Middleware for appliying rate limits to the number of requests.
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // maximum number of requests allowed in the window
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);


// Endpoint to add an IP to the whitelist
app.post('/api/whitelist', async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    const clientId = crypto.generateClientId();
    const clientSecret = crypto.generateClientSecret();
    const clientKey = crypto.generateClientKey();

    const payload = {
      ip: ip,
      clientId: clientId,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(payload, clientSecret, {}, { algorithm: 'RS256' });
    const savedIP = new WhitelistedIP({ ip: ip, token: token, clientId: clientId, clientSecret: clientSecret, clientKey: clientKey });
    await savedIP.save();
    if (!savedIP) {
      console.error('Error adding IP to whitelist:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.info(`IP ${ip} added to whitelist`);
    res.status(201).json({ message: 'IP added to whitelist' });
  }
  catch (error) {
    if (error.code == "11000")
      res.status(500).json({ message: 'IP already exists' });
  }

});

// Endpoint to get all whitelisted IPs
app.get('/api/whitelist', async (req, res) => {
  const ips = await WhitelistedIP.find()
  if (!ips) {
    console.error('Error retrieving whitelisted IPs:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
  console.info(`Whitelisted IPs ${JSON.stringify(ips)}`);
  res.json(ips);
});

// Middleware for IP whitelisting
app.use(async (req, res, next) => {
  const ip = req.header('x-forwarded-for')
  const IPs = await WhitelistedIP.findOne({ ip: ip })
  if (!IPs) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// Protected API endpoint that can only be accessed by whitelisted IPs
app.get('/api/protected', async (req, res, next) => {
  const token = req.header("x-auth-token");
  const ip = req.header('x-forwarded-for')
  if (!token) {
    return res.status(401).send({ error: "Token is required" })
  }
  const savedToken = await WhitelistedIP.findOne({ token: token, ip: ip })
  // const decoded = jwt.verify(token, config.clientSecret)
  if (token == savedToken.token && ip == savedToken.ip) {
    next();
  }
  else {
    res.status(400).send({ error: "Invalid Token" })
  }
  res.json({ message: 'This API can only be accessed by whitelisted IPs' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});