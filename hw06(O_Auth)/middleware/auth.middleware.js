const jwt = require('jsonwebtoken');

const { authMsg: { errorMsg } } = require('../messages');
const { authService } = require('../service');
const { authValidators: { authValidator } } = require('../validators');
const { constants: { AUTHORIZATION } } = require('../constant');
// const ErrorHandler = require('../messages/ErrorHandler');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const { responseCodesEnum } = require('../constant');

module.exports = {
    authValid: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            const { prefLang = 'ua' } = req.body;

            if (!access_token) {
                throw new Error(errorMsg.ACCESS_TOKEN_IS_REQUIRED[prefLang]);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMsg.ACCESS_TOKEN_IS_NOT_VALID_VERIFY[prefLang]);
                }
            });

            const tokens = await authService.findTokensByParams({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMsg.ACCESS_TOKEN_IS_NOT_VALID[prefLang]);
            }

            console.log(access_token);

            req.user = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { prefLang = 'ua' } = req.body;
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMsg.REFRESH_TOKEN_IS_REQUIRED[prefLang]);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMsg.REFRESH_TOKEN_IS_NOT_VALID_VERIFY[prefLang]);
                }
            });

            const tokens = await authService.findTokensByParams({ refresh_token });

            if (!tokens) {
                throw new Error(errorMsg.REFRESH_TOKEN_IS_NOT_VALID[prefLang]);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
