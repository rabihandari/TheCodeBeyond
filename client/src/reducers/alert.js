import * as actionTypes from '../actions/actionTypes'

export const alert = (state = { open: false, message: '', severity: 'success' }, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ALERT:
            return { open: true, message: action.payload.message, severity: action.payload.severity };
        case actionTypes.HIDE_ALERT:
            return { open: false, message: '', severity: state.severity };
        default:
            return state;
    }
};