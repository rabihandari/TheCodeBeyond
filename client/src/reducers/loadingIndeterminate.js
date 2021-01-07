import * as actionTypes from '../actions/actionTypes'

export const loadingIndeterminate = (loading = false, action) => {
    switch (action.type) {
        case actionTypes.LOADING_START:
            return true;
        case actionTypes.LOADING_END:
            return false;
        default:
            return loading;
    }
};