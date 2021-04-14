# Autenticação no NodeJS | EJCM
*Neste repositório você vai encontrar a implementação de algumas formas de autenticação e autorização em servidores usando Node JS na framework Express, assim como a exemplificação de como funciona a encriptação e decriptação de mensagens usando o RSA (Criptografia de Chave Pública).*
* Autenticação com JSON Web Token <br />
* Autorização com Oauth <br />
  * [Google+](https://console.cloud.google.com)
  * [Facebook](https://developers.facebook.com)

![Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Setup
### 1. Clone o repositório
```
git clone https://github.com/naccaratocarolina/autenticacao_nodejs.git
```
### 2. Entre na branch /final
```
git checkout final
```
### 3. Instale as dependências
```
npm install
```
### 4. Crie um banco de dados no phpmyadmin ou pelo bash
```
mysql -u root -p
CREATE DATABASE autenticacao CHARACTER SET utf8 COLLATE utf8_bin;
```
### 5. Crie o .env
```
cp .env.example .env
```
### 6. Configure o .env
```
# DATABASE
DB_CONNECTION=mysql
DB_USERNAME=root
DB_PASSWORD=<senha>
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=autenticacao
```
### 7. Migre as tabelas para o banco de dados criado
```
node src/database/migrate.js
```
### 8. Gere as chaves de Criptografia
```
node src/config/generateRSAKeyPair.js
```
### 9. Sirva o projeto
```
node src/app.js
```
### 10. Abra o proejto no browser
```
http://localhost:3333
```

## Descrição das branches

### /main
Nessa branch, você vai encontrar um projeto básico em Node respeitando a estrutura de pastas desenvolvida na Iniciativa de Back-End da EJCM.

### /authentication-jwt
Branch que repassa toda a logica da autenticação com JWT, usando apenas a biblioteca jsonwebtoken

### /passport-jwt
Branch que repassa a logica da autenticacao com JWT, usando o [Passport JS](http://www.passportjs.org/) como middleware

### /public-key-cryptography
Branch que mostra em termos de código como encriptar e decriptar dados e como gerar uma assinatura digital e verificar a mesma usando o RSA como algoritmo de Criptografia de Chave Pública

### /passport-oauth
Nessa branch foi feita a lógica da implementação da autorização OAuth 2.0 por meio do [Passport JS](http://www.passportjs.org/). Foi implementado as estrategias Google + e Facebook.

### /final
Nessa branch pode ser encontrada a junção das duas estratégias: JWT e OAuth. Foi criado um front bem básico usando Views (ejs engine) para simular uma aplicação real.
