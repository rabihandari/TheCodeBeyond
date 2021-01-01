import * as api from '../api';
import * as actionTypes from './actionTypes';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: actionTypes.FETCH_ALL, payload: data });
        
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: actionTypes.CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}