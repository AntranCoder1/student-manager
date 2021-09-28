const express = require('express')
const router = express.Router()

const usersControll = require('../controllers/users.controller');
const userValidate = require('../middleware/users.middleware');

router.get('/', usersControll.index);

router.get('/search', usersControll.search);

router.get('/create', usersControll.create);

router.post('/create', userValidate.userMiddleware, usersControll.postUser);

router.get('/:id', usersControll.getId);

module.exports = router