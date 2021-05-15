import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import NotFoundImage from '../../images/404.png'

const NotFound = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    return(
        <Container className={classes.container}>
            <Grid container justify="space-around" alignItems="center" spacing={5}>
                <Grid item sm={6} lg={4}>
                    <img src={NotFoundImage} alt="404" height="350" className={classes.image}/>
                </Grid>
                <Grid item sm={6} lg={4}>
                    <Typography variant="h3" className={classes.title}>Oops,</Typography>
                    <Typography variant="h3" className={classes.title}><span style={{ color: 'blue' }}>nothing</span> here...</Typography>
                    <Typography variant="body2" className={classes.desc}>Oh oh, we coult not find the page you are looking for. Try going back to the previous page or contact us for more information</Typography>
                    <Button variant="contained" color="primary" className={classes.goHome} onClick={goToHome}>Go Home</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFound;