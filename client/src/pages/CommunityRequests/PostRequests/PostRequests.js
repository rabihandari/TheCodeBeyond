import React from 'react';
import { Typography, Button } from '@material-ui/core'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useStyles from './styles';
import PostRequest from './PostRequest/PostRequest';

const RequestPost = ({ posts, isLoading, limitReached, loadMore, filterRequests }) => {
    const classes = useStyles();

    const handleGoBack = () => {
        filterRequests('',[], false);
    }

    return(
        <div className={classes.container} >
            {posts.length === 0 ?
                !isLoading && (
                    <>
                        <Typography variant="h5" className={classes.nothingTitle}>No result found!</Typography>
                        <Typography variant="body2" className={classes.nothingDesc}>Sorry, we could not find any result for your search filter</Typography>
                        <Button variant="text" className={classes.goBack} color="primary" startIcon={<ArrowBackIcon/>} onClick={handleGoBack}>Go back</Button>
                    </>
                ) 
            :
                <>
                    {posts.map(request => <PostRequest key={request._id} post={request} />)}
                    {!limitReached &&
                        <Button variant="text" color="primary" className={classes.loadMore} onClick={loadMore}>{!isLoading ? 'Load More' : 'Loading...'}</Button>
                    }
                </>
            }
        </div>
    );
}

export default RequestPost;