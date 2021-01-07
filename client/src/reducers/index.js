import { combineReducers } from 'redux';

import { posts, popularPosts, pages } from './posts';
import { loadingIndeterminate } from './loadingIndeterminate';

export default combineReducers({
    posts,
    pages,
    loadingIndeterminate,
    popularPosts,
});