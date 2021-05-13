import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Divider, Button } from '@material-ui/core'; 
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Visibility from '@material-ui/icons/Visibility';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import useStyles from './styles';
import { getRequest, addAnswer } from '../../api';
import * as actionTypes from '../../actions/actionTypes';
import Builder from './Builder/Builder';
import Questions from './Questions/Questions';

const Answer = () => {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [postRequest, setPostRequest] = useState(null);
    const [postPreviewed, setPostPreviewed] = useState(false);
    const [postData, setPostData] = useState({ title: '', description: '', body: '', imageFile: '', tags: []});
    const [isLoading, setLoading] = useState(true);
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const user = JSON.parse(localStorage.getItem('profile'));

    const handlePreview = () => {
        setPostPreviewed(!postPreviewed);
    }
   
    useEffect(() => {
        let mounted = false;
        dispatch({ type: actionTypes.LOADING_START });
        getRequest(params.id).then(res => {
            if(!mounted){
                setPostRequest(res.data.postRequest);
                setPostData({ title: '', description: '', body: '', imageFile: '', tags: res.data.postRequest.tags });
                setLoading(false);
                dispatch({ type: actionTypes.LOADING_END});
            }
        }).catch(error => {
            if(!mounted){
                console.log(error);
                setLoading(false);
                dispatch({ type: actionTypes.LOADING_END});
            }
        });
    }, [params.id, dispatch]);


    const handleSubmit = (event) => {

        const formData = new FormData();
        formData.append('id', postData._id);
        formData.append('title', postData.title);
        formData.append('description', postData.description);
        formData.append('body', postData.body);
        formData.append('tags', JSON.stringify(postData.tags));
        formData.append('imageFile', postData.imageFile);
        formData.append('creator', postData.creator);
        formData.append('name', user.result.name);
        formData.append('requestId', postRequest._id);
        formData.append('requestTitle', postRequest.title);
        formData.append('requestEmail', postRequest.creator.email);
        
        // Create post...
        dispatch({ type: actionTypes.LOADING_START });
        addAnswer(formData).then(() => {
            dispatch({ type: actionTypes.SHOW_ALERT, payload: { open: true, message: 'Thank you for helping out the community!', severity: 'success' } });
            dispatch({ type: actionTypes.LOADING_END });
            history.push('/');
        }).catch(error => {
            dispatch({ type: actionTypes.SHOW_ALERT, payload: { open: true, message: error?.response?.data?.message, severity: 'error' } });
            dispatch({ type: actionTypes.LOADING_END });
        });

    }

    return(
        <>
        <Container className={classes.container} >
            {!isLoading &&
                (postRequest ? 
                    <Grid container spacing={2} alignItems="baseline">
                        <Grid item md={8}>
                            <Typography variant='h5' className={classes.title}>{postRequest.title}</Typography>
                            <Typography variant='body2' className={classes.description}>{postRequest.description}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Grid container direction="row-reverse" className={classes.submitContianer}>
                                <Button 
                                    style={{ marginRight: '10px', textTransform: 'none' }}
                                    color="secondary" 
                                    variant="text" 
                                    startIcon={<Visibility />} 
                                    onClick={handlePreview}
                                >
                                    {postPreviewed ? "Show Questions" : "Hide Questions"}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item md={8}>
                            <Divider className={classes.divider}/>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container spacing={2} direction={matches ? 'row' : 'column-reverse'}>
                                <Grid item md={postPreviewed ? 12 : 6}>
                                    <Builder postPreviewed={postPreviewed} tags={postRequest.tags} postData={postData} setPostData={setPostData} publish={handleSubmit}/>
                                </Grid>
                                {!postPreviewed &&
                                    <Grid item xs={12} md={6}>
                                        <Questions questions={postRequest.questions} postData={postData} setPostData={setPostData}/>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                :
                    <Grid container spacing={2} alignItems="center">
                        <Grid item md={8}>
                            <Typography variant='h5' className={classes.title}>404</Typography>
                            <Typography variant='body2' className={classes.description}>Sorry, but it seems that the requested post you are looking for does not exist or has been removed by the author</Typography>
                        </Grid>
                    </Grid>)
            }
        </Container>
        </>
    );
}

export default Answer;
