const bcrypt = require('bcrypt');

const { authMsg: { errorMsg } } = require('../messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashpassword) => {
        const doesPasswordEquals = await bcrypt.compare(password, hashpassword);

        if (!doesPasswordEquals) {
            throw new Error(errorMsg.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
