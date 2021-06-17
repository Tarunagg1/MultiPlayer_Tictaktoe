'use strict';

const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.email_PASSWORD // generated ethereal password
    }
});

const sendMail = async (to, subject, template, data, event) => {
    let mail = {
        from: process.env.EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: template,
    };

    try {
        let info = await transporter.sendMail(mail);
    } catch (error) {
        console.log('Error:' + error);
        logger.log('Error:' + error);
    }
};


const sendOTPToUser = (to) => {
    try {
        let filePath = path.resolve(__dirname + '/template/otp.ejs'),
            compiled = ejs.compile(fs.readFileSync(filePath, 'utf8')),
            dataToCompile = {
                name: to.email,
                otp:to.otp
            },
            Subject = 'Akhetpe Login Otp';

        return sendMail(to.email, Subject, compiled(dataToCompile));
    } catch (e) {
        console.log(e);
        logger.error(e);
    }
};

module.exports.sendMail = sendMail;
module.exports.sendOTPToUser = sendOTPToUser;
