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
export const fetchPopularPosts = () => API.get(`/posts/popular`);
export const fetchTitles = () => API.get(`/posts/titles`);
export const fetchPost = (id) => API.get(`/posts/${id}`)

export const signIn = (formData) =>  API.post(`/users/login`, formData);
export const signUp = (formData) =>  API.post(`/users/register`, formData);
export const resendActivation = (email) =>  API.get(`/users/resendActivation/${email}`);
export const requestPasswordReset = (email) =>  API.get(`/users/requestPasswordReset/${email}`);
export const resetPassword = (passwordData) =>  API.post(`/users/resetPassword`, passwordData);

export const getPublishedPosts = () => API.get('/posts/publishedPosts');
