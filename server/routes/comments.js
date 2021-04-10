import express from 'express';

import { addComment, addReply, deleteReply, deleteComment, editComment, editReply, reportComment, reportReply } from '../controllers/comments.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/addComment', auth, addComment);
router.post('/addReply', auth, addReply);
router.post('/deleteComment', auth, deleteComment);
router.post('/deleteReply', auth, deleteReply);
router.post('/editComment', auth, editComment);
router.post('/editReply', auth, editReply);
router.post('/reportComment', auth, reportComment);
router.post('/reportReply', auth, reportReply);

export default router;