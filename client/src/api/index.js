import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_HOST_URL || "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchPosts = (page, filter) => API.post(`/posts/page${page}`, filter);
export const createPost = (newPost) => API.post(`/posts/createPost`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPopularPosts = () => API.get(`/posts/popular`);
export const fetchTitles = () => API.get(`/posts/titles`);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const savePost = (postData) => API.post('/posts/savePost', postData);
export const fetchSavedPosts = (page) => API.get(`/posts/savedPosts/${page}`);
export const reportPost = (postData) => API.post('/posts/reportPost', postData);
export const reportAuthor = (authorData) => API.post('/posts/reportAuthor', authorData);
export const blockAuthor = (authorData) => API.post('/posts/blockAuthor', authorData);

export const signIn = (formData) =>  API.post(`/users/login`, formData);
export const signUp = (formData) =>  API.post(`/users/register`, formData);
export const signUpOAuth = (oAuthData) =>  API.post(`/users/register-oauth`, oAuthData);
export const resendActivation = (email) =>  API.get(`/users/resendActivation/${email}`);
export const requestPasswordReset = (email) =>  API.get(`/users/requestPasswordReset/${email}`);
export const resetPassword = (passwordData) =>  API.post(`/users/resetPassword`, passwordData);

export const getPublishedPosts = () => API.get('/posts/publishedPosts');
export const getPublishedResponses = () => API.get('/posts/publishedResponses');

export const likePost = (postId) => API.post('/posts/likePost', postId);
export const addComment = (commentData) => API.post('/posts/comments/addComment', commentData);
export const addReply = (replyData) => API.post('/posts/comments/addReply', replyData);
export const deleteComment = (commentData) => API.post('/posts/comments/deleteComment', commentData);
export const deleteReply = (replyData) => API.post('/posts/comments/deleteReply', replyData);
export const editComment = (commentData) => API.post('/posts/comments/editComment', commentData);
export const editReply = (replyData) => API.post('/posts/comments/editReply', replyData);
export const reportComment = (commentData) => API.post('/posts/comments/reportComment', commentData);
export const reportReply = (replyData) => API.post('/posts/comments/reportReply', replyData);