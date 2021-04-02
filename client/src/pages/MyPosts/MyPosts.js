import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { StyledTab, StyledTabs, useStyles } from './styles';
import PublishedPosts from '../../components/PublishedPosts/PublishedPosts';
import { getPublishedPosts } from '../../api';
import * as actionTypes from '../../actions/actionTypes';

const MyPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [publishedPosts, setPublishedPosts] = useState([]);

    const handleChange = (event, newValue) => {
        dispatch({ type: actionTypes.LOADING_START });
        switch (newValue) {
            case 1:
                setValue(newValue);
                dispatch({ type: actionTypes.LOADING_END });
                break;
            case 2:
                setValue(newValue);
                dispatch({ type: actionTypes.LOADING_END });
                break;
            default:
                getPublishedPosts().then(res => {
                    setPublishedPosts(res.data.posts);
                    setValue(newValue);
                    dispatch({ type: actionTypes.LOADING_END });
                }).catch(error => {
                    console.log(error);
                });
                break;
        }
        
    };

    const goToAddPost = () => {
        history.push('/createPost');
    }

    useEffect(() => {
        getPublishedPosts().then(res => {
            setPublishedPosts(res.data.posts);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return(
        <Container className={classes.container}>
            <Grid container className={classes.header} justify="space-between" alignItems="center">
                <Grid item md={6}>
                    <Typography variant="h4">Your Posts</Typography>
                </Grid>
                <Grid item md={6}>
                    <Grid container spacing={2} direction="row-reverse">
                        <Grid item>
                            <Button className={classes.button} variant="outlined" color="primary" onClick={goToAddPost}>Create</Button>
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
                <PublishedPosts posts={publishedPosts}/>
            }
            
            {value === 1 && 
                <div></div>
            }
            
            {value === 2 && 
                <div></div>
            }
        </Container>
    );
}

export default MyPosts;