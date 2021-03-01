const User = require('../models/User');
require('../models/Car'); // SUPER WORK!!

module.exports = {
    createUser: (userObj) => User.create(userObj),

    findAllUsers: (query) => User.find(query),

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserById: (userId) => User.findById(userId)
};
