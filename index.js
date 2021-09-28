const express = require('express');
const app = express();
const port = 3000;

const usersRouter = require('./routers/users.router');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('index', {
        name: 'Tran Thanh An'
    })
})

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})