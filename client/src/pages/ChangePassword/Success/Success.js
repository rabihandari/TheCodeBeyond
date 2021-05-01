import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'; 

import useStyles from './styles';
import greenTick from '../../../images/green-tick.png';


const Success = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToLogin = () => {
        history.push('/settings');
    }

    return (
        <Container className={classes.container}>
            <Grid container justify="center" align="center">
                <Grid item xs={12}>
                    <img className={classes.tickIcon} src={greenTick} alt="Success" height="100" width="100"/>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.message1} variant="h5">Password Successfully Updated!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.message3} variant="body2">Your password has been changed successfully. Use your new password to login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.login} onClick={goToLogin} variant="contained" color="primary">Go Back</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Success;