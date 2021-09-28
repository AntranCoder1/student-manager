const db = require('../db');

module.exports.requireAuth = (request, response, next) => {
    if (!request.signedCookies.UsersId) {
        response.redirect('/auth/login');
        return;
    }
    
    var user = db.get('users').find({ id: request.signedCookies.UsersId }).value();

    if (!user) {
        response.redirect('/auth/login');
        return;
    }

    response.locals.user = user;

    next()
};