import React from 'react';
import { Container } from '@material-ui/core';

import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/posts';

const Home = () => {
    return(
        <div style={{ overflow: 'hidden'}}>
            <Header />
            <Container>
                <Posts />
            </Container>
        </div>
    );
}

export default Home;