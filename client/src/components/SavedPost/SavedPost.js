import React from 'react';
import { Grid, Typography, CardMedia, Button } from '@material-ui/core';
import moment from 'moment';
import readingTime from 'reading-time';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import useStyles from './styles';

const PublishedPosts = ( props ) => {
    const classes = useStyles();

    const posts = props.posts.map(post => <Post key={post.title} post={post} removePost={props.removePost} viewPost={props.viewPost} />);

    return(
        <Grid container direction="column" className={classes.container}>
            {posts.length > 0 ?
                <Grid container>
                    {posts}
                    {!props.limitReached &&
                        <Button variant="text" className={classes.loadMore} onClick={props.loadMore}>Load More</Button>
                    }
                </Grid>
                
            :
                (!props.isLoading &&
                    <div>
                        <Typography variant="body1" className={classes.nothingYet}>You have not saved any post yet!</Typography>
                    </div>
                )
            }
        </Grid>
    );
}
export default PublishedPosts;

const Post = ({ post, removePost, viewPost }) => {
    const classes = useStyles();
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));
    const redTheme = createMuiTheme({ palette: { primary: red } })

    return(
        <Grid container className={classes.postContainer} onClick={!matches ? viewPost(post._id, post.title) : () => {}} >
            <Grid item xs={9} md={7}>
                <Typography variant="body1" className={classes.title}>{post.title}</Typography>
                <Typography variant="body2" className={classes.description}>{post.description}</Typography>
                {matches &&
                    <Typography variant="caption" className={classes.createdAt}><span className={classes.creatorName}>{post.name}</span> published {moment(post.createdAt).fromNow()} · {readingTime(post.body).text}</Typography>
                }
            </Grid>
            <Grid item xs={3} md={5}>
                <CardMedia image={post.imageFile} alt={post.title} className={classes.postImage} />
            </Grid>
            {!matches &&
                <>
                    <Grid item xs={9} md={7} style={{ marginTop: '10px' }}>
                        <Typography variant="caption" className={classes.createdAt}>{moment(post.createdAt).fromNow()} · {readingTime(post.body).text}</Typography>
                    </Grid>
                    <Grid item xs={3} md={5}>
                        <MuiThemeProvider theme={redTheme}>
                            <Button variant="text" color="primary" startIcon={<DeleteOutlineOutlinedIcon/>} className={classes.removeButton} size='small' onClick={removePost(post._id)}>Remove</Button>
                        </MuiThemeProvider>
                    </Grid>
                </>
            }
            {matches &&
                <Grid item xs={12}>
                    <MuiThemeProvider theme={redTheme}>
                        <Button variant="text" color="primary" startIcon={<DeleteOutlineOutlinedIcon/>} className={classes.removeButton} size='small' onClick={removePost(post._id)}>Remove</Button>
                    </MuiThemeProvider>
                    <Button variant="text" color="default" startIcon={<VisibilityOutlinedIcon/>} className={classes.viewButton} size='small' onClick={viewPost(post._id, post.title)}>View</Button>
                </Grid>
            }
        </Grid>
    );
}