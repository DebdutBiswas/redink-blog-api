const { createTransport } = require('nodemailer');
const {
    mailHost,
    mailPort,
    mailSenderAddress,
    mailSenderName,
    mailUser,
    mailPassword,
    mailIsSecure,
    mailIsStartTLS,
    mailIsStrictTLS
} = require('../configs/mail');

let sendNotifyMail = async (sendMailObj) => {
    let mailAuthObj = {
        host: mailHost,
        port: mailPort,
        auth: {
            type: 'login',
            user: mailUser,
            pass: mailPassword
        },
        authMethod: 'PLAIN'
    };

    if (mailIsSecure) {
        if (mailIsStartTLS) {
            mailAuthObj = {
                ...mailAuthObj,
                secure: false,
                requireTLS: true
            };
        } else {
            mailAuthObj = {
                ...mailAuthObj,
                secure: true
            };
        }

        if (mailIsStrictTLS) {
            mailAuthObj = {
                ...mailAuthObj,
                tls: {
                    servername: mailHost,
                    rejectUnauthorized: true
                }
            };
        } else {
            mailAuthObj = {
                ...mailAuthObj,
                tls: {
                    servername: mailHost,
                    rejectUnauthorized: false
                }
            };
        }
    } else {
        mailAuthObj = {
            ...mailAuthObj,
            secure: false,
            ignoreTLS: true
        };
    }

    let sendMailResult = {};

    let propsEmpty = false;
    let propsNull = false;

    const sendMailPropsArr = ['receipent', 'subject', 'bodyTxt', 'bodyHtml'];

    sendMailPropsArr.forEach((key) => {
        propsEmpty = !(key in sendMailObj);
    });

    propsNull = !Object.values(sendMailObj).every((key) => key !== null);

    if (sendMailObj !== null) {
        if (!(propsEmpty && propsNull)) {
            // create reusable transporter object using the default SMTP transport
            let transporter = createTransport(mailAuthObj);

            try {
                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `"${mailSenderName}" <${mailSenderAddress}>`,
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