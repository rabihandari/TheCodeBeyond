import * as actionTypes from '../actions/actionTypes'

export const auth = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            if (action?.payload === null){
                return state;
            }

            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action.payload };
            
        case actionTypes.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null };
    
        default:
            return state;
    }
}