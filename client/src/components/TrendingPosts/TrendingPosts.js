import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import useStyles from './styles';
import PopularPost from './TrendingPost/TrendingPost';
import TrendingIcon from '../../images/icon-trending.svg';

const TrendingPosts = () => {
    const popularPosts = useSelector((state) => state.trendingPosts);
    const classes = useStyles();


    return(
        <Grid container className={classes.mainContainer}>
            <Grid container className={classes.titleContainer} alignItems="center">
                <img src={TrendingIcon} alt="Trending" />
                <Typography variant="body1" className={classes.title}>Trending on The Code Beyond</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center" className={classes.postsContainer} spacing={5}>
                {popularPosts.map((popularPost) => 
                    <Grid item key={popularPost._id} xs={12}>
                        <PopularPost post={popularPost}/>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default TrendingPosts;