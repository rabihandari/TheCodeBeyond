import { blockAuthor as blockAuth } from '../../../api';
import * as actionTypes from '../../../actions/actionTypes';

export const blockAuthor = (creator, setAlert, dispatch) => () => {
    dispatch({ type: actionTypes.LOADING_START });
    blockAuth({ creator: creator }).then((res) => {
        setAlert({ open: true, message: res.data.message, severity: 'success' });
        dispatch({ type: actionTypes.LOADING_END });
    }).catch(error => {
        setAlert({ open: true, message: error.response.data.message, severity: 'error' });
        dispatch({ type: actionTypes.LOADING_END });
    });
}

export const closeConfirmation = (setConfirmationOpen) => () => {
    setConfirmationOpen(false);
}

export const handleClose = (setAlert) => (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
};