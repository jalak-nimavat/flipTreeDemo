import nodemailer from 'nodemailer';
import 'dotenv/config';
import getConfig from '../config/config.js';

const sendEmail = async (email, subject, text, attachment = null, bcc = null) => {
    try {
        const mail = getConfig(process.env.NODE_ENV);

        const transporter = nodemailer.createTransport({
            host: mail.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: mail.GOOGLE_APP_EMAIL,
                pass: mail.GOOGLE_APP_PASS,
            },
        });

        if (attachment) {
            await transporter.sendMail({
                from: mail.MAIL_FROM,
                to: email,
                subject: subject,
                html: text,
                attachments: [
                    {
                        filename: `${attachment.fileName}.pdf`,
                        path: attachment.filePath,
                        contentType: 'application/pdf',
                    },
                ],
            });
        } else {
            await transporter.sendMail({
                from: mail.MAIL_FROM,
                to: email,
                bcc,
                subject: subject,
                html: text,
            });
        }
    } catch (err) {
        console.log(err.message);
    }
};

export default sendEmail;
