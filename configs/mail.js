const dotEnv = require('dotenv');

dotEnv.config({ encoding: 'utf-8' });

module.exports = {
    mailHost: process.env.MAIL_HOST || 'localhost',
    mailSenderAddress: process.env.MAIL_SENDER_ADDRESS || 'dummyblogalerts@localhost',
    mailSenderName: process.env.MAIL_SENDER_NAME || 'Dummy Blog Alerts',
    mailUser: process.env.MAIL_USER || 'dummyblogalerts@localhost',
    mailPassword: process.env.MAIL_PASS || 'abc@123_mail'
};