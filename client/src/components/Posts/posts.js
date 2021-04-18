import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import Post from './post/post';
import useStyles from './styles';
import noResultImage from '../../images/no_results_found.png';

const Posts = (props) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    const pages = useSelector((state) => state.pages);
    const isLoading = useSelector((state) => state.loadingIndeterminate);

    // Spreading the posts across 4 columns...
    const postColumns = [[],[],[],[]];
    posts.forEach((post, index) => {
        postColumns[index % 4].push(post);
    });

    const goBack = () => {
        // Reset Tags, page number, and posts 
        props.setPage(1);
        props.fetchPosts(0, "", []);
    }
    
    const handleChange = (event, value) => {
        props.setPage(value);
        props.fetchPosts(value - 1);
    };

    return(
        <Grid container alignItems="stretch" justify="center" className={classes.mainContainer}>
            {postColumns.map((_, index) => 
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <PostsColumn posts={postColumns[index]} cindex={index}/>
                </Grid>
            )}
            {posts.length !== 0 && 
                <Grid item className={classes.paginationController}>
                    <Pagination count={pages} page={props.page} onChange={handleChange} color="primary" />
                </Grid>
            }
            {(!isLoading && posts.length === 0) && 
                <Grid container className={classes.mainContainer} direction="column" alignItems="center">
                    <Grid item>
                        <img src={noResultImage} alt="No Result"/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" className={classes.noResultTitle}>No Result Found</Typography>
                        <Typography variant="body1" className={classes.noResultDescription}>We were unable to find you result for this filter. Get back and start searching again!</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={goBack} className={classes.goBack}>Go Back</Button>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

export default Posts;


const PostsColumn = ({ posts, cindex}) => {
    const postCards = posts.map(post => 
        <Grid item key={post._id}>
            <Post post={post} cindex={cindex} />
        </Grid>
    );

    return(
        <Grid container direction="column" >
            {postCards}
        </Grid>
    );
}