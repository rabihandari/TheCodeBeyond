import React, { useState } from 'react';
import { Grid, SwipeableDrawer, Typography, IconButton, Grow, Avatar, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';
import { useHistory } from 'react-router-dom';

import useStyles, { CustomIndeterminate } from './styles';
import Comment from './Comment/Comment';
import CloseIcon from '../../../images/icon-close.svg';
import { addComment } from '../../../api';

const Comments = ({ post, setPost, commentsOpen, closeComments, anchor }) => {
    const classes = useStyles();
    const history = useHistory();
    const [startedTyping, setStartedTyping] = useState(false);
    const [publishToMyProfile, setPublishToMyProfile] = useState(false);
    const [comment, setComment] = useState('');
    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const goToLogin = () => {
        history.push('/login');
    }

    const startTyping = () => {
        if (!currentUser) return;

        setStartedTyping(true);
    }

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = () => {
        if(comment.length === 0) return;

        setLoading(true);
        let commentData = {
            id: post._id,
            comment: comment,
            publishToProfile: publishToMyProfile
        };
        addComment(commentData).then((res) => {
            pushComment(res.data.comment);
            setComment('');
            setStartedTyping(false);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }
    
    const pushComment = (comment) => {
        let newComments = [...post.comments, comment];
        setPost({...post, comments: newComments});
    }

    const removeComment = (comment) => {
        let newComments = post.comments.filter(com => com._id !== comment._id);
        setPost({...post, comments: newComments});
    }

    return(
        <SwipeableDrawer anchor={anchor} open={commentsOpen} onClose={closeComments} onOpen={() => {}}>
            <div className={classes.drawerContainer}>
                <Grid container direction="row" className={classes.header} justify="space-between">
                    <Grid item md={8}>
                        <Typography variant="h6" className={classes.title}>Comments ({post.comments.length})</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Grid container direction="row-reverse">
                            <Grid item>
                                <IconButton size='small' onClick={closeComments}>
                                    <img src={CloseIcon} alt="Close" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item md={12} >
                        <CustomIndeterminate style={{ visibility: isLoading ? 'visible' : 'hidden' }}/>
                    </Grid>
                <Grid container className={classes.commentContainer}>
                    {!startedTyping ?
                        <input type="text" placeholder="What's on your mind?" disabled={!currentUser} autoFocus={false} onClick={startTyping} className={classes.commentInputDefault}/>
                    :
                        <Grow in={true}>
                            <div style={{ width: '100%',  }}>
                                <Grid container direction="row" alignItems="center">
                                    <Avatar className={classes.profilePicture} src={currentUser.result.profilePicture || currentUser.result.imageUrl} alt={currentUser.result.name}>{currentUser.result.name.charAt(0)}</Avatar>
                                    <Typography className={classes.userName} variant="body2">{currentUser.result.name}</Typography>
                                </Grid>
                                <TextareaAutosize className={classes.commentInput} type="text" placeholder="What's on your mind?" autoFocus={true} value={comment} onChange={handleChange} />
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={publishToMyProfile} onChange={() => setPublishToMyProfile(!publishToMyProfile)} name="Terms" color="primary" size="small" />
                                            }
                                            label={
                                                <Typography variant='h4' className={classes.pulishBox}>Publish to my profile too</Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button disabled={comment.length === 0} className={classes.button} variant="contained" color="primary" size='medium' onClick={handleSubmit}>Comment</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grow>
                    }
                    {(!currentUser) &&
                        <Button variant="text" size="small" color="primary" className={classes.loginButton} onClick={goToLogin}>Login to share your thoughts</Button>
                    }
                </Grid>
                
                <div>
                    {post.comments.length > 0 ?
                        post.comments.map(cmnt => (
                            <Comment key={cmnt.createdAt} post={post} setPost={setPost} comment={cmnt} setLoading={setLoading} removeComment={removeComment} />
                        ))
                    :(!isLoading &&
                        <Typography variant='body1' style={{ textAlign: 'center', padding: '30px' }}>No Comments Yet!</Typography>
                    )
                    }
                </div>
                
            </div>
        </SwipeableDrawer>
    );
}

export default Comments;