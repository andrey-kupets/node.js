// const DB = require('../dataBase/users.json'); // *** можно так

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const DBPath =  path.join(process.cwd(), 'dataBase', 'users.json');
// проверка как выйти на правильный путь
// console.log(__dirname)
// console.log(process.cwd())

const readFileByPromise = promisify(fs.readFile);
const writeFileByPromise = promisify(fs.writeFile);

module.exports = {
    findAllUsers: async () => {
        // return DB; // *** можно так

        const data = await readFileByPromise(DBPath);
        return JSON.parse(data.toString());
    }
}
