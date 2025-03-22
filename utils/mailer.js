const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.SEND_EMAIL,
        to: email,
        subject: 'Your One-Time Password (OTP)',
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email send error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });

};

module.exports = { sendOTPEmail };
