const express = require('express');
const { register, login, logout, updateProfile, checkAuth } = require('../controllers/auth.controller');
const router = express.Router();
const protectedRoute = require('../middleware/auth.middelware');

router.post('/login', login)

router.post('/register', register)

router.post('/logout', logout)
router.get('/private', protectedRoute, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Private Route"
    })
})

router.post('/update-profile', protectedRoute, updateProfile)
router.get('/check-auth', protectedRoute, checkAuth)

module.exports = router;
