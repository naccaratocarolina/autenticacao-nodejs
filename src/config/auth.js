const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const generateHash = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: hash
  };
};

const verifyPassword = (passwordTyped, salt, hash) => {
    const hashOfTypedPassword = crypto.pbkdf2Sync(passwordTyped, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashOfTypedPassword;
};

const generateJsonWebToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    dateOfBirth: user.date_of_birth,
    phoneNumber: user.phone_number ? user.phone_numbe : null,
    gender: user.gender ? user.gender : null,
    RoleId: user.RoleId ? user.RoleId : null
  }

  return jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: '7d', algorithm: 'RS256' });
};

const getToken = (req) => {
  const header = req.get('Authorization');
  if (!header) return error;
  return header.split(' ')[1];
}

const user = (token) => {
	const payload = token.split(".")[1];
	const encodedPayload = Buffer.from(payload, 'base64');
	const decodedPayload = encodedPayload.toString('utf-8');
	return JSON.parse(decodedPayload);
}

module.exports = {
  generateHash,
  verifyPassword,
  generateJsonWebToken,
  getToken,
  user
}
