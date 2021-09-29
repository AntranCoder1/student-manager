const db = require('../db');
const md5 = require('md5');
const {nanoid } = require('nanoid');

module.exports.login = (request, response) => {
    response.render('auth/login');
};

module.exports.loginSignIn = (request, response) => {
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

    var hashedPassword = md5(password);

    if (user.password !== hashedPassword) {
        response.render('auth/login', {
            errors: [
                'Password doesn not exit.'
            ],
            value: request.body
        });
        return;
    }

    response.cookie('UsersId', user.id, {
        signed: true
    });

    response.locals.user = user

    response.redirect('/users');
};

module.exports.res = (request, response) => {
    response.render('auth/res');
};

module.exports.resSignUp = (request, response) => {
    db.get('users').push({
        id: nanoid(),
        username: request.body.username,
        password: md5(request.body.password),
        name: request.body.name,
        phone: request.body.phone
    }).write();

    response.redirect('/auth/login');
}