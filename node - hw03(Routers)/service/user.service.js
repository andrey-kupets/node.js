const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const errMessages = require('../messages/error.messages');

const DB =  path.join(process.cwd(), 'dataBase', 'users.json');
// const DB = path.join(__dirname, '../', 'dataBase', 'users.json'); // or in that way
// проверка как выйти на правильный путь __dirname vs __process.cwd()
// console.log(__dirname)
// console.log(process.cwd())

const readFileByPromise = promisify(fs.readFile);
const writeFileByPromise = promisify(fs.writeFile);

module.exports = {
    createUser: async (userObj) => {
        const dataUsers = await readFileByPromise(DB);
        const users = JSON.parse(dataUsers.toString());
        const {preferLang = 'en'} = userObj;

        const invalidUser = users.some(user => user.email === userObj.email);

        if (invalidUser) {
            throw new Error(errMessages.USER_EXISTS[preferLang]);
        }

        users.push(userObj);
        await writeFileByPromise(DB, JSON.stringify(users));
    },

    findAllUsers: async (preferLang, query) => {
        const dataUsers = await readFileByPromise(DB);
        const {name} = query;
        const users = JSON.parse(dataUsers.toString());

        if (!name) {
            return users;
        }

        const anyUser = users.some(user => user.name === name);
        const filter = users.filter(user => user.name === name);

        if (!anyUser) {
            throw new Error(errMessages.NO_USERS[preferLang]);
        }

        return filter;
    },

    // findUserByName: async (name, preferLang) => {
    //     const dataUsers = await readFileByPromise(DB);
    //     const users = JSON.parse(dataUsers.toString());
    //
    //     const validUser = users.find(user => user.name === name);
    //
    //     if(!validUser) {
    //         throw new Error(errMessages.NO_USER[preferLang]);
    //     }
    //
    //     return validUser;
    // },

    deleteUser: async (userId) => {
        const dataUsers = await readFileByPromise(DB);
        const users = JSON.parse(dataUsers.toString());

        users.splice(userId, 1);
        await writeFileByPromise(DB, JSON.stringify(users));
    },

    findUserById: async (userId) => {
        const dataUsers = await readFileByPromise(DB);

        return JSON.parse(dataUsers.toString())[userId];
    }

}

