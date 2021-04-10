import React,  { useState, useRef } from 'react';
import {  Typography, Avatar, Grid, Grow, Tooltip, Button, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import MoreVert from '@material-ui/icons/MoreVert';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';

import useStyles from './styles';
import CommentIcon from '../../../../images/icon-comment.svg';
import { addReply, deleteComment as deleteCom, editComment as editCom, reportComment as reportCom} from '../../../../api';
import Reply from './Reply/Reply';
import DropDownList from '../../../../components/DropDownList/DropDownList';
import Report from '../../../../components/Report/Report';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Comment = ({ post, setPost, comment, removeComment, setLoading }) => {
    const classes = useStyles();
    const moreRef = useRef(null);
    const history = useHistory();
    const [moreOpen, setMoreOpen] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [newComment, setNewComment] = useState(comment.comment);
    const [reply, setReply] = useState('');
    const [replyOpen, setReplyOpen] = useState(false);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    
    const currentUser = JSON.parse(localStorage.getItem('profile'));


    const handleReplyToggle = () => {
        if (!currentUser) return;

        setRepliesOpen(false);
        setReplyOpen(!replyOpen);
    }

    const handleRepliesToggle = () => {
        setReplyOpen(false);
        setRepliesOpen(!repliesOpen);
    }

    const handleChange = (e) => {
        setReply(e.target.value);
    }

    const handleSubmit = () => {
        if (reply.length === 0) return;

        setLoading(true);
        let replyData = {
            postId: post._id,
            commentId: comment._id,
            reply: reply
        };
        addReply(replyData).then((res) => {
            pushReply(comment, res.data.reply);
            setReplyOpen(false);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const deleteComment = () => {
        if(!currentUser) return;
        
        setLoading(true);
        deleteCom({ postId: post._id, commentId: comment._id }).then(() => {
            removeComment(comment);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const toggleEdit = () => {
        setReplyOpen(false);
        setEditingMode(!editingMode);
    }

    const editComment = () => {
        if(comment.length === 0) return;

        setLoading(true);
        editCom({ postId: post._id, commentId: comment._id, newComment: newComment }).then((res) => {
            comment.comment = newComment;
            setEditingMode(false);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const reportComment = (data) => {
        setLoading(true);
        reportCom({ ...data, postId: post._id, commentId: comment._id }).then((res) => {
            setAlertSeverity('success');
            setAlertMessage(res.data.message);
            setAlertOpen(true);
            setLoading(false);
        }).catch(error => {
            setAlertSeverity('error');
            setAlertMessage(error.response.data.message);
            setAlertOpen(true);
            setLoading(false);
        });
    }

    const openReport = () => {
        if (!currentUser) {
            history.push('/login');
            return;
        }
        setReportOpen(true);
    }

    const closeReport = () => {
        setReportOpen(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false);
    };

    const pushReply = (comment, reply) => {
        let newReplies = [...comment.replies, reply]; 
        setPost({...post, comments: post.comments.map(com => com._id === comment._id ? {...com, replies: newReplies} : com)});
    }

    const removeReply = (comment, reply) => {
        let newReplies =  comment.replies.filter(rep => rep._id !== reply._id);
        setPost({...post, comments: post.comments.map(com => com._id === comment._id ? {...com, replies: newReplies} : com)});
    }
    
    const moreList = [];
    if (comment.creator === currentUser?.result?._id || comment.creator === currentUser?.result?.googleId + 'abc'){
        moreList.push(<Typography key="Edit this comment" className={classes.menuItemText} variant='caption' onClick={toggleEdit}>Edit this comment</Typography>,);
        moreList.push(<Typography key="Delete this comment" className={classes.menuItemText} variant='caption' onClick={deleteComment}>Delete</Typography>,);
    }else{
        moreList.push(<Typography key="Report this comment" className={classes.menuItemText} variant='caption' onClick={openReport}>Report this comment</Typography>,);
    }
    
    return(
        <div>
            <Grow in>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Grid container className={classes.profileSection} justify="space-between">
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <Avatar className={classes.profilePicture} src={comment.profilePicture} alt={comment.name}>{comment.name.charAt(0)}</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption" className={classes.userName}>{comment.name}</Typography>
                                        <Typography variant="caption" className={classes.createdAt}>{moment(comment.createdAt).format('LL')}</Typography>
                                    </Grid>   
                                    <Grid item>
                                        {comment.creator === post.creator &&
                                            <Typography variant="caption" className={classes.specialPerson} style={{ backgroundColor: 'rgb(24 148 20)' }}>AUTHOR</Typography>
                                        }
                                        <Typography variant="caption">&nbsp;</Typography>
                                    </Grid>   
                                    <Grid item>
                                        {(comment.creator === currentUser?.result?._id || comment.creator === currentUser?.result?.googleId + 'abc') &&
                                            <Typography variant="caption" className={classes.specialPerson} style={{ backgroundColor: 'grey' }}>YOU</Typography>
                                        }
                                    </Grid> 
                                </Grid> 
                            </Grid>  
                            <Grid item>
                                <IconButton size="small" ref={moreRef} onClick={() => setMoreOpen(prevOpen => !prevOpen)}>
                                    <Tooltip title="More">
                                        <MoreVert />
                                    </Tooltip>
                                </IconButton>
                                {moreOpen &&
                                    <DropDownList items={moreList} anchorRef={moreRef} open={moreOpen} setOpen={setMoreOpen}/>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!editingMode ? 
                            <Typography variant="body2" className={classes.commentText}>{comment.comment}</Typography>
                        :
                            <TextareaAutosize className={classes.commentInput} type="text" autoFocus={true} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        }
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Grid container direction="row-reverse" justify="space-between" alignItems="center" className={classes.footerContainer}>
                            {editingMode ? 
                                <Grid item>
                                    <Grid container direction='row' alignItems="center">
                                        <Typography className={classes.cancelButton} variant="caption" onClick={() => setEditingMode(false)}>Cancel</Typography>
                                        <Button className={classes.replyButtons} variant="contained" color="primary" size="small" disabled={newComment.length === 0} onClick={editComment}>Submit</Button>
                                    </Grid>
                                </Grid>
                            :
                                <Typography className={classes.replyButton} variant="caption" onClick={handleReplyToggle} style={ currentUser ? { cursor: 'pointer' } : { color: 'grey' } }>Reply</Typography>
                            }
                            {comment.replies.length > 0 && 
                                <Grid item>
                                    <Grid container className={classes.viewReply} onClick={handleRepliesToggle}>
                                        <Tooltip title="Comment">
                                            <img src={CommentIcon} alt="Comment" height="20" width="20"/>
                                        </Tooltip>
                                        <Typography style={{ marginLeft: '10px' }} variant="caption">
                                            {!repliesOpen ? 
                                                `${comment.replies.length} ` + (comment.replies > 1 ? "replies" : 'reply')
                                            :
                                                "Hide Replies"
                                            }
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    {replyOpen &&
                        <Grid item xs={12}>
                            <TextareaAutosize placeholder="Your reply goes here" onChange={handleChange} className={classes.commentInput} autoFocus={true}/>
                            <Grid container direction='row-reverse'>
                                <Grid item>
                                    <Button className={classes.replyButtons} style={{ marginTop: '10px' }} variant="text" size="small" onClick={() => setReplyOpen(false)}>Cancel</Button>
                                    <Button className={classes.replyButtons} style={{ marginTop: '10px' }} variant="contained" color="primary" size="small" disabled={reply.length === 0} onClick={handleSubmit}>Reply</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    {(repliesOpen && comment.replies.length > 0) &&
                        <Grid item xs={12}>
                            {comment.replies.map(rep => (
                                <Reply 
                                    key={rep.createdAt} 
                                    post={post}
                                    comment={comment} 
                                    reply={rep} 
                                    setLoading={setLoading} 
                                    removeReply={removeReply}
                                />
                            ))}
                        </Grid>
                    }
                </Grid>
            </Grow>
            {reportOpen &&
                <Report whatToReport='Comment' closeReport={closeReport} callback={reportComment}/>
            }
            {alertOpen && 
                <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity={alertSeverity}>
                    {alertMessage}
                    </Alert>
              </Snackbar>
            }
        </div>
    );
}

export default Comment;
