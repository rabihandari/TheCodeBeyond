import * as actionTypes from '../actions/actionTypes'

export const posts = (posts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return action.payload;
        case actionTypes.CREATE:
            console.log("Created" + action.payload);
            return [...posts, action.payload];
        default:
            return posts;
    }
};