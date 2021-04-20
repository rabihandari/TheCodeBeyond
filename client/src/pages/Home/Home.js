import React from 'react';
import { Container } from '@material-ui/core';

import Posts from '../../components/Posts/posts';
import PopularPosts from '../../components/PopularPosts/PopularPosts';
import Tags from '../../components/Tags/Tags';
import Footer from '../../components/Footer/Footer';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import useStyles from './styles';

const Home = (props) => {
    const classes = useStyles();

    return(
        <>
        {!props.isLoading &&
            <div style={{ overflow: 'hidden'}}>
                <Container className={classes.container}>
                    {(!props.isLoading && (props.selectedTitle.length > 0 || props.selectedTags.length > 0)) &&
                        <HomeHeader fetchPosts={props.fetchPosts} searchKeyword={props.selectedTitle} selectedTags={props.selectedTags}/>
                    }
                    <Posts {...props}/>
                    <PopularPosts />
                    <Tags {...props}/>
                </Container>
                <Footer />
            </div>
        }
        </>
    );
}

export default Home;