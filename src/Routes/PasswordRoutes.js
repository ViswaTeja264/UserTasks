import express from "express";
import { updatePassword } from "../Controllers/PasswordController.js";

const router = express.Router();

router.post("/update-password", updatePassword);

export default router;
