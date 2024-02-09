import React, { useState, createRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./OTPVerify.css";
import OtpInput from "./OTPInput";
import Image from "../../assets/Image.jfif";

const OTPVerify = () => {
  const length = 6;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailFromParams = searchParams.get("email");
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = Array(length)
    .fill()
    .map((_, index) => createRef());

    
    const handleInputChange = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
  
      // If a number is entered, move focus to the next input
      if (value.match(/[0-9]/) && index < length - 1 && !otp[index + 1]) {
        inputRefs[index + 1].current.focus();
      }
  
      setOtp(newOtp);
    };
  
    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && index > 0 && !otp[index]) {
        // Move focus to the previous input on Backspace
        inputRefs[index - 1].current.focus();
      }
    };

    const handleVerify = async () => {
      const email = emailFromParams;
      const enteredOTP = otp.join('');

      try {
        const response = await fetch('http://localhost:3000/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            enteredOTP,
          }),
        });
    
        const data = await response.json();
    
        if (data.message === 'OTP verification successful') {
          // Redirect to a new component
          window.location.href = `/new-password?email=${encodeURIComponent(emailFromParams)}`;
        } else {
          // Show an alert for invalid OTP
          alert('Invalid OTP');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    };

  return (
    <div className="OTPVerify">
      <div className="otpVerifyImageSection">
        <img src={Image} alt="otpVerifyImage" className="otpVerifyImage" />
      </div>
      <div className="otpVerifySection">
        <h2 className="otpVerifyTitle">Forgot Your Password?</h2>
        <p className="otpVerifyDescription">
          Enter The 6 Digit OTP That We Have Send To {emailFromParams}
        </p>
        <OtpInput
          length={length}
          otp={otp}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          inputRefs={inputRefs}
        />
        <button type="button" className="otpVerifyButton" onClick={handleVerify}>
          Verify
        </button>
        <p className="emailNotReceived">
          Didn't receive the email yet?<br/> Please check your spam folder, or{" "}
          <a href="" className="resendOTP">
            resend
          </a>{" "}
          the email.
        </p>
      </div>
    </div>
  );
};

export default OTPVerify;
