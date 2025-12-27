const crypto = require("crypto");


// function to encrypt data
const encryptData = (publicKey, data) => {
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(data));
    return encrypted.toString("base64");
}


const decryptData = (privateKey, encryptedData) => {
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64'));
    return decrypted.toString("utf-8");
}

module.exports = {
    encryptData,
    decryptData
}
