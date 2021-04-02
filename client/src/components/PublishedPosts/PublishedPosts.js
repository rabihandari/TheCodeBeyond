import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const PublishedPosts = ( props ) => {
    const classes = useStyles();

    const posts = props.posts.map(post => <Post key={post.title} post={post} />);

    return(
        <Grid container direction="column" className={classes.container}>
            {posts.length > 0 ?
                posts
            :
                <div>
                    <Typography variant="h6">No posts to show</Typography>
                </div>
            }
        </Grid>
    );
}
export default PublishedPosts;

const Post = ({ post }) => {
    const classes = useStyles();

    return(
        <Grid item>
            <Typography variant="body1" className={classes.title}>{post.title}</Typography>
            <Typography variant="body2" className={classes.description}>{post.description}</Typography>
            <Typography variant="caption" className={classes.createdAt}>Published {moment(post.createdAt).fromNow()}</Typography>
        </Grid>
    );
}