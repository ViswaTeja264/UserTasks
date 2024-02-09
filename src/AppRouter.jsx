import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Login from './Components/Login/Login';
import Register from "./Components/Register/Register";
import EmailRegister from "./Components/EmailRegister/EmailRegister";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import OTPVerify from "./Components/OTPVerify/OTPVerify";
import NewPassword from "./Components/NewPassword/NewPassword";
import StudentTasks from "./Components/StudentTasks/StudentTasks";
import AddTask from "./Components/StudentTasks/MyTasks/AddTask";
import EditProfile from "./Components/StudentTasks/EditProfile/EditProfile";

const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email-register" element={<EmailRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/new-password" element={<NewPassword />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={<StudentTasks />} />}
        />
        <Route
          path="/add-task"
          element={<PrivateRoute element={<AddTask />} />}
        />
        <Route
          path="/edit-profile"
          element={<PrivateRoute element={<EditProfile />} />}
        />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
