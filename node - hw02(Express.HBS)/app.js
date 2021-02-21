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

const app= express();

app.listen(5000, () => {
    console.log('the server is ready');
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
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
    })
})


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
        if (err) console.log(err)

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
})

















































// lesson2:
//
// const express = require('express');
// const expressHbs = require('express-handlebars');
// const path = require('path');
//
// const app = express();
//
// app.listen(5000, () => {
//     console.log('app rules');
// })
//
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
//
// app.use(express.static(path.join(__dirname, 'static')));
// app.set('view engine', '.hbs'); // какой движок использовать для отображения
// app.engine('.hbs', expressHbs({
//     defaultLayout: false //this parameter is strictly required - способ действия, какие настройки использовать, при обработке файлов .hbs
// }));
// app.set('views', path.join((__dirname, 'static'))); // путь, где вьюшки лежат
//
//
// let users = [
//     {name: 'vasya', gender: 'male', age: 21},
//     {name: 'manya', gender: 'female', age: 18},
//     {name: 'kolya', gender: 'male', age: 27},
//     {name: 'sonya', gender: 'female', age: 17},
//     {name: 'marina', gender: 'female', age: 35},
//     {name: 'petya', gender: 'male', age: 46},
//     {name: 'ostap', gender: 'male', age: 19},
//     {name: 'violeta', gender: 'female', age: 20},
// ];
//
// app.get('/login', (req, res) => {
//     res.render('login', {okok: true, name: 'Serg'});
// });
//
// app.post('/login', (req, res) => {
//     // console.log('-------------------------');
//     // console.log(req.body);
//     // console.log('-------------------------');
//     users.push(req.body);
//     // res.json("User's registered now");
//     res.redirect('/users');
// })
//
// app.get('/users', ((req, res) => {
//     const {gender} = req.query;
//     let usersToShow = JSON.parse(JSON.stringify(users));
//
//     if (gender) {
//         usersToShow = users.filter(user => user.gender === gender);
//     }
//
//     res.render('users', {users: usersToShow});
// }))
//
// app.get('/users/:userId', ((req, res) => {
//     console.log(req.params);
//     const {userId} = req.params;
//
//     res.json(users[userId])
// }) )


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
