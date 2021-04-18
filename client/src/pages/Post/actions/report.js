import { reportPost as repPost, reportAuthor as repAuthor } from '../../../api';
import * as actionTypes from '../../../actions/actionTypes';

export const reportPost = (postId, setAlert, dispatch) => (reportData) => {
    dispatch({ type: actionTypes.LOADING_START });
    repPost({ ...reportData, postId: postId }).then((res) => {
        setAlert({ open: true, message: res.data.message, severity: 'success' });
        dispatch({ type: actionTypes.LOADING_END });
    }).catch(error => {
        setAlert({ open: true, message: error.response.data.message, severity: 'error' });
        dispatch({ type: actionTypes.LOADING_END });
    });
}

export const reportAuthor = (creator, setAlert, dispatch) => (reportData) => {
    dispatch({ type: actionTypes.LOADING_START });
    repAuthor({ ...reportData, creator: creator }).then((res) => {
        setAlert({ open: true, message: res.data.message, severity: 'success' });
        dispatch({ type: actionTypes.LOADING_END });
    }).catch(error => {
        setAlert({ open: true, message: error.response.data.message, severity: 'error' });
        dispatch({ type: actionTypes.LOADING_END });
    });
}

export const closeReport = (setReportOpen) => () => {
    setReportOpen(false);
}

export const handleClose = (setAlert) => (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
};