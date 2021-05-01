import React, { useState } from 'react';
import { Typography, Grid, Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'; 

import useStyles from './styles';
import Confirm from '../../../Confirm/Confirm';
import * as actionTypes from '../../../../actions/actionTypes';
import { logout } from '../../../../actions/auth';
import { deactivateAccount as deactivateAcc, reactivateAccount as reactivateAcc, deleteAccount as deleteAcc} from '../../../../api';

const Security = ({ user, setAlert }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { security } = useSelector(state => state.settings);
    const [deactivateConfirmation, setDeactivateConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleDeactivateButton = () => {
        setDeactivateConfirmation(true);
    }

    const closeDeactivateConfirmation = () => {
        setDeactivateConfirmation(false);
    }

    const deactivateAccount = () => {
        dispatch({ type: actionTypes.LOADING_START });
        deactivateAcc().then(() => {
            dispatch({ type: actionTypes.DEACTIVATE });
            setAlert({ open: true, message: 'You\'re account has been successfully deactivated', severity: 'success' })
            history.push('/');
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            setAlert({ open: true, message: error.response.data.message , severity: 'error' })
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const reactivateAccount = () => {
        dispatch({ type: actionTypes.LOADING_START });
        reactivateAcc().then(() => {
            dispatch({ type: actionTypes.REACTIVATE });
            setAlert({ open: true, message: 'You\'re account has been successfully reactivated', severity: 'success' })
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            setAlert({ open: true, message: error.response.data.message , severity: 'error' })
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const handleDeleteButton = () => {
        setDeleteConfirmation(true);
    }

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation(false);
    }

    const deleteAccount = () => {
        dispatch({ type: actionTypes.LOADING_START });
        deleteAcc().then(() => {
            dispatch({ type: actionTypes.DELETE_MANY, payload: { creator: (user._id || user.googleId + 'abc') }});
            dispatch(logout());
            dispatch({ type: actionTypes.LOADING_END });
            history.push('/');
        }).catch(error => {
            console.log(error);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }


    return(
        <div>
            <Typography className={classes.sectionTitle}>Security</Typography>
            <ul className={classes.sectionBody}>
                {/* --------------------- Email Address ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={8}>
                            <Typography className={classes.itemTitle}>Deactivate Account</Typography>
                            <Typography variant="caption" className={classes.itemDescription}>Deactivating your account will remove it from The Code Beyond within a few minutes. You can sign back in anytime to reactivate your account and restore its content</Typography>
                        </Grid>
                        <Grid item md={4} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={security?.deactivated ? reactivateAccount : handleDeactivateButton}>{security?.deactivated ? "Reactivate Account" : "Deactivate Account"}</Button>
                        </Grid>
                    </Grid>
                    {deactivateConfirmation &&
                        <Confirm 
                            action="Deactivate" 
                            title="Deactivate your account"
                            description="Are you sure you want to deactivate your account"
                            close={closeDeactivateConfirmation}
                            callback={deactivateAccount}
                        />
                    }
                </li>
                {/* --------------------- Password ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={9}>
                            <Typography className={classes.itemTitle}>Delete Account</Typography>
                            <Typography variant="caption" className={classes.itemDescription}>Permanently delete your account and all of your content.</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleDeleteButton}>Delete Account</Button>
                        </Grid>
                    </Grid>
                    {deleteConfirmation &&
                        <Confirm 
                            action="Delete" 
                            title="Delete your account"
                            description="Are you sure you want to delete your account"
                            close={closeDeleteConfirmation}
                            callback={deleteAccount}
                        />
                    }
                </li>
            </ul>
        </div>
    );
}

export default Security;