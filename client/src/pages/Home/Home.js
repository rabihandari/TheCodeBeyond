import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Posts from '../../components/Posts/posts';
import PopularPosts from '../../components/PopularPosts/PopularPosts';
import TrendingPosts from '../../components/TrendingPosts/TrendingPosts';
import Tags from '../../components/Tags/Tags';
import Footer from '../../components/Footer/Footer';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import AccountDeactivated from '../../components/AccountDeactivated/AccountDeactivated';
import useStyles from './styles';
import PostRequests from '../../components/PostRequests/PostRequests';

const Home = (props) => {
    const classes = useStyles();
    const { security } = useSelector(state => state.settings);

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    return(
        <>
        {!props.isLoading &&
            <div style={{ overflow: 'hidden'}}>
                <Container className={classes.container}>
                    {!(security?.deactivated && currentUser) ?
                        <div>
                            {(!props.isLoading && (props.selectedTitle.length > 0 || props.selectedTags.length > 0)) &&
                                <HomeHeader fetchPosts={props.fetchPosts} searchKeyword={props.selectedTitle} selectedTags={props.selectedTags}/>
                            }
                            <Posts {...props}/>
                            <PopularPosts />
                            <Grid container spacing={5} justify="space-between">
                                <Grid item xs={12} md={7}>
                                    <TrendingPosts />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <PostRequests />
                                    <Tags {...props} />
                                </Grid>
                            </Grid>
                            
                        </div>
                    :
                        <AccountDeactivated />

                    }
                </Container>
                <Footer />
            </div>
        }
        </>
    );
}

export default Home;