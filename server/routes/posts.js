import express from 'express';

import { getPosts, createPost, getPopularPosts, getTitles, getPost, getPublishedPosts, getPublishedResponses, likePost } from '../controllers/posts.js';
import commentRoutes from './comments.js';
import auth from '../middlewares/auth.js';
import { postStorage } from '../config/storage.js';

const router = express.Router();

router.use('/comments', commentRoutes);
router.post('/page:page', getPosts);
router.post('/createPost', auth, postStorage.single('imageFile'), createPost);
router.get('/popular', getPopularPosts);
router.get('/titles', getTitles);
router.get('/publishedPosts', auth, getPublishedPosts);
router.get('/publishedResponses', auth, getPublishedResponses);
router.post('/likePost', auth, likePost);
router.get('/:id', getPost);


export default router;