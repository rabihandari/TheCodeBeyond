import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core'; 
import { useHistory } from 'react-router-dom'; 


import useStyles, { CustomIndeterminate } from './styles';
import PostRequest from './PostRequest/PostRequest';
import RequestIcon from '../../images/icon-request.svg';
import { getRequests } from '../../api';

const RequestPost = () => {
    const classes = useStyles();
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const goToCommunityRequests = () => {
        history.push('/community-requests');
    }

    useEffect(() => {
        let unmounted = false;
        getRequests().then(res => {
            if(!unmounted){
                setPosts(res.data.posts);
                setLoading(false);
            }
        }).catch(error => {
            if(!unmounted){
                console.log(error.message);
                setLoading(false);
            }
        });
        
        return () => {
            unmounted = true;
        };
    }, []); 

    return(
        <Container className={classes.container} >
            <Grid container className={classes.titleContainer} alignItems="center">
                <img src={RequestIcon} alt="Trending" />
                <Typography variant="body1" className={classes.title}>Community Requests</Typography>
            </Grid>
            <CustomIndeterminate style={{ visibility: isLoading ? 'visible' : 'hidden', marginTop: '10px' }}/>
            {posts.length === 0 ?
                !isLoading && (
                    <Typography variant="body2" className={classes.nothingYet}>Nothing yet!</Typography>
                ) 
            :
                <>
                {posts.map(request => <PostRequest key={request._id} post={request} />)}
                <Button variant="text" color="primary" className={classes.seeAll} onClick={goToCommunityRequests} >See all community requests</Button>
                </>
            }
        </Container>
    );
}

export default RequestPost;