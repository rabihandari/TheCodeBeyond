import React, { useState } from 'react';
import { Grid, Typography, Link, Button } from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getRequestPosts } from '../../api';
import useStyles, { CustomIndeterminate } from './styles';

const PublishedRequests = ( props ) => {
    const classes = useStyles();
    const history = useHistory();

    const posts = props.requests.map(request => <Request key={request.createdAt + request.title} request={request} />);

    const goToRequest = () => {
        history.push('/request');
    }

    return(
        <Grid container direction="column" className={classes.container}>
            {posts.length > 0 ?
                posts
            :
            (!props.isLoading &&
                <div>
                    <Typography variant="body1" className={classes.nothingYet}>You have not requested any post yet!</Typography>
                    <Link onClick={goToRequest}>
                        <Typography variant="body2" className={classes.requestPost}>Request post</Typography>
                    </Link>
                </div>
            )
            }
        </Grid>
    );
}
export default PublishedRequests;

const Request = ({ request }) => {
    const classes = useStyles();
    const [opened, setOpened] = useState(false);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);

    let answered = request.answers.length > 0;

    const getPosts = () => {
        if(posts){
            setOpened(!opened);
            return;
        }

        setOpened(!opened);
        setLoading(true);
        getRequestPosts({ postIds: request.answers }).then(res => {
            setPosts(res.data.posts);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    return(
        <Grid item>
            <Typography variant="body1" className={classes.title}><span style={{ color: '#00c100', fontFamily: 'MetropolisRegular', fontSize: '14px' }}>{answered && "Answered"}<br/></span>{request.title}</Typography>
            <Typography variant="body2" className={classes.description}>{request.description}</Typography>
            <Typography variant="caption" className={classes.createdAt}>Published {moment(request.createdAt).fromNow()}</Typography>
            {answered &&
                <div>
                    <Button variant="text" onClick={getPosts} startIcon={<QuestionAnswerIcon />} className={classes.viewAnswersButton}>{request.answers.length} {request.answers.length > 1 ? "answers" : 'answer'}</Button>
                    {opened && 
                        (!loading ?
                            (posts &&
                                <Grid container>
                                    {posts.map(post => (
                                        <Post key={post._id} post={post} />
                                    ))}
                                </Grid>
                            )
                        :
                            <CustomIndeterminate/>
                        )
                        
                    }
                </div>
            }
        </Grid>
    );
}


const Post = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const handleClick = () => {
        history.push(`/${post._id}/${post.title}`);
    }

    return(
        <Grid container className={classes.postContainer} onClick={handleClick}>
            {matches &&
                <div>
                    <img src={post.imageFile} alt={post.title} className={classes.imageFile}/>
                </div>
            }
            <div>
                <Typography variant="body2" className={classes.postTitle}>{post.title}</Typography>
                <Typography variant="caption">{post.description}</Typography>
                <Typography variant="caption" className={classes.createdAt} style={{ marginTop: '10px' }}>Published {moment(post.createdAt).fromNow()}</Typography>
            </div>
        </Grid>
    );
}