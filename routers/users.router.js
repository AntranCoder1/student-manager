const express = require('express')
const router = express.Router()

const db = require('../db');

const { nanoid } = require('nanoid');

router.get('/', (request, response) => {
    response.render('users/index', {
        users: db.get('users').value()
    })
})

router.get('/search', (request, response) => {
    var q = request.query.q;
    var matchUser = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    response.render('users/index', {
        users: matchUser
    })
})

router.get('/create', (request, response) => {
    response.render('users/create');
})

router.get('/:id', (request, response) => {
    var id = request.params.id;
    var user = db.get('users').find({ id: id }).value();
    response.render('users/view', {
        user: user
    })
})

router.post('/create', (request, response) => {
    request.body.id = nanoid();
    db.get('users').push(request.body).write();
    response.redirect('/users');
})


module.exports = router