const express = require('express');
const protectedRoute = require('../middleware/auth.middelware');
const { GetUsers, GetMessages, SendMessage } = require('../controllers/message.controller');

const router = express.Router();

router.get('/users', protectedRoute, GetUsers)  // For All User
router.get('/:id', protectedRoute, GetMessages)  // For Single User - Chat - GET
router.post('/send/:id', protectedRoute, SendMessage)  // For Single User - Chat - SEND



module.exports = router;