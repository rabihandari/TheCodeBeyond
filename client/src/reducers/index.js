import { combineReducers } from 'redux';

import { posts, popularPosts, pages } from './posts';
import { loadingIndeterminate } from './loadingIndeterminate';
import { auth } from './auth';

export default combineReducers({
    posts,
    pages,
    loadingIndeterminate,
    popularPosts,
    auth,
});