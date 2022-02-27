const { createTransport } = require('nodemailer');
const { mailHost, mailSenderAddress, mailSenderName, mailUser, mailPassword } = require('../configs/mail');

let sendNotifyMail = async (sendMailObj) => {
    const mailAuthObj = {
        server: mailHost,
        sender: mailSenderAddress,
        senderName: mailSenderName,
        user: mailUser,
        pass: mailPassword
    };
    let sendMailResult = {};

    let propsEmpty = false;
    let propsNull = false;

    const sendMailPropsArr = ['receipent', 'subject', 'bodyTxt', 'bodyHtml'];
    const mailAuthPropsArr = ['server', 'sender', 'senderName', 'user', 'pass'];

    sendMailPropsArr.forEach((key) => {
        propsEmpty = !(key in sendMailObj);
    });
    mailAuthPropsArr.forEach((key) => {
        propsEmpty = !(key in mailAuthObj);
    });

    propsNull = !Object.values(sendMailObj).every((key) => key !== null) || !Object.values(mailAuthObj).every((key) => key !== null);

    if (sendMailObj !== null) {
        if (!(propsEmpty && propsNull)) {
            // create reusable transporter object using the default SMTP transport
            let transporter = createTransport({
                host: `${mailAuthObj.server}`,
                port: 465,
                secure: true,
                tls: {
                    servername: `${mailAuthObj.server}`,
                    rejectUnauthorized: true
                },
                requireTLS: true,
                auth: {
                    type: 'login',
                    user: `${mailAuthObj.user}`,
                    pass: `${mailAuthObj.pass}`
                },
                authMethod: 'PLAIN'
            });

            try {
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `"${mailAuthObj.senderName}" <${mailAuthObj.sender}>`,
                    to: `${sendMailObj.receipent}`,
                    subject: `${sendMailObj.subject}`,
                    text: `${sendMailObj.bodyTxt}`,
                    html: `${sendMailObj.bodyHtml}`
                });

                if ('messageId' in info) {
                    sendMailResult = {
                        msg: 'Mail sent successfully!',
                        statusCode: '250',
                        mailSent: true,
                        messageId: await info.messageId,
                        mailDetails: sendMailObj
                    };
                }
            } catch (err) {
                sendMailResult = {
                    msg: err.message || 'Mail not sent!',
                    statusCode: '550',
                    mailSent: false,
                    messageId: null,
                    mailDetails: sendMailObj
                };
            }
        }
    }
    // else return null;
    else {
        sendMailResult = {
            msg: 'Mail not sent!',
            statusCode: '550',
            mailSent: false,
            messageId: null,
            mailDetails: sendMailObj
        };
    }
    process.env.NODE_ENV === 'development' ? console.log(sendMailResult) : '';
    return sendMailResult;
};

// Dummy async email send delay simulation in debug
if (process.env.NODE_ENV === 'debug') {
    sendNotifyMail = async (sendMailObj) => {
        const sendMailResult = {
            msg: 'Mail sent successfully!',
            statusCode: '250',
            mailSent: true,
            messageId: 'debug_mode',
            mailDetails: sendMailObj
        };
        // Huge loop simulating time required to send email
        for (let i = 0; i <= 1000000000; i++);
        console.log(sendMailResult);
        return sendMailResult;
    }
}

module.exports = {
    sendNotifyMail
};