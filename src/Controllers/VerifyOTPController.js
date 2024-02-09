import OTPModel from '../Models/OTPModel.js';

const verifyOTP = async (req, res) => {
  const { email, enteredOTP } = req.body;

  try {
    // Find the latest OTP for the given email
    const storedOTPData = await OTPModel.findOne({ email }).sort({ timestamp: -1 });

    if (!storedOTPData) {
      return res.status(400).json({ message: 'No OTP found for the provided email' });
    }

    const storedOTP = storedOTPData.otp;

    if (enteredOTP === storedOTP) {
      // OTP is correct
      return res.status(200).json({ message: 'OTP verification successful' });
    } else {
      // Incorrect OTP
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { verifyOTP };
