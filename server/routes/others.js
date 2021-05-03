import express from 'express';
import { sendFeedback } from '../controllers/others.js'; 

const router = express.Router();

router.post('/sendFeedback', sendFeedback);

export default router;