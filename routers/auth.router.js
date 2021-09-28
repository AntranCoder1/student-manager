const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/login', (request, response) => {
    response.render('auth/login');
});

router.post('/login', (request, response) => {
    var email = request.body.username;
    var password = request.body.password;

    var user = db.get('users').find({ username: email }).value();

    if (!user) {
        response.render('auth/login', {
            errors: [
                'Users doesn not exit.'
            ],
            value: request.body
        });
        return;
    }

    if (user.password !== password) {
        response.render('auth/login', {
            errors: [
                'Password doesn not exit.'
            ],
            value: request.body
        });
        return;
    }

    response.cookie('userId', user.id);
    response.redirect('/users');
})

module.exports = router;