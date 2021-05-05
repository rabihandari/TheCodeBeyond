import React from 'react';
import { Container } from '@material-ui/core'

import Builder from '../../components/Posts/Builder/Builder';

const CreatePost = ({ editing }) => {

    return(
        <div>
            <Container>
                <Builder editing={editing}/>
            </Container>
        </div>
    );
}

export default CreatePost;