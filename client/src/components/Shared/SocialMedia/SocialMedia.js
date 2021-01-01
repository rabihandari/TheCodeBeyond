import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Facebook, Instagram, Twitter, Pinterest } from '@material-ui/icons';

import useStyles from './styles';

const SocialMedia = () => {
    const classes = useStyles();

    return(
        <Grid container>
            <IconButton aria-label="Facebook" color="primary" className={classes.socialMediaButton} component="a" href="https://www.facebook.com" target="_blank">
                <Facebook/>
            </IconButton>
            <IconButton aria-label="Instagram" color="primary" className={classes.socialMediaButton} component="a" href="https://www.instagram.com" target="_blank">
                <Instagram/>
            </IconButton>
            <IconButton aria-label="Twitter" color="primary" className={classes.socialMediaButton} component="a" href="https://www.twitter.com" target="_blank">
                <Twitter/>
            </IconButton>
            <IconButton aria-label="Pinterest" color="primary" className={classes.socialMediaButton} component="a" href="https://www.pinterest.com" target="_blank">
                <Pinterest/>
            </IconButton>
        </Grid>
    );

}

export default SocialMedia;