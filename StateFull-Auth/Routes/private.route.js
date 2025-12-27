const express = require("express");
const router = express.Router();

const { AuthMiddleware } = require("../Middleware/Auth.Middleware");

router.get('/private', AuthMiddleware, (req, res) => {

    res.send("Private Route");
});

module.exports = router;