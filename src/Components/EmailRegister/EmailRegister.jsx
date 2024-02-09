import React, { useState } from "react";
import "./EmailRegister.css";
import { Link } from "react-router-dom";
import Image from "../../assets/Image.jfif";
import { connect } from "react-redux";
import { registerSuccess } from "../../Actions/TaskActions.js";

const EmailRegister = ({ registerSuccess, userEmail }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "+91",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      console.error("Please agree to the terms and conditions");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data", responseData);

      if (response.ok) {
        alert("User registered successfully");
        registerSuccess(responseData.user);
        window.location.href = "/";
      } else if (responseData.message === "Email is already registered") {
        alert(responseData.message);
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="emailRegister">
      <div className="image">
        <img src={Image} alt="Image" className="image" />
      </div>
      <div className="registerSection">
        <h2 className="title">Register</h2>
        <p className="description">
          Hey! Fill up the information below to create an account
        </p>
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="formName">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="firstname"
              placeholder="First Name*"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="lastname"
              placeholder="Last Name*"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="formEmail"
            placeholder="Email Address*"
            onChange={handleChange}
            value={formData.email}
          />
          <div className="formPhone">
            <select
              id="countryCode"
              name="countryCode"
              className="countryCode"
              onChange={handleChange}
              value={formData.countryCode}
            >
              <option value="+1">United States (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
              <option value="+91">India (+91)</option>
              <option value="+61">Australia (+61)</option>
              <option value="+33">France (+33)</option>
              <option value="+49">Germany (+49)</option>
              <option value="+81">Japan (+81)</option>
              <option value="+86">China (+86)</option>
              <option value="+52">Mexico (+52)</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="phonenumber"
              placeholder="+1 Phone Number*"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            className="formPassword"
            placeholder="Password*"
            onChange={handleChange}
            value={formData.password}
          />
          <div className="termsAndCondition">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              className="TandC-Checkbox"
              onChange={handleChange}
              checked={formData.agreeToTerms}
            />
            <label className="TandC-Label">
              I agree to the{" "}
              <a href="#" className="TandC-Link">
                Terms and Conditions.
              </a>
            </label>
          </div>
          <button type="submit" className="formSubmitButton">
            Create Account
          </button>
        </form>
        <p className="alreadyHaveAccount">
          Already have an account?{" "}
          <Link to="/" className="formLoginButton">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.users.userEmail || "",
});

const mapDispatchToProps = (dispatch) => ({
  registerSuccess: (user) => dispatch(registerSuccess(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailRegister);
