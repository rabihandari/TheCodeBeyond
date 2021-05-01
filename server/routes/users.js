import express from 'express';

import { register, login, activate, resendActivation, requestPasswordReset, resetPassword, registerOAuth } from '../controllers/users.js';
import settingsRouter from './settings.js';
import { activationLimiter } from '../middlewares/activationLimiter.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-oauth', registerOAuth);
router.get('/activation/:token', activate);
router.get('/resendactivation/:email', activationLimiter, resendActivation);
router.get('/requestPasswordReset/:email', activationLimiter, requestPasswordReset);
router.post('/resetPassword', resetPassword);
router.use('/settings', settingsRouter);

export default router;