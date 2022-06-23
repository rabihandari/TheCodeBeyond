import * as actionTypes from './actionTypes';
import * as api from '../api';

export const getSettings = () => async (dispatch) => {
    try {
      const response = await api.getUserSettings();

      if (Object.keys(response?.data).includes("account")){
        console.log(response?.data.account.confirmed);
        if(!response?.data.account.confirmed){
          dispatch({ type: actionTypes.SHOW_ALERT, payload: { message: 'Your account is not activated yet!', severity: 'warning' } })
        }
      } 
      
      dispatch({ type: actionTypes.SETTINGS, payload: response?.data });
    } catch (error) {
        return Promise.reject(error);
    }
  };