import React, { useState } from 'react';
import useStyles from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Typography, Container, TextField, Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useDispatch } from 'react-redux';

import FeedbackMail from '../../images/feedback-mail.png';
import { sendFeedback } from '../../api';
import * as actionTypes from '../../actions/actionTypes';

const NewsLetter = () => {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [form, setForm] = useState({ fullName: '', email: params.email, subject: '', body: '' });
    const [errors, setErrors] = useState([]);
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors([]);
        let errs = [];

        // Validate Full Name
        if(form.fullName.length === 0){
            errs.push("* Please enter your full name");
        }

        // Validate Email
        if(form.email.length === 0){
            errs.push("* Please enter your email");
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.email)){
            errs.push("* Please enter a valid email");
        }

        // Validate Subject
        if(form.subject.length === 0){
            errs.push("* Please enter a subject");
        }

        // Validate Subject
        if(form.body.length === 0){
            errs.push("* Please enter a message");
        }

        if(errs.length > 0){
            setErrors(errs);
            return;
        };
        dispatch({ type: actionTypes.LOADING_START });

        sendFeedback(form).then(() => {
            history.push('/');
            dispatch({ type: actionTypes.SHOW_ALERT, payload: { open: true, message: 'Feedback Sent!', severity: 'success' }});
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            setErrors(error?.response?.data?.messages);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleCancel = (e) => {
        e.preventDefault();

        history.goBack();
    }

    return(
        <Container className={classes.container}>
            <Grid container alignItems="center" justify={!matches ? "center" : "space-between"}>
                {matches &&
                    <Grid item xs={12} sm={12} md={3} lg={6} className={classes.image}>
                        <img src={FeedbackMail} alt="Feedback" height={120} className={classes.image}/>
                    </Grid>
                }
                <Grid item xs={12} sm={12} md={9}  lg={6} className={classes.formContainer}>
                    <Typography variant='h5' className={classes.title}>Send Feedback</Typography>
                    {errors.map(error => (
                        <Typography key={error} variant='caption' className={classes.errors}>{error}</Typography>
                    ))}
                    <form onSubmit={handleSubmit}>
                        <TextField type="text" variant="outlined" label="Full Name" name="fullName" fullWidth className={classes.textField} onChange={handleChange} value={form.fullName} />
                        <TextField type="text" variant="outlined" label="Email" name="email" fullWidth className={classes.textField} onChange={handleChange} value={form.email} />
                        <TextField type="text" variant="outlined" label="Subject" name="subject" fullWidth className={classes.textField} onChange={handleChange} value={form.subject} />
                        <TextField type="text" variant="outlined" label="Message" name="body" fullWidth className={classes.textField} onChange={handleChange} value={form.body} multiline rows={6} />
                        <Grid container direction="row-reverse" spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" className={classes.formButton} endIcon={<ArrowRightAltIcon/>}>Send Email</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="secondary" className={classes.formButton} onClick={handleCancel} >Cancel</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewsLetter;