import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Image from "../../assets/Image.jfif";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../Actions/TaskActions.js";
import { setLoggedInStatus } from "../../Actions/TaskActions.js";

const Login = ({ loginSuccess, setLoggedInStatus }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("User data:", user);
        loginSuccess(user);
        setLoggedInStatus(true);
        // Login successful
        alert("Login successful");
        // Redirect to another component
        navigate("/dashboard");
      } else {
        // Invalid credentials
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <div className="imageSection">
        <img src={Image} alt="Image" className="image" />
      </div>
      <div className="loginSection">
        <h2 className="Logintitle">Login</h2>
        <div className="emailWithIcon">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="loginEmail"
            placeholder="Email Address"
          />
          <i className="fa-solid fa-envelope"></i>
        </div>
        <div className="passwordWithIcon">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginPassword"
            placeholder="Password"
          />
          <i className="fa-solid fa-lock"></i>
        </div>
        <div className="RememberAndForgot">
          <div className="remember">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="rememberMeCheckBox"
            />
            <label htmlFor="rememberme" className="rememberMeLabel">
              Remember Me
            </label>
          </div>
          <div className="forgot">
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
          </div>
        </div>
        <button type="button" className="loginButton" onClick={handleLogin}>
          <p>Login</p>
        </button>
        {/* <p className="orLoginWith">or login with</p>
        <div className="loginSocialIcons">
          <i className="fa-brands fa-google fa-xl"></i>
          <i className="fa-brands fa-facebook fa-xl"></i>
          <i className="fa-brands fa-linkedin fa-xl"></i>
          <i className="fa-brands fa-apple fa-xl"></i>
        </div> */}
        <p className="register">
          Don't have an account?{" "}
          <Link to="/email-register" className="registerLink">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(null, { loginSuccess, setLoggedInStatus })(Login);