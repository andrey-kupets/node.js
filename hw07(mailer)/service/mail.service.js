const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporterMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new Error('Wrong mail action'); // todo
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporterMail.sendMail({
            from: 'NowhereMan',
            to: userMail,
            subject: templateInfo.subject,
            html // совпадают ключ и велью
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
    // объектом, потому что делаем заготовку на будущее для разных рассылок
};
