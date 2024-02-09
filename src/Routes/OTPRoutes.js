import express from "express";
const router = express.Router();
import { sendOTP } from '../Controllers/SendOTPController.js';
import { verifyOTP } from '../Controllers/VerifyOTPController.js';

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;