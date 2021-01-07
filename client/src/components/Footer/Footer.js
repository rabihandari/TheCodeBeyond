import React from 'react';
import useStyles from './styles';
import { Container, Grid } from '@material-ui/core';

import QuickLinks from './QuickLinks/QuickLinks'; 
import Social from './Social/Social'; 
import Archives from './Archives/Archives'; 
import NewsLetter from './NewsLetter/NewsLetter'; 
import CopyRight from './CopyRight/CopyRight';

const Footer = () => {
    const classes = useStyles();

    return(
        <footer className={classes.container} style={{ zIndex: '0' }}>
            <div className={classes.footerOverlay} style={{ zIndex: '-1' }}></div>
            <Container style={{ zIndex: '1' }}>
                <Grid container direction="row">
                    <Grid item xs={12} md={6}>
                        <Grid container direction="row" alignItems="flex-start" justify="space-between">
                            <Grid item xs={12} md={6} lg={4}>
                                <QuickLinks />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Archives />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Social />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <NewsLetter />
                    </Grid>
                    <Grid item xs={12}>
                        <CopyRight />
                    </Grid>
                </Grid>
                
            </Container>
        </footer>
    );
}

export default Footer