import React from 'react';
import { Container, Typography } from '@material-ui/core'
import useStyles from './styles';

const About = () => {
    const classes = useStyles();

    return(
        <div>
            <Container className={classes.container}>
                <Typography variant='h3'>About Us</Typography>
            </Container>
        </div>
    );
}

export default About;