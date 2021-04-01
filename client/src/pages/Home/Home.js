import React from 'react';
import { Container } from '@material-ui/core';

import Posts from '../../components/Posts/posts';
import PopularPosts from '../../components/PopularPosts/PopularPosts';
import Tags from '../../components/Tags/Tags';
import Footer from '../../components/Footer/Footer';
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
            <Footer />
        </div>
    );
}

export default Home;