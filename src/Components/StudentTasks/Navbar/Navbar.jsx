import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../assets/TaskLogo.svg";
import { useNavigate } from "react-router-dom";
// import { logout } from "../../../Actions/TaskActions";
import { updateProfileImage } from "../../../Actions/TaskActions";
import NoProfile from "../../../assets/NoProfile.jpg";

const Navbar = ({ user, profileImageURL, updateProfileImage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Use the default image if profileImageURL is not available
    const imageURL = profileImageURL || NoProfile;

    // Update the profile image URL in the Redux store
    updateProfileImage(imageURL, user.user.email);
  }, [profileImageURL, user.user.email]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="StudentTaskImage" onClick={() => navigate("/dashboard")}>
        <img src={Logo} alt="Logo" className="navbarLogo" />
      </div>
      <div className="linksAndProfile">
        {/* <div className="navbarLinks">
          <Link to="/info">
            <i className="fa-solid fa-circle-info fa-lg"></i>
          </Link>
          <Link to="/calendar">
            <i className="fa-solid fa-calendar-days fa-lg"></i>
          </Link>
          <Link to="/comments">
            <i className="fa-solid fa-comment-dots fa-lg"></i>
          </Link>
          <Link to="/notifications">
            <i className="fa-solid fa-bell fa-lg"></i>
          </Link>
        </div> */}
        <div className="profile-dropdown">
          <div className="profile-dropdown-btn" onClick={toggleDropdown}>
            <div className="profile-img">
              <img
                src={profileImageURL || NoProfile}
                alt="ProfileImage"
                className="profile-img"
              />
              <i className="fa-solid fa-circle"></i>
            </div>
            <span className="profileName">
              {user && user.user.firstName}
              <i
                className={`fa-solid AngleDown ${
                  isDropdownOpen ? "fa-angle-up" : "fa-angle-down"
                }`}
              ></i>
            </span>
          </div>

          <ul
            className={`profile-dropdown-list ${
              isDropdownOpen ? "active" : ""
            }`}
          >
            <li className="profile-dropdown-list-item">
              <a href="/edit-profile">
                <i className="fa-regular fa-user"></i>
                Edit Profile
              </a>
            </li>
            <li className="profile-dropdown-list-item">
              <Link to="/">
                <i className="fa-regular fa-envelope"></i>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const userEmail = state.auth.users.userEmail;
  const user = state.auth.users[userEmail]?.user || {};
  const profileImageURL =
    state.auth.users[userEmail]?.user.profileImageURL || "";

  return {
    user,
    profileImageURL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileImage: (userEmail, imageURL) =>
      dispatch(updateProfileImage(userEmail, imageURL)),
    // logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
