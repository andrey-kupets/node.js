const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error ('not valid id');
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {name, password, preferLang = 'en'} = req.body;

            if (!name || !password) {
                throw new Error('some fields are empty');
            }

            if (password.length < 6) {
                // throw new Error(errorMessages.TOO_WEAK_PASSWORD["ua"]);
                throw new Error(errorMessages.TOO_WEAK_PASSWORD[preferLang]);
            }

            next();

        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}



