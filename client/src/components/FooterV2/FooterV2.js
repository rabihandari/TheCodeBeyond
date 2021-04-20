import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core'; 
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import logo from '../../images/logo.png';


const FooterV2 = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    return(
        <Container className={classes.container}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item className={classes.logoContainer} onClick={goToHome}>
                    <Grid container alignItems="center">
                        <img src={logo} alt="logo" className={classes.logo}/>
                        <Typography className={classes.appName}>The Code Beyond</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="text" className={classes.item}>Terms</Button>
                    <Button variant="text" className={classes.item}>Help</Button>
                    <Button variant="text" className={classes.item}>Logout</Button>
                </Grid>
            </Grid>
        </Container>
    );
}


export default FooterV2