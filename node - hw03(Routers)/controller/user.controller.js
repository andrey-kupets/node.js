const userService = require('../service/user.service');


module.exports = {
    makeUser: async ({body}, res) => {
        try {
            await userService.createUser(body);
            res.status(201).json('user is created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();
            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserByName: async (req, res) => {
        try {
            const {name} = req.params;

            const user = await userService.findUserByName(name);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    kickOutUser: async ({params: {userId}, res}) => {
        try {
            await userService.deleteUser(userId);
            res.status(200).json('user deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUserById: async ({params: {userId}}, res) => {
        try {
            const user = await userService.findUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
}
