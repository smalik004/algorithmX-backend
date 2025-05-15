const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const decryptText = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPT_SECRET);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  decryptText,
  generateToken,
  verifyToken
};
