const userService = require('../service/user.service');
const resCode = require('../constant/responseCodes.enum');
const { userMsg: { confirmMsg } } = require('../messages');

module.exports = {
    createUser: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            await userService.createUser(req.body);

            res.status(resCode.CREATED).json(confirmMsg.USER_CREATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        const { query } = req;

        try {
            const users = await userService.findAllUsers(query);

            res.status(resCode.OK).json(users);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        const { params: { userId } } = req;

        try {
            await userService.deleteUser(userId);

            // eslint-disable-next-line max-len
            res.json('User is deleted').status(resCode.NO_CONTENT); // если ставить статус 204 No Content -  то он(если будет идти первым по коду) перебивает инфо джейсона json('User is deleted') и на выходе будет пустота
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        const { params: { userId } } = req;

        try {
            const user = await userService.findUserById(userId);

            res.status(resCode.OK).json(user);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await userService.shiftUser(userId, req.body);

            res.status(resCode.OK).json(confirmMsg.USER_UPDATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.messages);
        }
    }
};
