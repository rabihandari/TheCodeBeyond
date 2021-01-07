import React from 'react';
import { Container, Typography } from '@material-ui/core'

import useStyles from './styles';

const CreatePost = () => {
    const classes = useStyles();

    return(
        <div>
            <Container className={classes.container}>
                <Typography variant='h3' component="p">Contact Us</Typography>
            </Container>
        </div>
    );
}

export default CreatePost;