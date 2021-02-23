const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const DB =  path.join(process.cwd(), 'dataBase', 'users.json');
// проверка как выйти на правильный путь __dirname vs __process.cwd()
// console.log(__dirname)
// console.log(process.cwd())

const readFileByPromise = promisify(fs.readFile);
const writeFileByPromise = promisify(fs.writeFile);

module.exports = {
    createUser: async (userObj) => {
        const dataUsers = await readFileByPromise(DB);
        const users = JSON.parse(dataUsers.toString());

        const invalidUser = users.some(user => user.email === userObj.email)

        if (invalidUser) {
            throw new Error('this user exists')
        }

        users.push(userObj);
        await writeFileByPromise(DB, JSON.stringify(users));
    },

    findAllUsers: async () => {
        const dataUsers = await readFileByPromise(DB);

        return JSON.parse(dataUsers.toString());
    },

    findUserByName: async (name) => {
        const dataUsers = await readFileByPromise(DB);
        const users = JSON.parse(dataUsers.toString());

        const validUser = users.find(user => user.name === name);

        if(!validUser) {
            throw new Error('there is no user');
        }

        return validUser;
    },

    deleteUser: async (userId) => {
        const dataUsers = await readFileByPromise(DB);
        const users = JSON.parse(dataUsers.toString());

        users.splice(userId, 1);
        await writeFileByPromise(DB, JSON.stringify(users));
    },

    findUserById: async (userId) => {
        const dataUsers = await readFileByPromise(DB);

        return JSON.parse(dataUsers.toString())[userId]
    }

}

