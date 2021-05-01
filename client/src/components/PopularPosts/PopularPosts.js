import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import useStyles from './styles';
import PopularPost from './PopularPost/PopularPost';
import PopularIcon from '../../images/icon-popular.svg';

const PopularPosts = () => {
    const popularPosts = useSelector((state) => state.popularPosts);
    const classes = useStyles();


    return(
        <Grid container className={classes.mainContainer}>
            <Grid container className={classes.titleContainer} alignItems="center">
                <img src={PopularIcon} alt="Trending" />
                <Typography variant="body1" className={classes.title}>Popular on The Code Beyond</Typography>
            </Grid>
            <Grid container direction="row" alignItems="center" className={classes.postsContainer} spacing={5}>
                {popularPosts.map((popularPost) => 
                    <Grid item key={popularPost._id} xs={12} sm={6} lg={4}>
                        <PopularPost post={popularPost}/>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default PopularPosts;