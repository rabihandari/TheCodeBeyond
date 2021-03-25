import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core'; 

import useStyles from './styles';
import logo from '../../images/logo.png';
import SearchBarV2 from './SearchBarV2/SearchBarV2';
import LinearIndeterminate from '../LinearIndeterminate/LinearIndeterminate';

const HeaderV2 = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const isLoading = useSelector((state) => state.loadingIndeterminate);

    const goToHome = () => {
        history.push("/");
    }

    const goToSignIn = () => {
        history.push("/login");
    }

    const goToRegister = () => {
        history.push('/register');
    }

    return(
        <div>
            <Container className={classes.container}>
                <Grid container direction="row" alignItems="center">
                    <Grid item md={6} className={classes.leftContainer} onClick={goToHome}>
                        <img src={logo} alt="logo" className={classes.logo}/>
                        <Typography variant="h5" className={classes.title}>The Code Beyond</Typography>
                    </Grid>
                    <Grid item md={6} className={classes.rightContainer}>
                        <Button variant="contained" color="primary" size="small" className={classes.signupButton} onClick={goToRegister}>Sign Up</Button>
                        <Button variant="text" color="primary" size="small" className={classes.loginButton} onClick={goToSignIn}>Login</Button>
                        <SearchBarV2 {...props}/>
                    </Grid>
                </Grid>
            </Container>
            {isLoading && <LinearIndeterminate />}
        </div>
    );
}

export default HeaderV2;