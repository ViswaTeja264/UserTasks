import express from 'express';
const router = express.Router();
import registerUser from '../Controllers/UserController.js';

router.post('/register', registerUser);

export default router;
