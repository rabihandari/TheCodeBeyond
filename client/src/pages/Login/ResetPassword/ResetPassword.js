import React, { useState } from 'react';
import { Typography, Container, Grid, Button, TextField } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory, useParams } from 'react-router-dom';

import useStyles from './styles';
import PasswordStrength from '../../../components/PasswordStrength/PasswordStrength';
import { resetPassword as reset } from '../../../api';
import PasswordResetValidation from './validator';

const ResetPassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [form, setForm] = useState({ password1: '', password2: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));


    const resetPassword = () => {
        setMessage("");
        setLoading(true);

        let { validationErrors, isValid } = PasswordResetValidation(form); 
        if (!isValid){
            setMessage(validationErrors.join(" \n "));
            setLoading(false);
            return;
        }

        reset({ ...form, token: params.token }).then(res => {
            setLoading(false);

            history.push('/login/reset-password/success');
        }).catch(error => {
            setLoading(false);

            setMessage(error.response.data.message);
        });
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const cancel = () => {
        history.push('/login');
    }

    return(
        <Container className={classes.container}>
            <Grid container justify="space-around">
                <Grid item sm={6}>
                    <Grid container justify="center" >
                        <Grid item xs={12} className={classes.message1}>
                            <Typography variant="h5">Set New Password</Typography>
                            <Typography style={{ marginTop: '5px' }} variant="caption">for {params.email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.errorText} variant="caption">{message}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} error={false} variant="outlined" name="password1" label="New Password" size="medium" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.input} error={false} variant="outlined" name="password2" label="Confirm New Password" size="medium" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.cbutton} onClick={cancel} variant="outlined" color="secondary">Cancel</Button>
                            <Button className={classes.cbutton} onClick={resetPassword} variant="contained" color="primary">{isLoading ? "Reseting password..." : "Reset Password"}</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {matches &&
                    <>
                        <Grid item sm={2} >
                            <PasswordStrength password1={form.password1} password2={form.password2} />
                        </Grid>
                        <Grid item sm={1} >
                        </Grid>
                    </>
                }
            </Grid>
        </Container>
    );
}

export default ResetPassword;