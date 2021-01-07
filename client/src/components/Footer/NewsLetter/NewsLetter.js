import React, { useState } from 'react';
import useStyles from './styles';
import { Grid, Typography, Divider } from '@material-ui/core';

const NewsLetter = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Subscribed");
    } 

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    return(
        <Grid container direction="column" className={classes.container}>
            <Typography variant="h4" className={classes.title}>Our NewsLetter</Typography>
            <Divider className={classes.divider}/>
            <Grid item style={{ padding: '14px 0px' }}>
                <Typography variant="h4" className={classes.description}>Sit vel delectus amet officiis repudiandae est voluptatem. Tempora maxime provident nisi et fuga et enim exercitationem ipsam. Culpa consequatur occaecati.</Typography>
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

export default NewsLetter;