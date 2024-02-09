import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import forgotPasswordImage from "../../assets/Image.jfif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP sent successfully");
        // Redirect to OTP verification page
        window.location.href = `/otp-verify?email=${encodeURIComponent(email)}`;
      } else {
        console.error("Error sending OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="forgotPassword">
      <div className="forgotPasswordImageSection">
        <img
          src={forgotPasswordImage}
          alt="forgotPasswordImage"
          className="forgotPasswordImage"
        />
      </div>
      <div className="forgotPasswordSection">
        <h2 className="FPTitle">Forgot Your Password?</h2>
        <p className="FPDescription">
          Don't worry, resetting your password is easy. Enter your email address
          to receive a password reset link.
        </p>
        <input
          type="text"
          name="email"
          id="email"
          className="FPEmail"
          placeholder="Email Address*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="FPSendButton" onClick={handleSendClick}>
          Send
        </button>
        <p className="dontHaveAccount">
          Don't have an account?{" "}
          <Link to='/email-register' href="" className="createAccount">
            Create Account Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
