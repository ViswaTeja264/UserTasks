import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./MongoDB/DB.js";
import userRoutes from "./Routes/UserRoutes.js";
import OTPRoutes from "./Routes/OTPRoutes.js";
import LoginRoutes from './Routes/LoginRoutes.js';
import uploadRoutes from './Routes/UploadRoutes.js';
import PasswordRoutes from './Routes/PasswordRoutes.js';
import SendRemainderRoutes from './Routes/SendRemainderRoutes.js';


dotenv.config();

const secretKey = process.env.JWT_SECRET;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

connectDB();

// app.use("/", userRoutes);
app.use("/api", userRoutes);
app.use("/api", OTPRoutes);
app.use("/api", LoginRoutes);
app.use('/api', uploadRoutes);
app.use("/api", PasswordRoutes);
app.use("/api", SendRemainderRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});