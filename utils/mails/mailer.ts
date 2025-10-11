const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(email:string, confirmationToken:string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Confirm your account',
        text: `Please confirm your account by clicking this link: https://yourdomain.com/api/auth/confirm/${confirmationToken}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}

module.exports = { sendEmail };