const { User } = require('../models');
require('../models'); // SUPER WORK!!

module.exports = {
    createUser: (userObj) => User.create(userObj),

    findAllUsers: (query) => User.find(query),

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserById: (userId) => User.findById(userId),

    findUserByEmail: (email) => User.findOne(email).select('+password'),

    shiftUser: (userId, newUserObj) => User.findByIdAndUpdate(userId, newUserObj),

    updateUserById: (userId, updatedObject) => User.updateOne({ _id: userId }, { $set: updatedObject })
};
