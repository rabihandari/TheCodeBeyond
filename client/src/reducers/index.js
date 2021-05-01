import { combineReducers } from 'redux';

import { posts, popularPosts, pages } from './posts';
import { loadingIndeterminate } from './loadingIndeterminate';
import { alert } from './alert';
import { auth } from './auth';
import { settings } from './user';

export default combineReducers({
    posts,
    pages,
    loadingIndeterminate,
    alert,
    popularPosts,
    auth,
    settings,
});