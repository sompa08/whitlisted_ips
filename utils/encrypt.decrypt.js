const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const HASH = "sha256";

const secret= '835a660ba268894e1f84d18104b7328af0d20e664d42cd13474ebc6efec989a9';
const generateKey = secret => crypto.createHash(HASH).update(secret).digest();
//Encrypting text
function encrypt(text) {
let key = generateKey(secret);
let iv = crypto.randomBytes(16);
let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
let encrypted = cipher.update(text);
encrypted = Buffer.concat([encrypted, cipher.final()]);
const final_data = {iv:iv.toString('hex'),encryptedData:encrypted.toString('hex')};
return JSON.stringify(final_data);
}


// Decrypting text
function decrypt(t) {
const text = JSON.parse(t);
let iv = Buffer.from(text.iv, 'hex');
let key = generateKey(secret);
let encryptedText = Buffer.from(text.encryptedData, 'hex');
let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
let decrypted = decipher.update(encryptedText);
decrypted = Buffer.concat([decrypted, decipher.final()]);
return decrypted.toString();
}

exports.encryptVoucher = encrypt;
exports.decryptVoucher = decrypt;