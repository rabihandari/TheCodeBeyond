import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, Grid, TextField, FormControl, Select, MenuItem, InputLabel, Input, Checkbox, ListItemText, FormControlLabel, Switch, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';
import SearchIcon from '../../images/icon-search.svg';
import PostRequests from './PostRequests/PostRequests';
import { fetchRequests } from '../../api';
import * as actionTypes from '../../actions/actionTypes';
import tags from '../../config/tags';

const CommunityRequests = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [resultsNumber, setResultsNumber] = useState(-1);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState({ keyword: '', tags: [], notAnswered: false });
    const [limitReached, setLimitReached] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));


    // Search keyword
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            filterRequests(event.target.value)
        }
    }

    // Search tags
    const handleChange = (event) => {
        let value = event.target.value;
        filterRequests(filter.keyword, value);

    }

    // Search not answered 
    const handleSwitch = (event) => {
        filterRequests(filter.keyword, filter.tags, !filter.notAnswered);
      };


    const filterRequests = (keyword=filter.keyword, tags=filter.tags, notAnswered=filter.notAnswered) => {
        setLoading(true);
        dispatch({ type: actionTypes.LOADING_START });
        fetchRequests(0, { keyword: keyword, tags: tags, notAnswered: notAnswered }).then(res => {
            setFilter({ keyword: keyword, tags: tags, notAnswered: notAnswered });
            setPage(0);
            setResultsNumber(res.data.resultNumber);
            setPosts(res.data.requests);
            setLimitReached(res.data.limitReached)
            setLoading(false);
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error.message);
            setLoading(false);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const loadMore = () => {
        setLoading(true);
        dispatch({ type: actionTypes.LOADING_START });
        fetchRequests(page + 1, filter).then(res => {
            setPage(page + 1);
            setPosts([ ...posts, ...res.data.requests ]);
            setLimitReached(res.data.limitReached)
            setLoading(false);
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error.message);
            setLoading(false);
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    useEffect(() => {
        let unmounted = false;
        dispatch({ type: actionTypes.LOADING_START });
        fetchRequests(0).then(res => {
            if(!unmounted){
                setPosts(res.data.requests);
                setResultsNumber(res.data.resultNumber);
                setLimitReached(res.data.limitReached)
                setLoading(false);
                dispatch({ type: actionTypes.LOADING_END });
            }
        }).catch(error => {
            if(!unmounted){
                console.log(error.message);
                setLoading(false);
                dispatch({ type: actionTypes.LOADING_END });
            }
        });
        
        return () => {
            unmounted = true;
        };
    }, [dispatch]); 

    return(
        <Container className={classes.container}>
            <Grid container justify="space-between">
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" className={classes.title}>Community Requests</Typography>
                    <Typography variant="caption">{ resultsNumber === -1 ? 'loading' : resultsNumber} {resultsNumber === 1 ? 'result' : 'results'}</Typography>
                </Grid>
                <Grid item className={classes.filterContainer} xs={12} md={8}>
                    <Grid container spacing={4} alignItems="flex-end" direction={matches ? "row-reverse" : "row"}>
                        <Grid item>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={filter.notAnswered}
                                    onChange={handleSwitch}
                                    color="primary"
                                />
                                }
                                label={
                                    <Typography variant="body2">Not Answered</Typography>
                                }
                            />
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl} size="small">
                                <InputLabel>Filter</InputLabel>
                                <Select 
                                multiple
                                value={filter.tags}
                                onChange={handleChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                >
                                {tags.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        <Checkbox checked={filter.tags.includes(tag)} />
                                        <ListItemText primary={tag}/>
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <img src={SearchIcon} alt="Search" />
                                </Grid>
                                <Grid item>
                                    <TextField label="Search" className={classes.searchField} size="small" onKeyDown={handleKeyDown}/>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            
            {(filter.keyword.length > 0 || filter.tags.length > 0) &&
                <>
                    <Grid container alignItems={(filter.tags.length > 0 && filter.keyword.length > 0) ? "flex-start" : "center"}  style={ filter.tags.length > 0 && filter.keyword.length > 0 ? { marginBottom: '0px', marginTop: '30px' } : { marginBottom: '0px', marginTop: '30px' }}>
                        <IconButton size="medium" onClick={() => {filterRequests('',[], false);}}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Grid item>
                            <Typography variant="h5" className={classes.searchTitle}>{filter.keyword.length > 0 ? filter.keyword : formatTags(filter.tags).join(", ")}</Typography>
                            {(filter.tags.length > 0 && filter.keyword.length > 0) &&
                                <Typography variant="caption" className={classes.searchTitle}>{formatTags(filter.tags).join(", ")}</Typography>
                            }
                        </Grid>
                    </Grid>
                </>
            }

            
            <PostRequests posts={posts} isLoading={isLoading} limitReached={limitReached} loadMore={loadMore} filterRequests={filterRequests}/>
        </Container>
    );

    function formatTags(tags) {
        return tags.map(tag => '#' + tag);
    }
}


export default CommunityRequests;