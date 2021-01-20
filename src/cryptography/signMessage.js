const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const path = require('path');
const encrypt = require('./encrypt');

const pathToPrivKey = path.join(__dirname,'../../','id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

const data = {
	id: 1,
	name: 'Carolina',
	email: 'carolina@carolina.com',
	gender: 'F'
};

// Convertendo o nosso objeto em string para usar a biblioteca crypto
const myDataToString = JSON.stringify(data);

// Seta o valor na funcao de hash (recebe uma string, por isso precisamos fazer a conversao anteriormente)
hash.update(myDataToString);

// Cria uma hash dos nossos dados em formato hexadecimal
const hashedData = hash.digest('hex');

// Criando uma assinatura para a mensagem
const signMessage = encrypt.encryptWithPrivateKey(PRIV_KEY, hashedData);

// Passando as informacoes necessarias para o receptor possa veriricar se a assiantura eh valida
const packageOfDataToSend = {
	algorithm: 'sha256',
	originalData: data,
	signedAndEncryptedData: signMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;
