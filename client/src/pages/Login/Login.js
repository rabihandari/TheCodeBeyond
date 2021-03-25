import React from 'react';
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import useStyles from "./styles";
import logo from "../../images/logo.png";

const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToRegister = () => {
        history.push('/register');
    }

    const googleSuccess = async (res) => {
        console.log(res);
        history.push('/');
      };
    
      const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return(
        <Container className={classes.container}>
            <Grid container justify="center" >
                <Grid item xs={12} className={classes.title}>
                    <img src={logo} alt="" className={classes.logo}/>
                    <Typography variant='h4' className={classes.signin}>Sign In</Typography>
                    <Typography style={{ marginTop: '10px' }} variant='body2'>Welcome to TheCodeBeyond</Typography>
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                    <TextField fullWidth variant="outlined" label="Email Address" />
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                    <TextField fullWidth variant="outlined" label="Password" />
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                    <Button fullWidth variant="contained" color="primary" size="large" className={classes.loginButton}>Log In</Button>
                </Grid>
                <Grid item xs={12} className={classes.createAccount}>
                    <Typography style={{ marginTop: '10px' }} variant='body2'>Not on The Code Beyond yet? 
                        <Button color="primary" style={{ textTransform: 'none'}} onClick={goToRegister}>Create Account</Button>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.divider}>
                    <Typography style={{ marginTop: '10px' }} variant='body2'>OR</Typography>
                </Grid>
                <Grid item xs={12} className={classes.inputField}>
                    <GoogleLogin
                        clientId="153805823286-v0cb4tu1k7jupejj1o5vbspriscn6uvm.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <GoogleButton type="light" className={classes.googleLogin} onClick={renderProps.onClick} />
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;