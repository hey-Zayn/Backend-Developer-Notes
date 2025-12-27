const { encryptData, decryptData } = require("../helpers/data.functions");
const { publicKey, privateKey } = require("../lib/genrateKeys");

const encryptDataController = (req, res) => {
    const { data } = req.body;
    const encryptedData = encryptData(publicKey, data);
    res.send({ encryptedData });
}

const decryptDataController = (req, res) => {
    const { encryptedData } = req.body;
    const decryptedData = decryptData(privateKey, encryptedData);
    res.send({ decryptedData });
}


module.exports = {
    encryptDataController,
    decryptDataController
}
