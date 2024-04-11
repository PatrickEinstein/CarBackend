import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

interface Attachment {
  filename: string;
  content: string | Buffer;
}

const mailer = (
  mail: string,
  subject: string,
  text: string,
  html: string,
  attachments: Attachment[]
): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log({
      mail,
      subject,
      text,
      html,
      attachments,
    });

    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'support@chamsswitch.com',
        pass: 'yphvcagvwewrnxhp',
      },
    });

    const mailOptions: SendMailOptions = {
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


