import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

import useStyles from './styles';
import { logout as signout } from '../../actions/auth';
import DeactivatedImage from '../../images/deactivated.png';
import * as actionTypes from '../../actions/actionTypes';
import { reactivateAccount } from '../../api';

const Posts = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
        history.push('/');
    }
    
    const reactivate = () => {
        dispatch({ type: actionTypes.LOADING_START });
        reactivateAccount().then(() => {
            dispatch({ type: actionTypes.REACTIVATE });
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            dispatch({ type: actionTypes.LOADING_END });
        });
    };

    return(
        <Grid container alignItems="stretch" justify="center" className={classes.mainContainer}>
            <Grid container className={classes.mainContainer} direction="column" alignItems="center">
                <Grid item>
                    <img src={DeactivatedImage} alt="No Result" height="300px"/>
                </Grid>
                <Grid item>
                    <Typography variant="h5" className={classes.noResultTitle}>Account Disabled/Deactivated</Typography>
                    <Typography variant="body2" className={classes.noResultDescription}>Your account is deactivated! You can reactivate it by clicking the reactivate button bellow</Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={logout} className={classes.reactivate}>Logout</Button>
                    <Button variant="contained" color="primary" onClick={reactivate} className={classes.reactivate}>Reactivate</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Posts;