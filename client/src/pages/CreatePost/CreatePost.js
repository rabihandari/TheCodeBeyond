import React, { useEffect } from 'react';
import { Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

import Builder from '../../components/Posts/Builder/Builder';

const CreatePost = ({ editing }) => {
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if(!currentUser){
            history.push('/login')
        }
    },[editing, currentUser, history]);

    return(
        <div>
            <Container>
                <Builder editing={editing}/>
            </Container>
        </div>
    );
}

export default CreatePost;