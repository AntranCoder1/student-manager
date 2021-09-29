const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);

router.post('/login', authController.loginSignIn);

router.get('/res', authController.res);

router.post('/res', authController.resSignUp);

module.exports = router;