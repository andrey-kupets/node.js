const resCodes = require('../constant/responseCodes.enum');
const errMessages = require('../messages/user/error.messages');
const userService = require('../service/user.service');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {
                name, email, password, preferLang = 'ua'
            } = req.body;

            // условие наличия полей можно также задавать в модели  - required: true
            if (!name || !email || !password) {
                throw new Error(errMessages.EMPTY[preferLang]);
            }

            if (!email.includes('@')) {
                throw new Error(errMessages.INVALID_MAIL[preferLang]);
            }

            if (password.length < 6) {
                throw new Error(errMessages.TOO_WEAK_PASSWORD[preferLang]);
            }

            if (password.length > 255) {
                throw new Error(errMessages.TOO_STRONG_PASSWORD[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferLang = 'ua' } = req.body;

            if (userId.length !== 24) {
                throw new Error(errMessages.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    doesUserExist: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            const users = await userService.findAllUsers();
            const invalidUser = users.some((user) => user.email === req.body.email);

            if (invalidUser) {
                throw new Error(errMessages.USER_EXISTS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    areNoUsers: async (req, res, next) => {
        try {
            const { preferLang = 'ua' } = req.body;
            const users = await userService.findAllUsers(req.query);

            if (!users.length) {
                throw new Error(errMessages.NO_USERS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    isNoUser: async (req, res, next) => {
        try {
            const { params: { userId }, body: { preferLang = 'ua' } } = req;
            const user = await userService.findUserById(userId);

            if (!user) {
                throw new Error(errMessages.NO_USER[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },
};
