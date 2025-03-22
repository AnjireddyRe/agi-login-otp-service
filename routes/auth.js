/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to an email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for an email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified
 */

const express = require('express');
const { sendOTPEmail } = require('../utils/mailer');
const { setOtp, getOtp, deleteOtp, generateOtp } = require('../utils/tempOtpStore');

const router = express.Router();

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        const token = generateOtp();
        setOtp(email, { token });       
        //console.log('token-->', token)
        await sendOTPEmail(email, token);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP. Email may be invalid.' });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const data = getOtp(email);
    if (!data) return res.status(400).json({ message: 'OTP expired or not found' });



    if (data.token === otp) {
        deleteOtp(email);
        return res.status(200).json({ message: 'OTP verified' });
    }

    res.status(401).json({ message: 'Invalid OTP' });
});

module.exports = router;
