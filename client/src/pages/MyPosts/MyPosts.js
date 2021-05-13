import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { StyledTab, StyledTabs, useStyles } from './styles';
import PublishedPosts from '../../components/PublishedPosts/PublishedPosts';
import PublishedResponses from '../../components/PublishedResponses/PublishedResponses';
import PublishedRequests from '../../components/PublishedRequests/PublishedRequests';
import { getPublishedPosts, getPublishedResponses, getUserRequests } from '../../api';
import * as actionTypes from '../../actions/actionTypes';

const MyPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [publishedResponses, setPublishedResponses] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const goToAddPost = () => {
        history.push('/createPost');
    }

    const goToSettings = () => {
        history.push('/settings');
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

        const promise3 = new Promise((resolve, reject) => {
            getUserRequests().then(res => {
                setUserRequests(res.data.posts);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });

        Promise.all([promise1, promise2, promise3]).then(() => {
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
                            <Button className={classes.button} variant="outlined" color="secondary" onClick={goToSettings}>Settings</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <StyledTabs value={value} onChange={handleChange} aria-label="Styled Tabs">
                <StyledTab label="Published" />
                <StyledTab label="Drafts" />
                <StyledTab label="Responses" />
                <StyledTab label="Requests" />
            </StyledTabs>
            {value === 0 && 
                <PublishedPosts posts={publishedPosts} isLoading={isLoading}/>
            }
            
            {value === 1 && 
                <div style={{ padding: '60px 0px' }}>
                    <Typography variant="h5" className={classes.commingSoon}>Coming Soon!</Typography>
                    <Typography variant="body2" className={classes.commingSoonDec}>This feature is still under construction. Stay tuned!</Typography>
                </div>
            }
            
            {value === 2 && 
                <PublishedResponses responses={publishedResponses} isLoading={isLoading}/>
            }
            
            {value === 3 && 
                <PublishedRequests requests={userRequests} isLoading={isLoading}/>
            }
        </Container>
    );
}

export default MyPosts;