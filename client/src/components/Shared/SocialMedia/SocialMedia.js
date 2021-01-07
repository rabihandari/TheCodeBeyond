import React from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Facebook, Instagram, Twitter, Pinterest } from '@material-ui/icons';

import useStyles from './styles';

const SocialMedia = () => {
    const classes = useStyles();

    return(
        <Grid container>
            <Tooltip title="Facebook">
                <IconButton aria-label="Facebook" color="primary" className={classes.socialMediaButton} component="a" href="https://www.facebook.com" target="_blank">
                    <Facebook/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
                <IconButton aria-label="Instagram" color="primary" className={classes.socialMediaButton} component="a" href="https://www.instagram.com" target="_blank">
                    <Instagram/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
                <IconButton aria-label="Twitter" color="primary" className={classes.socialMediaButton} component="a" href="https://www.twitter.com" target="_blank">
                    <Twitter/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Pinterest">
                <IconButton aria-label="Pinterest" color="primary" className={classes.socialMediaButton} component="a" href="https://www.pinterest.com" target="_blank">
                    <Pinterest/>
                </IconButton>
            </Tooltip>
        </Grid>
    );

}

export default SocialMedia;