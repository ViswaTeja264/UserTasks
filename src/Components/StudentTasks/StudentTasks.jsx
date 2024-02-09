import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import User from "./User/User.jsx";
import MyTasks from "./MyTasks/MyTasks.jsx";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StudentTasks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  console.log(isLoggedIn);

  return (
    <>
      <Navbar />
      <User />
      <MyTasks />
    </>
  );
};

export default StudentTasks;