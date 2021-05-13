import React from 'react';
import { Typography, CardMedia, Grid, Avatar, IconButton, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import readingTime from 'reading-time';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';
import * as actionTypes from '../../../actions/actionTypes';
import SaveIcon from '../../../images/icon-save.svg';
import SavedIcon from '../../../images/icon-saved.svg';
import { savePost as reqSavePost } from '../../../api';

const TrendingPost = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const goToPost = () => {
        history.push(`/${post._id}/${post.title}`)
    }

    const savePost = () => {
        if (!currentUser) {
            history.push("/login");
            return
        }

        let payload = { _id: post._id };
        post.saved ? dispatch({ type: actionTypes.UNSAVE_TRENDING, payload: payload }) : dispatch({ type: actionTypes.SAVE_TRENDING, payload: payload });
        reqSavePost({ postId: post._id }).catch(error => {
            console.log(error)
        });
    }


    return(
        <Grid container className={classes.container}>
            {matches && 
                <Grid item sm={3} md={4} onClick={goToPost}>
                    <CardMedia image={post.imageFile} alt={post.title} className={classes.postImage} />
                </Grid>
            }
            <Grid item xs={12} sm={9} md={8}>
                <Grid container direction="column">
                    <Grid item  onClick={goToPost}> 
                        <Grid container alignItems="center">
                            <Avatar variant="rounded" className={classes.profilePicture} src={post.profilePicture} alt={post.name}>{post.name.charAt(0)}</Avatar>
                            <Typography variant="caption" className={classes.postCreator}>{post.name} in {post.tags.join(",")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item  onClick={goToPost}>
                        <Typography variant="h6" className={classes.postTitle}>{post.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography variant="caption" className={classes.postDate}>{moment(post.createdAt).format('MMM YY')} · {readingTime(post.body).text}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton size="small" onClick={savePost}>
                                    <Tooltip title="Save">
                                        {post.saved ? 
                                            <img src={SavedIcon} alt="Save"/>
                                        :
                                        
                                            <img src={SaveIcon} alt="Save"/>
                                        }
                                    </Tooltip>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default TrendingPost;