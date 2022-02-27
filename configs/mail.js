const dotEnv = require('dotenv');

dotEnv.config({ encoding: 'utf-8' });

module.exports = {
    mailHost: process.env.MAIL_HOST || 'localhost',
    mailPort: +(process.env.MAIL_PORT) || 25,
    mailSenderAddress: process.env.MAIL_SENDER_ADDRESS || 'dummyblogalerts@localhost',
    mailSenderName: process.env.MAIL_SENDER_NAME || 'Dummy Blog Alerts',
    mailUser: process.env.MAIL_USER || 'dummyblogalerts@localhost',
    mailPassword: process.env.MAIL_PASS || 'abc@123_mail',
    mailIsSecure: !! +(process.env.MAIL_SECURE) || false,
    mailIsStartTLS: !! +(process.env.MAIL_START_TLS) || false,
    mailIsStrictTLS: !! +(process.env.MAIL_STRICT_TLS) || false
};