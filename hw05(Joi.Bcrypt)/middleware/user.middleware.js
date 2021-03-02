const { responseCodesEnum } = require('../constant');
const { userMsg: { errorMsg } } = require('../messages');
const userService = require('../service/user.service');
const {
    commonValidators: { mongoIdValidator },
    userValidators: { createUserValidator, findUserByQueryValidator }
} = require('../validators');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            const { error } = mongoIdValidator.validate(userId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    doesUserExist: async (req, res, next) => {
        try {
            // 1st var
            //
            // const { preferLang = 'ua' } = req.body;
            // const users = await userService.findAllUsers();
            // const invalidUser = users.some((user) => user.email === req.body.email);
            //
            // if (invalidUser) {
            //     throw new Error(errMessages.USER_EXISTS[preferLang]);
            // }

            // 2nd var

            const { email, preferLang = 'ua' } = req.body;
            const users = await userService.findAllUsers({ email });

            if (users.length) {
                throw new Error(errorMsg.USER_EXISTS[preferLang]);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    areNoUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers(req.query);
            const { error } = findUserByQueryValidator.validate(users);

            if (!users.length) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isNoUser: async (req, res, next) => {
        try {
            const { params: { userId }, body: { preferLang = 'ua' } } = req;
            const user = await userService.findUserById(userId);

            if (!user) {
                throw new Error(errorMsg.NO_USER[preferLang]);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
};
