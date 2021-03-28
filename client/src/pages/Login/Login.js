import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from "./styles";
import { oAuthLogin, signin } from '../../actions/auth';
import LoginValidation from './validator';
import logo from "../../images/logo.png";

const initialForm = { email: '', password: '' };
const initialErrors = { email: '', password: '', message: '' };

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [loading, setLoading] = useState(false);

    const goToRegister = () => {
        history.push('/register');
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch(oAuthLogin({result, token}));

            history.push('/');
        } catch (error) {
            
        }
      };
    
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(initialErrors);

        // Validate Form
        let { validationErrors, isValid } = LoginValidation(form); 
        if(!isValid) {
            setErrors({ 
                email: validationErrors.email ? validationErrors.email : '',
                 password: validationErrors.password ? validationErrors.password : '' ,
                 message: ''
            });
            setLoading(false);
            return;
        }

        // Sign In
        dispatch(signin(form, setErrors, history)).then((() => {
            setLoading(false);
        }));
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    return(
        <Container className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Grid container justify="center" >
                    <Grid item xs={12} className={classes.title}>
                        <img src={logo} alt="" className={classes.logo}/>
                        <Typography variant='h4' className={classes.signin}>Sign In</Typography>
                        <Typography style={{ marginTop: '10px' }} variant='body2'>Welcome to The Code Beyond</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.values(errors).map((error) => 
                            (error.length !== 0 && <Typography  key={error} className={classes.error}>{ `* ${error}` }</Typography>)
                        )}
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <TextField error={errors.email.length !== 0} fullWidth variant="outlined" name="email" label="Email Address" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <TextField error={errors.password.length !== 0} fullWidth variant="outlined" name="password" label="Password" type="password" onChange={handleChange}  />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <Button fullWidth type="submit" variant="contained" color="primary" size="large" className={classes.loginButton}>{loading ? "Logging In..." : "Log In"}</Button>
                    </Grid>
                    <Grid item xs={12} className={classes.createAccount}>
                        <Typography style={{ marginTop: '10px' }} variant='body2'>Not on The Code Beyond yet? 
                            <Button color="primary" style={{ textTransform: 'none'}} onClick={goToRegister}>Create Account</Button>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.divider}>
                        <Typography style={{ marginTop: '10px' }} variant='body2'>OR</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '40px' }} className={classes.inputField}>
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
            </form>
        </Container>
    );
}

export default Login;