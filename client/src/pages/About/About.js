import React from 'react';
import { Container, Typography } from '@material-ui/core'

import Header from '../../components/Header/Header';

const About = () => {
    return(
        <div>
            <Header />
            <Container>
                <Typography variant='h3'>About Us</Typography>
            </Container>
        </div>
    );
}

export default About;