import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core'; 
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import logo from '../../images/logo.png';
import { logout } from '../../actions/auth';


const FooterV2 = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const goToHome = () => {
        history.push('/');
    }

    const handleLoginout = () => {
        if(currentUser){
            dispatch(logout());
            history.push('/');
        }else{
            history.push('/login');
        }
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
                    <Button variant="text" className={classes.item}>Privacy</Button>
                    <Button variant="text" className={classes.item} onClick={handleLoginout}>{currentUser ? "Logout" : "Login"}</Button>
                </Grid>
            </Grid>
        </Container>
    );
}


export default FooterV2