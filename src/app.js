require('./config/dotenv')();
require('./config/sequelize');
const cors = require('cors');
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

// Printa mensagem encriptada
const encrypt = require('./cryptography/encrypt.js');

const pathToPubKey = path.join(__dirname,'../','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const encryptedMessage = encrypt.encryptWithPublicKey(PUB_KEY, 'Mensagem super secreta');
console.log(encryptedMessage.toString());

// Decripta a mensagem
const decrypt = require('./cryptography/decrypt.js');

const pathToPrivKey = path.join(__dirname,'../','id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(PRIV_KEY, encryptedMessage);
console.log(decryptedMessage.toString());
