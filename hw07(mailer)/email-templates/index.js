const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.PASSWORD_IS_CHANGED]: {
        templateName: '111',
        subject: 'Ya have to change a password'
    },

    [emailActionsEnum.USER_IS_BLOCKED]: {
        templateName: 'user-is-blocked',
        subject: 'Acc was blocked'
    },

    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to our brotherhood'
    }
};
