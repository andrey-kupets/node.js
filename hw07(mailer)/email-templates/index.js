const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.PASSWORD_IS_CHANGED]: {
        templateName: '111',
        subject: 'Ya have to change a password'
    },

    [emailActionsEnum.USER__IS_BLOCKED]: {
        templateName: '222',
        subject: 'Sorry.....your acc was blocked'
    },

    [emailActionsEnum.WELLCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to our brotherhood'
    }
};
