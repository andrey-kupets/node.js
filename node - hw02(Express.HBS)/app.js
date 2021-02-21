// Вам потрібно реалізувати мінімум 5 строрінок.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
// 4) Інформація про одного юзера
// 5) Помилка
//
// Створити файл з юзерами, який буде виступати в ролі бази данних.
//
//     При реєстрації юзер вводть мейл, нік та пороль і ви його данні дописуєте в файл. Але тільки якщо його немає ще. Якшо він є, то видаєте помилку. Після реєстрації переходите на сторінку зі всіма юзерми.
//
//     При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти його мейлик в списку юзерів та якщо такий мейлик з таким паролем є, то віддати інформацію про юзера. В інакшому випадку сказати, що необхідно реєструватись.
//
//     І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
//     При реєстрації мейли не можуть повторюватись

const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const dataBasePath = path.join(__dirname, 'dataBase', 'users.json');

const app = express();

app.listen(5000, () => {
    console.log('the server is ready');
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/users', (req, res) => {
    fs.readFile(dataBasePath, (err, data) => {
        if (err) console.log(err);
        const users = JSON.parse(data.toString());
        res.render('users', {users});
        console.log(users);
    });
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    fs.readFile(dataBasePath, (err, data) => {
        if (err) console.log(err);
        const users = JSON.parse(data.toString());
        res.render('user', {user: users[userId]});
    });
});


app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    fs.readFile(dataBasePath, (err, data) => {
        if (err) console.log(err);
        const users = JSON.parse(data.toString());
        const {email} = req.body;
        const invalidUser = users.find(user => user.email === email);

        if (!invalidUser) {
            users.push(req.body);
            fs.writeFile(dataBasePath, JSON.stringify(users), err1 => {
                if (err1) console.log(err1)
            });
            res.redirect('/users');
            return;
        }
        res.redirect('/error');
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(dataBasePath, (err, data) => {
        if (err) console.log(err);

        const {email, password} = req.body;
        const users = JSON.parse(data.toString());
        const validUserIndex = users.findIndex(user => user.email === email && user.password === password);

        if (validUserIndex === -1) {
            res.redirect('/register');
            return;
        }
        res.redirect(`/users/${validUserIndex}`);
    });
});

app.get('/error', (req, res) => {
    res.render('error');
});
