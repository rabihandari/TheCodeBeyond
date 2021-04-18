import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';
import { fetchSavedPosts, savePost as removeSavedPost} from '../../api';
import SavedPost from '../../components/SavedPost/SavedPost';
import * as actionTypes from '../../actions/actionTypes';

const SavedPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [savedPosts, setSavedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [limitReached, setLimitReached] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        dispatch({ type: actionTypes.LOADING_START });
        setLoading(true);
        fetchSavedPosts(0).then(res => {
            setSavedPosts(res.data.posts);
            setLimitReached(res.data.limitReached);
            dispatch({ type: actionTypes.LOADING_END });
            setLoading(false);
        }).catch(error => {
            console.log(error);
            dispatch({ type: actionTypes.LOADING_END });
            setLoading(false);
        });
    }, [dispatch]);


    const removePost = (id) => () => {
        dispatch({ type: actionTypes.LOADING_START });
        removeSavedPost({ postId: id }).then(() => {
            setSavedPosts(savedPosts.filter(post => post._id !== id));
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error)
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const viewPost = (id, title) => () => {
        history.push(`/${id}/${title}`)
    }

    const loadMore = () => {
        dispatch({ type: actionTypes.LOADING_START });
        fetchSavedPosts(currentPage + 1).then(res => {
            setSavedPosts([...savedPosts, ...res.data.posts]);
            setLimitReached(res.data.limitReached);
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            dispatch({ type: actionTypes.LOADING_END });
        });
        setCurrentPage(currentPage + 1);
    }


    return(
        <Container className={classes.container}>
            <Grid container className={classes.header} justify="space-between" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.title}>Saved</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SavedPost posts={savedPosts} removePost={removePost} viewPost={viewPost} loadMore={loadMore} isLoading={isLoading} limitReached={limitReached}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SavedPosts;