import express from 'express';
import { sendFeedback, addRequest, getRequests, getUserRequests, getRequest, addAnswer, getRequestPosts, getAllRequests } from '../controllers/others.js'; 
import auth from '../middlewares/auth.js';
import confirmed from '../middlewares/confirmed.js';
import { postStorage } from '../config/storage.js';

const router = express.Router();

router.post('/sendFeedback', sendFeedback);
router.post('/allRequests/:page', getAllRequests);
router.get('/getRequest/:id', getRequest);
router.get('/getRequests', getRequests);
router.get('/userRequests', auth, getUserRequests);
router.post('/requestPosts', auth, getRequestPosts);
router.post('/addRequest', auth, addRequest);
router.post('/addAnswer', auth, confirmed, postStorage.single('imageFile'), addAnswer);

export default router;