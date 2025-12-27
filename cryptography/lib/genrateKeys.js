const crypto = require("crypto");

const genrateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })
    return { publicKey, privateKey }
}


const keys = genrateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;


module.exports = { publicKey, privateKey };
