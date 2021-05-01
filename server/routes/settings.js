import express from 'express';

import { userSettings, changeName, changeBio, changeProfilePicture, changeEmail, changePassword, getBlockedUsers, unblockUser, deleteAccount, deactivateAccount, reactivateAccount } from '../controllers/settings.js';
import auth from '../middlewares/auth.js';
import getUser from '../middlewares/getUser.js';
import { activationLimiter } from '../middlewares/activationLimiter.js';
import { profileStorage } from '../config/storage.js';

const router = express.Router();

router.get('/', getUser, userSettings);
router.post('/changeName', auth, changeName);
router.post('/changeBio', auth, changeBio);
router.post('/changeProfilePicture', auth, profileStorage.single('imageFile'), changeProfilePicture);
router.post('/changeEmail', auth, activationLimiter, changeEmail);
router.post('/changePassword', auth, changePassword);
router.post('/blocked', auth, getBlockedUsers);
router.post('/unblock', auth, unblockUser);
router.post('/deactivateAccount', auth, deactivateAccount);
router.post('/reactivateAccount', auth, reactivateAccount);
router.post('/deleteAccount', auth, deleteAccount);

export default router;