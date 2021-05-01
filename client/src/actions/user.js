import * as actionTypes from './actionTypes';
import * as api from '../api';

export const getSettings = () => async (dispatch) => {
    try {
      const { data } = await api.getUserSettings();

      if (Object.keys(data.account).includes('confirmed')){
        if(!data.account.confirmed){
          dispatch({ type: actionTypes.SHOW_ALERT, payload: { message: 'Your account is not activated yet!', severity: 'warning' } })
        }
      } 
      
      dispatch({ type: actionTypes.SETTINGS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
  };