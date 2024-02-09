import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Image from "../../assets/Image.jfif";

const Register = () => {
  return (
    <div className="register">
      <div className="image">
        <img src={Image} alt="Image" className="image" />
      </div>
      <div className="registerSection">
        <h2 className="registerTitle">Register</h2>
        <p className="registerDescription">
          Tap on any option to create an account
        </p>
        <div className="registerSocialIcons">
          <button type="button" className="google">
            <i className="fab fa-google fa-xl google-logo"></i>
            <p className="googleText">Sign Up with Google</p>
          </button>
          <button type="button" className="facebook">
            <i className="fab fa-facebook fa-xl facebook-logo"></i>
            <p className="facebookText">Sign Up with Facebook</p>
          </button>
          <button type="button" className="linkedin">
            <i className="fab fa-linkedin fa-xl linkedin-logo"></i>
            <p className="linkedinText">Sign Up with LinkedIn</p>
          </button>
          <button type="button" className="apple">
            <i className="fab fa-apple fa-xl apple-logo"></i>
            <p className="appleText">Sign Up with Apple</p>
          </button>
          <button type="button" className="registerEmail">
            <i className="far fa-envelope fa-xl email-logo"></i>
            <Link to="/email-register" className="emailText">
              Sign Up with Email
            </Link>
          </button>
        </div>
        <p className="alreadyhaveAccount">
          Already have an account?{" "}
          <Link to="/" className="loginLink">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
