import express from 'express';

import { getPosts, createPost, getPopularPosts, getTrendingPosts, getTitles, getPost, getPublishedPosts, getPublishedResponses, likePost, savePost, getSavedPosts, reportPost, reportAuthor, blockAuthor, deletePost, editPost } from '../controllers/posts.js';
import commentRoutes from './comments.js';
import auth from '../middlewares/auth.js';
import getUser from '../middlewares/getUser.js';
import confirmed from '../middlewares/confirmed.js';
import { postStorage } from '../config/storage.js';

const router = express.Router();

router.use('/comments', commentRoutes);
router.post('/page:page', getUser, getPosts);
router.post('/createPost', auth, confirmed, postStorage.single('imageFile'), createPost);
router.post('/editPost', auth, postStorage.single('imageFile'), editPost);
router.get('/popular', getPopularPosts);
router.get('/trending', getUser, getTrendingPosts);
router.get('/titles', getTitles);
router.get('/publishedPosts', auth, getPublishedPosts);
router.get('/publishedResponses', auth, getPublishedResponses);
router.post('/likePost', auth, likePost);
router.post('/savePost', auth, savePost);
router.get('/savedPosts/:page', auth, getSavedPosts);
router.post('/reportPost', auth, reportPost);
router.post('/reportAuthor', auth, reportAuthor);
router.post('/blockAuthor', auth, blockAuthor);
router.get('/:id', getUser, getPost);
router.delete('/:id', auth, deletePost);


export default router;