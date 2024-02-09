import React, { useRef, useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar.jsx";
import "./EditProfile.css";
import { connect } from "react-redux";
import BGImage from "../../../assets/ProfileBGImage.png";
import NoProfile from "../../../assets/NoProfile.jpg";
import {
  updateBackgroundImage,
  updateProfileImage,
  updateUserInformation,
  updateAboutData,
} from "../../../Actions/TaskActions.js";

const EditProfile = ({
  user,
  userEmail,
  imageURL,
  profileImageURL,
  updateBackgroundImage,
  updateProfileImage,
  updateUserInformation,
  updateAboutData,
}) => {
  const [bgImage, setBgImage] = useState(BGImage);
  const [profileImage, setProfileImage] = useState(NoProfile);
  const bgfileInputRef = useRef(null);
  const profilefileInputRef = useRef(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedName, setEditedName] = useState(user.user.firstName);
  const [editedDesignation, setEditedDesignation] = useState(
    user.designation || "Add Your Designation"
  );
  const [editedEmail, setEditedEmail] = useState(user.user.email);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    user.user.phoneNumber || ""
  );
  const [editedAboutData, setEditedAboutData] = useState(user.user.aboutData || "Add About Here");

  useEffect(() => {
    if (imageURL || profileImageURL) {
      setBgImage(imageURL || BGImage);
      setProfileImage(profileImageURL || NoProfile);
    }
    setEditedDesignation(user.designation || "Add Your Designation");
    setEditedAboutData(user.aboutData || "Add About Here");
  }, [user, imageURL, profileImageURL]);

  const handleBgImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64ImageData = reader.result;
      setBgImage(base64ImageData);
      updateBackgroundImage(userEmail, base64ImageData);
    };

    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64ImageData = reader.result;
      setProfileImage(base64ImageData);
      updateProfileImage(userEmail, base64ImageData);
    };

    reader.readAsDataURL(file);
  };

  const handleSelectBgImage = () => {
    bgfileInputRef.current.click();
  };

  const handleSelectProfileImage = () => {
    profilefileInputRef.current.click();
  };

  const handleEditProfileClick = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleEditAboutClick = () => {
    setIsEditingAbout(!isEditingAbout);
  };

  const handleSaveProfileClick = () => {
    const updatedUserInformation = {
      firstName: editedName,
      lastName: user.user.lastName,
      designation: editedDesignation,
      email: editedEmail,
      phoneNumber: editedPhoneNumber,
    };

    updateUserInformation(userEmail, updatedUserInformation);
    setIsEditingProfile(false);
  };

  const handleSaveAboutClick = () => {
    updateAboutData(userEmail, editedAboutData); // Dispatch action to update about data
    setIsEditingAbout(false);
  };

  return (
    <>
      <NavBar />
      <div className="editprofile">
        <div className="BasicDetails">
          <div className="backgroundImage">
            {bgImage && <img src={bgImage} alt="BGImage" className="bgImage" />}
            <input
              type="file"
              accept="image/*"
              id="bgImageInput"
              ref={bgfileInputRef}
              onChange={handleBgImageChange}
              style={{ display: "none" }}
            />
            <button className="editBGButton" onClick={handleSelectBgImage}>
              <i className="fa-solid fa-pencil"></i>
            </button>
          </div>
          <div className="profileWrapper">
            <div className="profileImage">
              {profileImage && (
                <img src={profileImage} alt="ProfileImage" className="pImage" />
              )}
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                ref={profilefileInputRef}
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
              <button
                className="editProfileButton"
                onClick={handleSelectProfileImage}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            <div className="profileContent">
              <button
                className="editContentButton"
                onClick={handleEditProfileClick}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
              {isEditingProfile ? (
                <>
                  <div className="inputsAndButtonsEditMode">
                    <div className="myinputs">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedDesignation}
                        onChange={(e) => setEditedDesignation(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedPhoneNumber}
                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="mybuttons">
                      <button
                        onClick={handleSaveProfileClick}
                        className="SaveButton"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="MyName">
                    {user && user.user.firstName + " " + user.user.lastName}
                  </span>
                  <span className="designation">{editedDesignation}</span>
                  <div className="editProfileEmailSection">
                    <i className="fa-solid fa-envelope fa-small"></i>
                    <span className="myEmail">{editedEmail}</span>
                  </div>
                  <div className="editProfilePhoneSection">
                    <i className="fa-solid fa-phone fa-small"></i>
                    <span className="myPhone">{editedPhoneNumber}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="editProfileAboutSection">
          <h2>About</h2>
          <div className="editAboutButtonWrapper">
            {isEditingAbout ? (
              <button className="saveAboutButton" onClick={handleSaveAboutClick}>
                Save
              </button>
            ) : (
              <button className="editAboutButton" onClick={handleEditAboutClick}>
                <i className="fa-solid fa-pencil"></i>
              </button>
            )}
          </div>
          {isEditingAbout ? (
            <div>
              <textarea
                value={editedAboutData}
                onChange={(e) => setEditedAboutData(e.target.value)}
                className="myAboutTextArea"
              ></textarea>
            </div>
          ) : (
            <p className="aboutData">{editedAboutData}</p>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const userEmail = state.auth.users.userEmail;
  const user = state.auth.users[userEmail]?.user || {};
  const imageURL = state.auth.users[userEmail]?.user.imageURL || "";
  const profileImageURL =
    state.auth.users[userEmail]?.user.profileImageURL || "";
  console.log(state);
  return {
    user,
    userEmail,
    imageURL,
    profileImageURL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBackgroundImage: (userEmail, imageURL) =>
      dispatch(updateBackgroundImage(userEmail, imageURL)),
    updateProfileImage: (userEmail, profileImageURL) =>
      dispatch(updateProfileImage(userEmail, profileImageURL)),
    updateUserInformation: (userEmail, updatedUserInformation) =>
      dispatch(updateUserInformation(userEmail, updatedUserInformation)),
    updateAboutData: (userEmail, aboutData) =>
      dispatch(updateAboutData(userEmail, aboutData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
