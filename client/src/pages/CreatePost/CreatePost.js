import React from 'react';
import { Container } from '@material-ui/core'

import Builder from '../../components/Posts/Builder/Builder';

const CreatePost = () => {
    return(
        <div>
            <Container>
                <Builder />
            </Container>
        </div>
    );
}

export default CreatePost;