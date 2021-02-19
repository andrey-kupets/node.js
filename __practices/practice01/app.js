// практичне
// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womenOlder20, womenYounger20
// і розподілити ваших юзерів саме по відповідних папках

const entranceData = [
    {name: 'vasya', gender: 'male', age: 21},
    {name: 'manya', gender: 'female', age: 18},
    {name: 'kolya', gender: 'male', age: 27},
    {name: 'sonya', gender: 'female', age: 17},
    {name: 'marina', gender: 'female', age: 35},
    {name: 'petya', gender: 'male', age: 46},
    {name: 'ostap', gender: 'male', age: 19},
    {name: 'violeta', gender: 'female', age: 20},
]
const folders = ['manOlder20','manYounger20','womenOlder20','womenYounger20']

const fs = require('fs');
const path = require('path');

folders.forEach(dir =>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
})

entranceData.forEach(studik => {
    const {name, gender, age} = studik;
    if (age >= 20 && gender === 'male') {
        fs.writeFile(path.join(__dirname, 'manOlder20', `${name}.json`), JSON.stringify(studik), err => {
            if (err) console.log(err);
            console.log(JSON.stringify(studik))
        })
        fs.writeFile(path.join(__dirname, 'manOlder20', `${name}.json`), JSON.stringify(studik), err => {
            if (err) console.log(err);
            console.log(JSON.stringify(studik))
        })
    } else if (age < 20 && gender === 'male') {
        fs.writeFile(path.join(__dirname, 'manYounger20', `${name}.json`), JSON.stringify(studik), err => {
            if (err) console.log(err);
        })
    } else if (age >= 20 && gender === 'female') {
        fs.writeFile(path.join(__dirname, 'womenOlder20', `${name}.json`), JSON.stringify(studik), err => {
            if (err) console.log(err);
        })
    } else if (age < 20 && gender === 'female') {
        fs.writeFile(path.join(__dirname, 'womenYounger20', `${name}.json`), JSON.stringify(studik), err => {
            if (err) console.log(err);
        })
    }
})

console.log(22)



