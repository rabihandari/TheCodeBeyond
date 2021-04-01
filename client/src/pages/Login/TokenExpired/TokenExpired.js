import React, { useState } from 'react';
import { Typography, Container, Grid, Button, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import keys from '../../../images/keys.png';
import { emailError } from '../validator';
import { resendActivation } from '../../../api';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TokenExpired = () => {
    const classes = useStyles();
    const history = useHistory();
    const [successful, setSuccessful] = useState(true);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');

    const resend = () => {
        let error = emailError(email);
        setMessage('');
        
        if (error.length > 0){
            setMessage(emailError(email));
            return;
        }

        resendActivation(email).then(res => {
            setSuccessful(true);
            setOpen(true);
        }).catch(error => {
            setMessage(error.response.data.message);
            setSuccessful(false);
            setOpen(true);
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const cancel = () => {
        history.push('/login');
    }

    return(
        <Container className={classes.container}>
            <Grid container justify="center" align="center">
                <Grid item xs={12}>
                    <img className={classes.keysIcon} src={keys} alt="Token Expired" height="140" />
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.message1} variant="h5">Sorry, your token has expired!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.message3} variant="body2">We'll need reauthenticate your account. Please fill in with your email to receive another confirmation link </Typography>
                    <Typography className={classes.errorText} variant="caption">{message}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.input} error={false} variant="outlined" name="email" label="Email Address" size="medium" onChange={(e)=> setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.cbutton} onClick={cancel} variant="outlined" color="secondary">Cancel</Button>
                    <Button className={classes.cbutton} onClick={resend} variant="contained" color="primary">Resend Activation</Button>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={successful ? "success" : "error"}>
                    {successful ? 'Email Sent!' : 'Could\'nt send email'}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default TokenExpired;