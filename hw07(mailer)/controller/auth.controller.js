const { authMsg: { confirmMsg } } = require('../messages');
const { authService } = require('../service');
const { passwordHasher, tokenizer } = require('../helpers');
const { responseCodesEnum } = require('../constant');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { body: { password, preferLang = 'ua' }, user } = req;

            await passwordHasher.compare(password, user.password);

            const tokens = await authService.createRecord(user._id);

            res.json(tokens);
            res.status(responseCodesEnum.OK).json(confirmMsg.USER_AUTH[preferLang]);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { _user_id, _id } = req.tokenInfo;
            const tokens = tokenizer();

            await authService.updateById(_id, { ...tokens, _user_id });

            res.json(tokens).status(responseCodesEnum.OK);
        } catch (e) {
            res.status(responseCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
