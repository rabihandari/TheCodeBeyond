import React from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Facebook, Instagram, Twitter, LinkedIn } from '@material-ui/icons';

import useStyles from './styles';

const SocialMedia = () => {
    const classes = useStyles();

    return(
        <Grid container>
            <Tooltip title="Facebook">
                <IconButton aria-label="Facebook" color="primary" className={classes.socialMediaButton} component="a" href="https://www.facebook.com/rabih.andari.927/" target="_blank">
                    <Facebook/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
                <IconButton aria-label="Instagram" color="primary" className={classes.socialMediaButton} component="a" href="https://www.instagram.com" target="_blank">
                    <Instagram/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
                <IconButton aria-label="Twitter" color="primary" className={classes.socialMediaButton} component="a" href="https://twitter.com/RabihAndari" target="_blank">
                    <Twitter/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Linked In">
                <IconButton aria-label="Linked In" color="primary" className={classes.socialMediaButton} component="a" href="https://www.linkedin.com/in/rabih-andari-368a71201/" target="_blank">
                    <LinkedIn/>
                </IconButton>
            </Tooltip>
        </Grid>
    );

}

export default SocialMedia;