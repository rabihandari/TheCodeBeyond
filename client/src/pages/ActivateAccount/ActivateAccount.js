import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { changeEmail } from '../../api';
import * as actionTypes from '../../actions/actionTypes';

const ActivateAccount = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [message, setMessage] = useState({ visible: false, message: '', severity: 'success' });
    
    let user = JSON.parse(localStorage.getItem('profile'));

    const handleResendActivation = () => {
        dispatch({ type: actionTypes.LOADING_START });
        
        changeEmail({ email: user.result.email }).then((res) => {
            dispatch({ type: actionTypes.LOADING_END });
            setMessage({ visible: true, message: 'We\'ve sent you a verification email. Please check your inbox', severity: 'success' });
        }).catch((error) => {
            setMessage({ visible: true, message: error.response.data.message, severity: 'error'  });
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    return(
        <Grid container className={classes.mainContainer}>
            <Container className={classes.container}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography className={classes.title} variant='h6'>Publishing requires a verified email address</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.body} variant='body1'>Click below to send a new verification email to {user?.result?.email}</Typography>
                    </Grid>
                    {message.visible &&
                        <Grid item>
                            <Typography className={classes.message} variant='body2' style={ message.severity === 'success' ? { color: 'green' } : { color: 'red' }}>{message.message}</Typography>
                        </Grid>
                    }
                    <Grid container justify="center" spacing={1} style={{ marginTop: '15px' }}>
                        <Grid item>
                            <Button variant="outlined" className={classes.submitButton} onClick={handleResendActivation} color="primary">Resend verification email</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={classes.cancelButton} onClick={() => {history.push('/')}} color="secondary">Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

export default ActivateAccount;