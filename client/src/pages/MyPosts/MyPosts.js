import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { StyledTab, StyledTabs, useStyles } from './styles';
import PublishedPosts from '../../components/PublishedPosts/PublishedPosts';
import PublishedResponses from '../../components/PublishedResponses/PublishedResponses';
import { getPublishedPosts, getPublishedResponses } from '../../api';
import * as actionTypes from '../../actions/actionTypes';

const MyPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [publishedResponses, setPublishedResponses] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const goToAddPost = () => {
        history.push('/createPost');
    }

    useEffect(() => {
        setLoading(true);
        dispatch({ type: actionTypes.LOADING_START });

        const promise1 = new Promise((resolve, reject) => {
            getPublishedPosts().then(res => {
                setPublishedPosts(res.data.posts);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });

        const promise2 = new Promise((resolve, reject) => {
            getPublishedResponses().then(res => {
                setPublishedResponses(res.data.responses);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });

        Promise.all([promise1, promise2]).then(() => {
            dispatch({ type: actionTypes.LOADING_END });
            setLoading(false);
        }).catch(errors => {
            console.log(errors);
            setLoading(false);
        });
        
    }, [dispatch]);

    return(
        <Container className={classes.container}>
            <Grid container className={classes.header} justify="space-between" alignItems="center">
                <Grid item md={6}>
                    <Typography variant="h4">Your Posts</Typography>
                </Grid>
                <Grid item md={6}>
                    <Grid container spacing={2} direction="row-reverse">
                        <Grid item>
                            <Button className={classes.button} variant="outlined" color="primary" onClick={goToAddPost}>Create a post</Button>
                        </Grid>
                        <Grid item>
                            <Button className={classes.button} variant="outlined" color="secondary">Settings</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <StyledTabs value={value} onChange={handleChange} aria-label="Styled Tabs">
                <StyledTab label="Published" />
                <StyledTab label="Drafts" />
                <StyledTab label="Responses" />
            </StyledTabs>
            {value === 0 && 
                <PublishedPosts posts={publishedPosts} isLoading={isLoading}/>
            }
            
            {value === 1 && 
                <div></div>
            }
            
            {value === 2 && 
                <PublishedResponses responses={publishedResponses} isLoading={isLoading}/>
            }
        </Container>
    );
}

export default MyPosts;