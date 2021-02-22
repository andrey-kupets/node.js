const DB = require('../dataBase/users');

module.exports = {
    findAllUsers: () => {
        return DB;
    },
    /**
     *
     * @param userId - this is integer ID of user which should be returned
     * @returns {{password: string, name: string, email: string}|{password: string, name: string, email: string}|{password: string, name: string, email: string}|{password: string, name: string, email: string}|{password: string, name: string, email: string}}
     */
    findUserById: (userId) => {
        return DB[userId];
    },
    createUser: (userObject) => {
        DB.push(userObject);
    }
};
