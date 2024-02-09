import bcrypt from 'bcrypt';
import { User } from "../Models/User.js";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, countryCode, phoneNumber, password } = req.body;

    const tasks = [];
    const bgImage = "";
    const profileImage = "";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password,
      tasks,
      bgImage,
      profileImage
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user:newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default registerUser;
