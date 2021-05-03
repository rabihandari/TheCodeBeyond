import React from 'react';
import useStyles from './styles';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Feedback from './Feedback/Feedback'; 
import CopyRight from './CopyRight/CopyRight';
import SocialMedia from '../Shared/SocialMedia/SocialMedia';
import Logo from '../../images/logo-white.png';

const Footer = () => {
    const classes = useStyles();
    const matches = useMediaQuery(useTheme().breakpoints.down('md'));

    return(
        <footer className={classes.container} style={{ zIndex: '0' }}>
            <div className={classes.footerOverlay} style={{ zIndex: '-1' }}></div>
            <Container style={{ zIndex: '1' }}>
                <Grid container direction="row">
                    <Grid item xs={12} md={6}>
                        <Grid container direction="column" alignItems={matches ? "center" : "flex-start"} className={classes.leftSide} spacing={4}>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: "center" }}>
                                <img src={Logo} alt="logo" height="60"/>
                                <Typography variant="h6" className={classes.appName}>The Code Beyond</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <SocialMedia />
                            </Grid>
                            {!matches &&
                                <Grid item xs={12}>
                                    <CopyRight />
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={5} style={{  width: "100%" }}>
                        <Feedback />
                    </Grid>
                    {matches &&
                        <Grid item xs={12}>
                            <CopyRight />
                        </Grid>
                    }
                </Grid>
                
            </Container>
        </footer>
    );
}

export default Footer