import express from 'express';
import SendReminder from '../Controllers/SendRemainderController.js';

const router = express.Router();

router.post('/send-reminder', SendReminder);

export default router;
