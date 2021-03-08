const mailer = require('nodemailer');
// const EmailTemplates = require('email-templates');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');

const transporterMail = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = (userMail) => {
    try {
        return transporterMail.sendMail({
            from: 'NowhereMan',
            to: userMail,
            subject: 'xxx',
            html: ''
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
    // объектом, потому что делаем заготовку на будущее для разных рассылок
};
