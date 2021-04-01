import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button, FormControlLabel, Checkbox, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from "./styles";
import { signUp } from '../../api';
import RegisterValidation from './validator';
import logo from "../../images/logo.png";

const initialForm = { firstName: '', lastName: '', email: '', password: '', password2: '' };
const initialErrors = { firstName: '', lastName: '', email: '', password: '', message: '' };

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const [form, setForm] = useState(initialForm);
    const [termsChecked, setTermsChecked] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const [loading, setLoading] = useState(false);


    const goToSignIn = () => {
        history.push('/login');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(initialErrors);

        // Validate Form
        let { validationErrors, isValid } = RegisterValidation(form); 
        if(!isValid) {
            setErrors({ 
                firstName: validationErrors.firstName ? validationErrors.firstName : '',
                lastName: validationErrors.lastName ? validationErrors.lastName : '',
                email: validationErrors.email ? validationErrors.email : '',
                password: validationErrors.password ? validationErrors.password : '' ,
                message: ''
            });
            setLoading(false);
            return;
        }
        
        // Check Terms & Conditions
        if (!termsChecked){
            let message = 'You must agree to terms of service and privacy policy';
            setErrors({ firstName: '', lastName: '', email: '', password: '', message });
            setLoading(false);
            return;
        }

        // Create Account...
        signUp(form).then(res => {
            const { email } = res.data.result;

            history.push(`/register/success/${email}`);
        }).catch(error => {
            setErrors({ firstName: '', lastName: '', email: '', password: '', ...error.response.data });
            setLoading(false);
        });

    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    return(
        <Container className={classes.container}>
            <form onSubmit={handleSubmit}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} className={classes.title}>
                        <img src={logo} alt="" className={classes.logo}/>
                        <Typography variant='h4' className={classes.signin}>Create Account</Typography>
                        <Typography style={{ marginTop: '10px' }} variant='body2'>Welcome to The Code Beyond</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.values(errors).map((error) => 
                            (error.length !== 0 && <Typography  key={error} className={classes.error}>{ `* ${error}` }</Typography>)
                        )}
                    </Grid>
                    <Grid item xs={6} className={classes.inputField}>
                        <TextField error={errors.firstName.length !== 0} fullWidth variant="outlined" name="firstName" label="First Name" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6} className={classes.inputField}>
                        <TextField error={errors.lastName.length !== 0} fullWidth variant="outlined" name="lastName" label="Last Name" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <TextField error={errors.email.length !== 0} fullWidth variant="outlined" name="email" label="Email Address" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <TextField error={errors.password.length !== 0} fullWidth variant="outlined" name="password" label="Password" type="password" onChange={handleChange}  />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <TextField error={errors.password.length !== 0} fullWidth variant="outlined" name="password2" label="Confirm Password" type="password" onChange={handleChange}  />
                    </Grid>
                    <Grid item xs={12} className={classes.inputField}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} name="Terms" color="primary" size="small" />
                            }
                            label={
                                <Typography variant='h4' className={classes.termsBox}>I agree to the <Link href="#" color="primary">Terms of service</Link> and <Link href="#" color="primary">privacy policy</Link></Typography>
                            }
                        />
                    </Grid>
                    
                    <Grid item xs={12} className={classes.inputField}>
                        <Button fullWidth type="submit" variant="contained" color="primary" size="large" className={classes.loginButton}>{loading ? "Creating account..." : "Create account"}</Button>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '60px' }}>
                        <Typography style={{ marginTop: '10px' }} variant='body2'>Already have an account? 
                            <Button color="primary" style={{ textTransform: 'none'}} onClick={goToSignIn}>Sign In</Button>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;