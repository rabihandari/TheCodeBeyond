import * as actionTypes from './actionTypes';
import * as api from '../api';

export const oAuthLogin = (authData) => async (dispatch) => {
  dispatch({ type: actionTypes.AUTH, payload: authData });
}

export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
}

export const signin = (formData, setErrors, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: actionTypes.AUTH, payload: data });

    router.push('/');
  } catch (error) {
    setErrors({ email: '', password: '', ...error.response.data });
  }
};


  
