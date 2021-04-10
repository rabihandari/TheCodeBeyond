import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const PublishedResponses = ( props ) => {
    const classes = useStyles();

    const responses = props.responses.map(response => <Response key={response.title} response={response} />);

    return(
        <Grid container direction="column" className={classes.container}>
            {responses.length > 0 ?
                responses
            :
            (!props.isLoading &&
                <div>
                    <Typography variant="body1" className={classes.nothingYet}>You have not publish any response yet!</Typography>
                </div>
            )
            }
        </Grid>
    );
}
export default PublishedResponses;

const Response = ({ response }) => {
    const classes = useStyles();

    return(
        <Grid item>
            <Typography variant="body1" className={classes.title}>{response.title}</Typography>
            <Typography variant="caption" className={classes.createdAt}>Published {moment(response.createdAt).fromNow()}</Typography>
        </Grid>
    );
}