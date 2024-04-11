import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const mailer = (mail, subject, text, html, attachments) => {
    return new Promise((resolve, reject) => {
        console.log({
            mail,
            subject,
            text,
            html,
            attachments,
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'support@chamsswitch.com',
                pass: 'yphvcagvwewrnxhp',
            },
        });
        const mailOptions = {
            from: 'ChamsPay',
            to: mail,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments,
        };
        transporter
            .sendMail(mailOptions)
            .then(() => {
            console.log('Mail sent successfully');
            resolve('Mail sent successfully');
        })
            .catch((error) => {
            console.error(error.message);
            resolve(error.message);
        });
    });
};
export default mailer;
