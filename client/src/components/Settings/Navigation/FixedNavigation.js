import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './styles';

const FixedNavigation = ({ goToSection }) => {
    const classes = useStyles();
    const titles = [
        'Edit Profile',
        'Account',
        'Security'
    ];

    return(
        <Grid container className={classes.navigatorContainer} direction='column'>
            <Typography className={classes.navigatorTitle}>Settings</Typography>
            {titles.map((title, index) => (
                <Typography key={index} className={classes.navigatorItem} onClick={goToSection(index)}>{title}</Typography>
            ))}
        </Grid>
    );
}

export default FixedNavigation;