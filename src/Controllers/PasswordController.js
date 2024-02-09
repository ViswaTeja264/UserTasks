import { User } from "../Models/User.js";

const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  // const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    // Find the user by email and update the password
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { updatePassword };
