import React from 'react';
import { Container } from '@material-ui/core'

import Header from '../../components/Header/Header';
import Builder from '../../components/Posts/Builder/Builder';

const CreatePost = () => {
    return(
        <div>
            <Header />
            <Container>
                <Builder />
            </Container>
        </div>
    );
}

export default CreatePost;