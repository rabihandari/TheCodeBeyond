import * as actionTypes from '../actions/actionTypes'

export const posts = (posts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return action.payload;
        case actionTypes.CREATE:
            return [...posts, action.payload];
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
        default:
            return popularPosts;
    }
};