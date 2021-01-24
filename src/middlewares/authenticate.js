const jsonwebtoken = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = function authMiddleware (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        jsonwebtoken.verify(token, PUB_KEY, { algorithm: 'RS256' }, (error, decoded) => {
            if (error) return res.status(401).json({ message: "Voce não tem permissão." });
            req.payload = decoded;

            return next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Voce não tem permissão." });
    }
}
