const userService = require('../service/user.service');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.findAllUsers();
            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
    getOneUser: (req, res) => {
        const { userId } = req.params;

        const user = userService.findUserById(userId);
        res.json(user);
    },
    createOneUser: (req, res) => {
        userService.createUser(req.body);
        res.status(201).json('user is created');
    }
};
