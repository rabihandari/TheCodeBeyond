import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import useStyles from './styles';
import PopularPost from './PopularPost/PopularPost';

const PopularPosts = () => {
    const popularPosts = useSelector((state) => state.popularPosts);
    const classes = useStyles();

    return(
        <Grid container className={classes.container}>
            <Typography variant="h4" className={classes.title}>Popular Posts</Typography>
            <Grid container direction="row" alignItems="center" justify="space-between" className={classes.title}>
                {popularPosts.map((popularPost) => 
                    <Grid item key={popularPost._id} xs={12} md={6} lg={3}>
                        <Link to={`/${popularPost._id}/${popularPost.title}`} style={{ textDecoration: 'none', color: '#000000FF' }}>
                            <PopularPost post={popularPost}/>
                        </Link>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}

export default PopularPosts;