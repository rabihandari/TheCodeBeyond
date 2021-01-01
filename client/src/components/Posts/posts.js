import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';


import Post from './post/post';
import useStyles from './styles';

const Posts = () => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    const postCards = posts.map(post => <Grid item key={post._id} xs={12} sm={6} md={3}><Post post={post} /></Grid>);

    return(
        <Grid container alignItems="stretch" className={classes.mainContainer}>
            {postCards}
            {postCards}
            {postCards}
        </Grid>
    );
}

export default Posts;