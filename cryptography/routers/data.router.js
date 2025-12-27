const express = require("express");
const router = express.Router();

const { encryptDataController, decryptDataController } = require("../controller/data.controller");

// Encryption
router.post('/encrypt', encryptDataController)
// Decryption
router.post('/decrypt', decryptDataController)

module.exports = router;