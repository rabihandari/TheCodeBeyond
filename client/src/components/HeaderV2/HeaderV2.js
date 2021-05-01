import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Button, IconButton, Tooltip } from '@material-ui/core'; 

import useStyles from './styles';
import logo from '../../images/logo.png';
import SavedIcon from '../../images/icon-saved2.svg';
import SearchBarV2 from './SearchBarV2/SearchBarV2';
import LinearIndeterminate from '../LinearIndeterminate/LinearIndeterminate';
import Profile from './Profile/Profile';

const HeaderV2 = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const isLoading = useSelector((state) => state.loadingIndeterminate);
    const user = useSelector((state) => state.auth);

    const goToHome = () => {
        history.push("/");
    }

    const goToSignIn = () => {
        history.push("/login");
    }

    const goToRegister = () => {
        history.push('/register');
    }

    const goToAddPost = () => {
        history.push('/createPost');
    }

    const goToSavedPosts = () => {
        history.push('/saved');
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
                        {user.authData?.result ? 
                            <div className={classes.rightContainer}>
                                <Profile name={user.authData.result.name} email={user.authData.result.email} imageUrl={user.authData.result.profilePicture} />
                                <Button className={classes.addPostButton} variant="outlined" color="secondary" size="small" onClick={goToAddPost}>Add Post</Button>
                                <IconButton size="small" onClick={goToSavedPosts} className={classes.savedButton}>
                                    <Tooltip title="Saved">
                                        <img src={SavedIcon} alt="Save"/>
                                    </Tooltip>
                                </IconButton>
                            </div>
                            :
                            <div className={classes.rightContainer}>
                                <Button variant="contained" color="primary" size="small" className={classes.signupButton} onClick={goToRegister}>Sign Up</Button>
                                <Button variant="text" color="primary" size="small" className={classes.loginButton} onClick={goToSignIn}>Login</Button>
                            </div>
                        }
                        <SearchBarV2 {...props}/>
                    </Grid>
                </Grid>
            </Container>
            {isLoading && <LinearIndeterminate />}
        </div>
    );
}

export default HeaderV2;