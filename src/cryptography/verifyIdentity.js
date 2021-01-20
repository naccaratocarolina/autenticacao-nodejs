const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const decrypt = require('./decrypt');

const pathToPubKey = path.join(__dirname,'../../','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const receivedData = require('./signMessage').packageOfDataToSend;

const hash = crypto.createHash(receivedData.algorithm);

const decryptedMessage = decrypt.decryptWithPublicKey(PUB_KEY, receivedData.signedAndEncryptedData); // vai retornar a hash dos dados

const decryptedMessageHex = decryptedMessage.toString();

const originalHash = hash.update(JSON.stringify(receivedData.originalData));
const originalHashHex = hash.digest('hex');

if (originalHashHex === decryptedMessageHex) {
	console.log('ok');
} else {
	console.log('deu ruim');
}
