const User = require('../models/User');
require('../models/Car'); // SUPER WORK!!
const errMessages = require('../messages/user/error.messages');

module.exports = {
    createUser: async (userObj, preferLang) => {
        const users = await User.find();

        const invalidUser = users.some((user) => user.email === userObj.email);

        if (invalidUser) {
            throw new Error(errMessages.USER_EXISTS[preferLang]);
        }

        return User.create(userObj);
    },

    findAllUsers: async (query, preferLang) => {
        const users = await User.find(query);

        if (!users.length) {
            throw new Error(errMessages.NO_USERS[preferLang]);
        }

        return users;
    },

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserById: async (userId, preferLang) => {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error(errMessages.NO_USER[preferLang]);
        }

        return user;
    }
};
