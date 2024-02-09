import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
import { useState } from "react";
// import bgImage from '../../assets/ProfileBGImage.png';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password === user.password) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const userData = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        countryCode: user.countryCode,
        phoneNumber: user.phoneNumber,
        password: user.password,
        token: token,
      };

      return res.status(200).json({ user: userData });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login };
