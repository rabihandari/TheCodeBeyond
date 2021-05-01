import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';

import useStyles from './styles';

const ThanksPage = ({ message, closeThanksPage }) => {
    const classes = useStyles();

    return(
        <Grid container className={classes.mainContainer}>
            <Container className={classes.container}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography className={classes.title} variant='h6'>Thank You!</Typography>
                    </Grid>
                    <Grid item style={{ marginTop: '20px' }}>
                        <Typography className={classes.body} variant='body2'>{message}</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center"style={{ marginTop: '15px' }} spacing={2}>
                        <Grid item>
                            <Button variant="outlined" className={classes.submitButton} onClick={closeThanksPage} color="primary">Okay</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

export default ThanksPage;