import * as actionTypes from './actionTypes';
import * as api from '../api';

export const getSettings = () => async (dispatch) => {
    try {
      const resposnse = await api.getUserSettings();

      if (Object.keys(resposnse?.data.account).includes('confirmed')){
        if(!resposnse?.data.account.confirmed){
          dispatch({ type: actionTypes.SHOW_ALERT, payload: { message: 'Your account is not activated yet!', severity: 'warning' } })
        }
      } 
      
      dispatch({ type: actionTypes.SETTINGS, payload: resposnse?.data });
    } catch (error) {
        console.log(error.message);
    }
  };