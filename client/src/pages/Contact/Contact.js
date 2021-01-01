import React from 'react';
import { Container, Typography } from '@material-ui/core'

import Header from '../../components/Header/Header';

const CreatePost = () => {
    return(
        <div>
            <Header />
            <Container>
                <Typography variant='h3' component="p">Contact Us</Typography>
            </Container>
        </div>
    );
}

export default CreatePost;