const resCodes = require('../constant/responseCodes.enum');
const errMessages = require('../messages/car/error.messages');

module.exports = {
    isCarValid: (req, res, next) => {
        try {
            const {
                model, edition, preferLang = 'ua'
            } = req.body;

            if (!model || !edition) {
                throw new Error(errMessages.EMPTY[preferLang]);
            }

            if (Number.isNaN(edition)) {
                throw new Error(errMessages.INVALID_EDITION[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferLang = 'ua' } = req.body;

            if (carId.length !== 24) {
                throw new Error(errMessages.INVALID_ID[preferLang]);
            }

            next();
        } catch (e) {
            res.status(resCodes.BAD_REQUEST).json(e.message);
        }
    }
};
