const { authMsg: { confirmMsg } } = require('../messages');
const { authService } = require('../service');
const { passwordHasher, tokenizer } = require('../helpers');
const { responseCodesEnum } = require('../constant');
const { User } = require('../models');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { email, password, preferLang = 'ua' } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('NO USER');
            }

            await passwordHasher.compare(password, user.password, preferLang);

            const tokens = tokenizer();

            await authService.authorize({ ...tokens, _user_id: user._id });

            res.json(tokens);
            res.status(responseCodesEnum.OK).json(confirmMsg.USER_AUTH[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    reAuthUser: async (req, res) => {
        try {
            const tokens = tokenizer(); // req.get('Authorization');
            const { token } = req;
            const { email } = req.body;
            const user = await User.findOne({ email });

            await authService.deleteTokens({ refresh_token: token });
            await authService.authorize({ ...tokens, _user_id: user._id });

            res.json(tokens).status(responseCodesEnum.NO_CONTENT);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
