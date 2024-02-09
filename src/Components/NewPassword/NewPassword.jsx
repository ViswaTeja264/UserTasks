import React, { useState } from "react";
import "./NewPassword.css";
import { Link, useLocation } from "react-router-dom";
import Image from "../../assets/Image.jfif";

const NewPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailFromParams = searchParams.get("email");
  const [newPassword, setNewPassword] = useState("");
  const [reTypeNewPassword, setReTypeNewPassword] = useState("");

  const handleCreatePassword = async () => {
    if (!newPassword || !reTypeNewPassword) {
      alert("Please enter both new password and re-type new password.");
      return;
    }

    if (newPassword !== reTypeNewPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }

    const emailFromParams = searchParams.get("email");

    try {
      const response = await fetch("http://localhost:3000/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailFromParams,
          newPassword,
        }),
      });

      if (response.ok) {
        alert("Password updated successfully");
        // Redirect to a different page or perform any other actions
        window.location.href = '/';
      } else {
        console.error("Error updating password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="newPassword">
      <div className="newPasswordImageSection">
        <img src={Image} alt="newPasswordImage" className="newPasswordImage" />
      </div>
      <div className="newPasswordSection">
        <h2 className="newPasswordTitle">Create New Password</h2>
        <p className="newPasswordDescription">
          Create a new password for your account {emailFromParams}
        </p>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="newPasswordInput"
          placeholder="New Password*"
        />
        <input
          type="password"
          id="retypeNewPassword"
          name="retypeNewPassword"
          value={reTypeNewPassword}
          onChange={(e) => setReTypeNewPassword(e.target.value)}
          className="reTypeNewPasswordInput"
          placeholder="Re-Type New Password*"
        />
        <button
          type="button"
          className="newPasswordButton"
          onClick={handleCreatePassword}
        >
          Create
        </button>
        <p className="noAccount">
          Don't have an account?{" "}
          <Link to="/register" className="newPasswordRegister">
            Create Account Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewPassword;
