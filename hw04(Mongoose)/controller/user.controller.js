const userService = require('../service/user.service');
const resCode = require('../constant/responseCodes.enum');
const confirmMessages = require('../messages/confirm.messages');

module.exports = {
    // createUser: async ({ body, body: { preferLang = 'en' } }, res) => {
    //     try {
    //         await userService.createUser(body);
    //
    //         res.status(resCode.CREATED).json(confirmMessages.USER_CREATED[preferLang]);
    //     } catch (e) {
    //         res.status(resCode.BAD_REQUEST).json(e.message);
    //     }
    // },

    createUser: async (req, res) => {
        const { preferLang = 'ua' } = req.body;

        try {
            await userService.createUser(req.body);

            res.status(resCode.CREATED).json(confirmMessages.USER_CREATED[preferLang]);
        } catch (e) {
            res.status(resCode.BAD_REQUEST).json(e.message);
        }
    },

    getAllUsers: async (req, res) => {
        // const { body: { preferLang = 'en' }, query } = req;
        //
        try {
            const users = await userService.findAllUsers(req.query);

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
    }
};
