import * as actionTypes from '../actions/actionTypes'

export const posts = (posts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return action.payload;
        case actionTypes.CREATE:
            return [...posts, action.payload];
        case actionTypes.EDIT:
            return [...posts.filter(post => post._id !== action.payload._id), action.payload];
        case actionTypes.DELETE:
            return posts.filter(post => post._id !== action.payload._id);
        case actionTypes.DELETE_MANY:
            return posts.filter(post => post.creator !== action.payload.creator);
        default:
            return posts;
    }
};

export const pages = (pages = 0, action) => {
    switch (action.type) {
        case actionTypes.COUNT_PAGE:
            return action.payload;
        default:
            return pages;
    }
}

export const popularPosts = (popularPosts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_POPULAR:
            return action.payload;
        case actionTypes.DELETE:
            return popularPosts.filter(post => post._id !== action.payload._id);
        default:
            return popularPosts;
    }
};

export const trendingPosts = (trendingPosts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_TRENDING:
            return action.payload;
        case actionTypes.DELETE:
            return trendingPosts.filter(post => post._id !== action.payload._id);
        case actionTypes.SAVE_TRENDING:
            return trendingPosts.map(post => (post._id === action.payload._id ? { ...post, saved: true } : post));
        case actionTypes.UNSAVE_TRENDING:
            return trendingPosts.map(post => (post._id === action.payload._id ? { ...post, saved: false } : post));
        case actionTypes.LOGOUT:
            return trendingPosts.map(post => ({ ...post, saved: false }));
        default:
            return trendingPosts;
    }
};