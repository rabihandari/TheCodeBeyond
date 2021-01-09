import express from 'express';

import { getPosts, createPost, getPopularPosts, getTitles } from '../controllers/posts.js';

const router = express.Router();

router.post('/page:page', getPosts);
router.post('/createPost', createPost);
router.get('/popular', getPopularPosts);
router.get('/titles', getTitles);

export default router;