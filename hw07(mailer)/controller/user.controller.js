const { emailActionsEnum: { WELCOME } } = require('../constant');
const { mailService, userService } = require('../service');
const { passwordHasher } = require('../helpers');
const { responseCodesEnum } = require('../constant');
const { userMsg: { confirmMsg } } = require('../messages');

module.exports = {
    createUser: async (req, res, next) => {
        const { preferLang = 'ua' } = req.body;

        try {
            const { email, name, password } = req.body;
            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await mailService.sendMail(email, WELCOME, { userName: name });

            res.status(responseCodesEnum.CREATED).json(confirmMsg.USER_CREATED[preferLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        const { query } = req;

        try {
            const users = await userService.findAllUsers(query);

            res.status(responseCodesEnum.OK).json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        const { params: { userId } } = req;

        try {
            await userService.deleteUser(userId);

            if (userId !== req.user.id) { // _id.toString()
                throw new Error('Unauthorized');
            }

            // eslint-disable-next-line max-len
            res.json('User is deleted').status(responseCodesEnum.NO_CONTENT); // если ставить статус 204 No Content -  то он(если будет идти первым по коду) перебивает инфо джейсона json('User is deleted') и на выходе будет пустота
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        const { params: { userId } } = req;

        try {
            const user = await userService.findUserById(userId);

            res.status(responseCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await userService.shiftUser(userId, req.body);

            res.status(responseCodesEnum.OK).json(confirmMsg.USER_UPDATED[preferLang]);
        } catch (e) {
            next(e);
        }
    }
};
