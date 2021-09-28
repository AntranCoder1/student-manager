const express = require('express')
const router = express.Router()

const usersControll = require('../controllers/users.controller');

router.get('/', usersControll.index);

router.get('/search', usersControll.search);

router.get('/create', usersControll.create);

router.post('/create', usersControll.postUser);

router.get('/:id', usersControll.getId);

module.exports = router