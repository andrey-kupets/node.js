const { passwordHasher } = require('../helpers');
const { responseCodesEnum } = require('../constant');
const { userMsg: { confirmMsg } } = require('../messages');
const { userService } = require('../service');

module.exports = {
    createUser: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            const { password } = req.body;
            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(responseCodesEnum.CREATED).json(confirmMsg.USER_CREATED[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        const { query } = req;

        try {
            const users = await userService.findAllUsers(query);

            res.status(responseCodesEnum.OK).json(users);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        const { params: { userId } } = req;

        try {
            await userService.deleteUser(userId);

            if (userId !== req.user.id) { // _id.toString()
                throw new Error('Unauthorized');
            }

            // eslint-disable-next-line max-len
            res.json('User is deleted').status(responseCodesEnum.NO_CONTENT); // если ставить статус 204 No Content -  то он(если будет идти первым по коду) перебивает инфо джейсона json('User is deleted') и на выходе будет пустота
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        const { params: { userId } } = req;

        try {
            const user = await userService.findUserById(userId);

            res.status(responseCodesEnum.OK).json(user);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await userService.shiftUser(userId, req.body);

            res.status(responseCodesEnum.OK).json(confirmMsg.USER_UPDATED[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.messages);
        }
    }
};
