import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  timestamp: { type: Date, expires: '5m', default: Date.now },
});

const OTPModel = mongoose.model('OTP', otpSchema);

export default OTPModel;
