const { authMsg: { confirmMsg } } = require('../messages');
const { authService } = require('../service');
const { responseCodesEnum } = require('../constant');
const { User } = require('../models');

module.exports = {
    authorize: async (req, res) => {
        try {
            const { email, password, preferLang = 'ua' } = req.body;
            const user = await User.findOne({ email });

            await authService.authorize(password, user, preferLang);

            res.status(responseCodesEnum.OK).json(confirmMsg.USER_AUTH[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
