import axios from 'axios';

const url = "http://localhost:5000";

export const fetchPosts = (page, filter) => axios.post(`${url}/posts/page${page}`, filter);
export const createPost = (newPost) => axios.post(`${url}/posts/createPost`, newPost);
export const fetchPopularPosts = () => axios.get(`${url}/posts/popular`);
export const fetchTitles = () => axios.get(`${url}/posts/titles`);
