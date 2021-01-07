import * as api from '../api';
import * as actionTypes from './actionTypes';

export const getPosts = (page, query = {}) => async (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START });
    try {
        const { data } = await api.fetchPosts(page, query);
        
        dispatch({ type: actionTypes.FETCH_ALL, payload: data.posts });
        dispatch({ type: actionTypes.COUNT_PAGE, payload: data.pages });
        
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: actionTypes.LOADING_END });
}

export const createPost = (post) => async (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START });
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: actionTypes.CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: actionTypes.LOADING_END });
}

export const getPopularPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPopularPosts();

        dispatch({ type: actionTypes.FETCH_POPULAR, payload: data });
    } catch (error) {
        console.log(error);
    }
}

