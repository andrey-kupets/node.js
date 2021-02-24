const userService = require('../service/user.service');
const resCode = require('../constant/responseCodes.enum');
const confirmMessages = require('../messages/confirm.messages');

module.exports = {
    createUser: async ({body, body: {preferLang = 'en'}}, res) => {
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

    // getUserByName: async ({params: {name}, body: {preferLang = 'en'}}, res) => {
    //     try {
    //         const user = await userService.findUserByName(name, preferLang);
    //
    //         res.status(resCode.OK).json(user);
    //     } catch (e) {
    //         res.status(resCode.BAD_REQUEST).json(e.message);
    //     }
    // },

    deleteUser: async ({params: {userId}}, res) => {
        try {
            await userService.deleteUser(userId);

            res.json('User is deleted').status(resCode.NO_CONTENT); // если ставить статус 204 No Content -  то он(если будет идти первым по коду) перебивает инфо джейсона json('User is deleted') и на выходе будет пустота
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
