const express = require('express');
const { register, login, getProtectedData } = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/protected', authMiddleware, getProtectedData);

module.exports = router;
