const db = require('../db');
const { nanoid } = require('nanoid');

module.exports.index = (request, response) => {
    response.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.search = (request, response) => {
    var q = request.query.q;
    var matchUser = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    response.render('users/index', {
        users: matchUser
    })
}

module.exports.create = (request, response) => {
    response.render('users/create');
}

module.exports.postUser = (request, response) => {
    request.body.id = nanoid();
    db.get('users').push(request.body).write();
    response.redirect('/users');
}

module.exports.getId = (request, response) => {
    var id = request.params.id;
    var user = db.get('users').find({ id: id }).value();
    response.render('users/view', {
        user: user
    })
}