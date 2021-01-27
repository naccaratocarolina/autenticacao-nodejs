const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const decrypt = require('./decrypt');

const pathToPubKey = path.join(__dirname,'../../','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

// Dados que foram recebidos
const receivedData = require('./signMessage').packageOfDataToSend;

// Inicializa a funcao hash com o algoritmo usado pelo sender
const hash = crypto.createHash(receivedData.algorithm);

// Decripta a mensagem recebida com a chave publica
const decryptedMessage = decrypt.decryptWithPublicKey(PUB_KEY, receivedData.signedAndEncryptedData); // vai retornar a hash dos dados

// Converte para hexadecimal
const decryptedMessageHex = decryptedMessage.toString();

// Cria a hash dos dados originais e converte para hexadecimal
const originalHash = hash.update(JSON.stringify(receivedData.originalData));
const originalHashHex = hash.digest('hex');

// Compara a hash gerada com a recebida para definir se os dados foram alterados
if (originalHashHex === decryptedMessageHex) {
	console.log('ok');
} else {
	console.log('deu ruim');
}
