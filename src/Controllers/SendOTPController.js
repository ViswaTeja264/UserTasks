import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import OTPModel from '../Models/OTPModel.js';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store the OTP in MongoDB
  try {
    await OTPModel.create({ email, otp });
  } catch (error) {
    console.error('Error storing OTP in MongoDB:', error);
    return res.status(500).json({ message: 'Error sending OTP' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Password Reset',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending OTP' });
    } else {
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};
export { sendOTP };
