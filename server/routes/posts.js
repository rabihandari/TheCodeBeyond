import express from 'express';

import { getPosts, createPost, getPopularPosts } from '../controllers/posts.js';

const router = express.Router();

router.post('/page:page', getPosts);
router.post('/createPost', createPost);
router.get('/popular', getPopularPosts);

export default router;