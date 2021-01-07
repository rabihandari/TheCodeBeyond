import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const CopyRight = () => {
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <Typography className={classes.copyRight}>@ Copyright The Code Beyond 2021 &nbsp; | &nbsp; All Rights Reserved </Typography>
        </div>
    );
}

export default CopyRight;