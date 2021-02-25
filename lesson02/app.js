const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.listen(5000, () => {
    console.log('app rules');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs'); // какой движок использовать для отображения
app.engine('.hbs', expressHbs({
    // eslint-disable-next-line max-len
    defaultLayout: false // this parameter is strictly required - способ действия, какие настройки использовать, при обработке файлов .hbs
}));
app.set('views', path.join((__dirname, 'static'))); // путь, где вьюшки лежат

const users = [
    { name: 'vasya', gender: 'male', age: 21 },
    { name: 'manya', gender: 'female', age: 18 },
    { name: 'kolya', gender: 'male', age: 27 },
    { name: 'sonya', gender: 'female', age: 17 },
    { name: 'marina', gender: 'female', age: 35 },
    { name: 'petya', gender: 'male', age: 46 },
    { name: 'ostap', gender: 'male', age: 19 },
    { name: 'violeta', gender: 'female', age: 20 },
];

app.get('/login', (req, res) => {
    res.render('login', { var: true, name: 'Serg' });
});

app.post('/login', (req, res) => {
    // console.log('-------------------------');
    // console.log(req.body);
    // console.log('-------------------------');
    users.push(req.body);
    // res.json("User's registered now");
    res.redirect('/users');
});

app.get('/users', ((req, res) => {
    const { gender } = req.query;
    let usersToShow = JSON.parse(JSON.stringify(users));

    if (gender) {
        usersToShow = users.filter((user) => user.gender === gender);
    }

    res.render('users', { users: usersToShow });
}));

app.get('/users/:userId', ((req, res) => {
    console.log(req.params);
    const { userId } = req.params;

    res.json(users[userId]);
}));

// app.get('/life', (req, res) => {
//     //res.send('justice');
//     res.write('justice');
//     res.end();
// })
//
// app.get('/users', (req, res) => {
//     res.json([
//         {name: "Dima"},
//         {name: "Anre"},
//         {name: "Butch"}
//     ]);
// })
