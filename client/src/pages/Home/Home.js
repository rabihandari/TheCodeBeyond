import React from 'react';
import { Container } from '@material-ui/core';

import Posts from '../../components/Posts/posts';
import PopularPosts from '../../components/PopularPosts/PopularPosts';
import Tags from '../../components/Tags/Tags';
import useStyles from './styles';

const Home = (props) => {
    const classes = useStyles();

    return(
        <div style={{ overflow: 'hidden'}}>
            <Container className={classes.container}>
                <Posts {...props}/>
                <PopularPosts />
                <Tags {...props}/>
            </Container>
        </div>
    );
}

export default Home;