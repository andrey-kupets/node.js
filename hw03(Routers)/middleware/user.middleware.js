const resCodes = require('../constant/responseCodes.enum');
const errMessages = require('../messages/error.messages');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {
                name, email, password, preferLang = 'en'
            } = req.body;

            if (!name || !email || !password) {
                throw new Error(errMessages.EMPTY[preferLang]);
            }

            if (!email.includes('@')) {
                throw new Error(errMessages.INVALID_MAIL[preferLang]);
            }

            if (password.length < 6) {
                throw new Error(errMessages.TOO_WEAK_PASSWORD[preferLang]);
            }

            if (password.length > 16) {
                throw new Error(errMessages.TOO_STRONG_PASSWORD[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    // isNameValid: (req, res, next) => {
    //     try {
    //         const {preferLang = 'en'} = req.body;
    //         const name = req.params.name;
    //         const validName = new RegExp("^[A-zА-яЁё]+$");
    //
    //         if (!validName.test(name)) {
    //             throw new Error(errMessages.INVALID_NAME[preferLang]);
    //         }
    //
    //         next();
    //     } catch (e) {
    //         res.status(resCodes.BAD_REQUEST).json(e.message);
    //     }
    // },

    isIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const { preferLang = 'en' } = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errMessages.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    }
};
