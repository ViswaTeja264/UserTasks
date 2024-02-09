import { User } from "../Models/User.js";

const updateBackgroundImage = async (req, res) => {
  const { userEmail } = req.body; // userEmail is sent as part of the FormData
  const file = req.file; // Access the uploaded file using req.file

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log(file);

    user.bgImage = `http://localhost:3000/uploads/${file.originalname}`;

    await user.save();

    res.json({ success: true, bgImageURL: user.bgImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { updateBackgroundImage };
