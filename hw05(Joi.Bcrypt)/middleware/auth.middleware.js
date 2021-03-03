const { authValidators } = require('../validators');
const { responseCodesEnum } = require('../constant');

module.exports = {
    authValid: (req, res, next) => {
        try {
            const { error } = authValidators.authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
