const User = require('../models/User');
require('../models/Car'); // SUPER WORK!!

// const errMessages = require('../messages/error.messages');

module.exports = {
    // createUser: async (userObj) => {
    //     const dataUsers = await readFileByPromise(DB);
    //     const users = JSON.parse(dataUsers.toString());
    //     const { preferLang = 'en' } = userObj;
    //
    //     const invalidUser = users.some((user) => user.email === userObj.email);
    //
    //     if (invalidUser) {
    //         throw new Error(errMessages.USER_EXISTS[preferLang]);
    //     }
    //
    //     users.push(userObj);
    //     await writeFileByPromise(DB, JSON.stringify(users));
    // },

    createUser: (userObj) => User.create(userObj),

    // findAllUsers: async (preferLang, query) => {
    //     const dataUsers = await readFileByPromise(DB);
    //     const { name } = query;
    //     const users = JSON.parse(dataUsers.toString());
    //
    //     if (!name) {
    //         return users;
    //     }
    //
    //     const anyUser = users.some((user) => user.name === name);
    //     const filter = users.filter((user) => user.name === name);
    //
    //     if (!anyUser) {
    //         throw new Error(errMessages.NO_USERS[preferLang]);
    //     }
    //
    //     return filter;
    // },

    findAllUsers: (query) => User.find(query),

    // deleteUser: async (userId) => {
    //     const dataUsers = await readFileByPromise(DB);
    //     const users = JSON.parse(dataUsers.toString());
    //
    //     users.splice(userId, 1);
    //     await writeFileByPromise(DB, JSON.stringify(users));
    // },

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserById: (userID) => User.findById(userID)
};
