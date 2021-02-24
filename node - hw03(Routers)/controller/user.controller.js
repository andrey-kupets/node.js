const userService = require('../service/user.service');
const resCode = require('../constant/responseCodes.enum');
const confirmMessages = require('../messages/confirm.messages');

module.exports = {
    makeUser: async ({body, body: {preferLang = 'en'}}, res) => {
        try {
            await userService.createUser(body);

            res.status(resCode.CREATED).json(confirmMessages.USER_CREATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();

            res.status(resCode.OK).json(users);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserByName: async (req, res) => {
        try {
            const {name} = req.params;
            const {preferLang = 'en'} = req.body;
            const user = await userService.findUserByName(name, preferLang);

            res.status(resCode.OK).json(user);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    kickOutUser: async ({params: {userId}, body: {preferLang = 'en'}}, res) => {
        try {
            await userService.deleteUser(userId);

            res.status(resCode.OK).json(confirmMessages.USER_DELETED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: async ({params: {userId}}, res) => {
        try {
            const user = await userService.findUserById(userId);

            res.status(resCode.OK).json(user);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    }
}