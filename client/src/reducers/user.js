import * as actionTypes from '../actions/actionTypes'

export const settings = (state = { account: null, security: null }, action) => {
    switch (action.type) {
        case actionTypes.SETTINGS:
            return action.payload;
        case actionTypes.CHANGE_EMAIL:
            return { ...state, account: { ...state.account, confirmed: false  }};
        case actionTypes.BLOCK:
            return { ...state, account: { ...state.account, blockedUsers: [...state.account.blockedUsers, action.payload.id] }};
        case actionTypes.UNBLOCK:
            return { ...state, account: { ...state.account, blockedUsers: state.account.blockedUsers.filter(id => id !== action.payload.id) }};
        case actionTypes.DEACTIVATE:
            return { ...state, security: { ...state.security, deactivated: true }};
        case actionTypes.REACTIVATE:
            return { ...state, security: { ...state.security, deactivated: false }};
        default:
            return state;
    }
}