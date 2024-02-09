import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./User.css";
import Mine from "../../../assets/Viswa.jpg";
import NoProfile from "../../../assets/NoProfile.jpg";
import { updateProfileImage } from "../../../Actions/TaskActions";

const User = ({ user, tasks, profileImageURL, updateProfileImage }) => {

  useEffect(() => {
    // Use the default image if profileImageURL is not available
    const imageURL = profileImageURL || NoProfile;

    // Update the profile image URL in the Redux store
    updateProfileImage(imageURL, user.user.email);
  }, [profileImageURL, user.user.email]);

  const numTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  return (
    <div className="demo">
      <div className="userSection">
        <div className="personData">
          <div className="personImageSection">
            <img src={profileImageURL || NoProfile} alt="User" className="personImage" />
          </div>
          <div className="personContentSection">
            <h3 className="personName">{user && user.user.firstName + " " + user.user.lastName}</h3>
            <div className="emailSection">
              <i className="fa-solid fa-envelope"></i>
              <span className="personEmail">{user && user.user.email}</span>
            </div>
          </div>
        </div>
        <div className="taskData">
          <div className="noOfTasks">
            <h2 className="numTasksAvailable">{numTasks}</h2>
            <span className="tasks">Tasks</span>
          </div>
          <div className="completedTasks">
            <h2 className="numTasksCompleted">{completedTasks}</h2>
            <span className="completed">Completed</span>
          </div>
          <div className="pendingTasks">
            <h2 className="numTasksPending">{pendingTasks}</h2>
            <span className="pending">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const userEmail = state.auth.users.userEmail;
  const user = state.auth.users[userEmail]?.user || {};
  const tasks = state.auth.users[userEmail]?.tasks || {};
  const profileImageURL =
    state.auth.users[userEmail]?.user.profileImageURL || "";

  return {
    user,
    tasks,
    profileImageURL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileImage: (userEmail, imageURL) =>
      dispatch(updateProfileImage(userEmail, imageURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
