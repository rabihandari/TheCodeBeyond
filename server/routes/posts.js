import express from 'express';

import { getPosts, createPost, getPopularPosts, getTitles, getPost } from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/page:page', getPosts);
router.post('/createPost', auth, createPost);
router.get('/popular', getPopularPosts);
router.get('/titles', getTitles);
router.get('/:id', getPost);

export default router;