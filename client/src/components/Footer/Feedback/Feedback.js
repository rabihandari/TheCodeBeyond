import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Divider } from '@material-ui/core';

import useStyles from './styles';


const Feedback = () => {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.length === 0){
            setInvalid(true);
            return;
        }
        
        history.push(`/feedback/${email}`)
    } 

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    return(
        <Grid container direction="column" className={classes.container}>
            <Typography variant="h4" className={classes.title}>Send Feedback</Typography>
            <Divider className={classes.divider}/>
            <Grid item>
                <Typography variant="h6" className={classes.description}>Have an idea for new features or want to say something? Type in your email to send us a feedback</Typography>
                {invalid &&
                    <Typography variant="caption" className={classes.error}>Please enter your email</Typography>
                }
            </Grid>
            <Grid item>
                <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.emailHolder}>
                        <input type="email" name="email" value={email} onChange={handleChange} className={classes.emailInput} placeholder="Email"/>
                    </div>
                    <input type="submit" name="submit" value="SEND" className={classes.submit} />
                </form>
            </Grid>
        </Grid>
    );
}

export default Feedback;