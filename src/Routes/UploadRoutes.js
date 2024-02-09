import express from 'express';
import multer from 'multer';
import { updateBackgroundImage } from '../Controllers/UploadController.js';

const router = express.Router();
const upload = multer(); // Use multer middleware for handling FormData

router.post('/update-background-image', upload.single('file'), updateBackgroundImage);

export default router;
