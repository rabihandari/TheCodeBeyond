import React, {useRef, useState} from 'react';
import { Grid, Typography, Avatar, Tooltip, IconButton, Button, Snackbar } from '@material-ui/core'; 
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import MoreVert from '@material-ui/icons/MoreVert';
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';

import useStyles from './styles';
import DropDownList from '../../../../../components/DropDownList/DropDownList';
import { deleteReply as deleteRep, editReply as editRep, reportReply as reportRep } from '../../../../../api';
import Report from '../../../../../components/Report/Report';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Reply = ({ post, comment, reply, setLoading, removeReply }) => {
    const classes = useStyles();
    const moreRef = useRef(null);
    const history = useHistory();
    const [newReply, setNewReply] = useState(reply.reply);
    const [editingMode, setEditingMode] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const deleteReply = () => {
        if(!currentUser) return;
        
        setLoading(true);
        deleteRep({ postId: post._id, commentId: comment._id, replyId: reply._id }).then(() => {
            removeReply(comment, reply);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });

    }

    const toggleEdit = () => {
        setEditingMode(!editingMode);
    }

    const editReply = () => {
        if(comment.length === 0) return;

        setLoading(true);
        editRep({ postId: post._id, commentId: comment._id, replyId: reply._id, newReply: newReply }).then((res) => {
            reply.reply = newReply;
            setEditingMode(false);
            setLoading(false);
        }).catch(error => {
            console.log(error);
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

    const reportReply = (data) => {
        setLoading(true);
        reportRep({ ...data, postId: post._id, commentId: comment._id, replyId: reply._id }).then((res) => {
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

    const moreList = [];
    if (reply.creator === currentUser?.result?._id || reply.creator === currentUser?.result?.googleId + 'abc'){
        moreList.push(<Typography key="Edit this comment" className={classes.menuItemText} variant='caption' onClick={toggleEdit}>Edit this comment</Typography>,);
        moreList.push(<Typography name="Delete this reply" className={classes.menuItemText} variant='caption' onClick={deleteReply}>Delete</Typography>,);
    }else{
        moreList.push(<Typography name="Report this reply" className={classes.menuItemText} variant='caption' onClick={openReport}>Report this reply</Typography>,);
    }

    return(
        <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Grid container className={classes.profileSection} justify="space-between">
                    <Grid item>
                            <Grid container>
                                <Grid item>
                                    <Avatar className={classes.profilePicture} src={reply.profilePicture} alt={reply.name}>{reply.name.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" className={classes.userName}>{reply.name}</Typography>
                                    <Typography variant="caption" className={classes.createdAt}>{moment(reply.createdAt).format('LL')}</Typography>
                                </Grid>   
                                <Grid item>
                                    {reply.creator === post.creator &&
                                        <Typography variant="caption" className={classes.specialPerson} style={{ backgroundColor: 'rgb(24 148 20)' }}>AUTHOR</Typography>
                                    }
                                    <Typography variant="caption">&nbsp;</Typography>
                                </Grid>   
                                <Grid item>
                                    {(reply.creator === currentUser?.result?._id || reply.creator === currentUser?.result?.googleId + 'abc') &&
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
                        <Typography variant="body2" className={classes.commentText}>{reply.reply}</Typography>
                    :
                        <TextareaAutosize className={classes.commentInput} type="text" autoFocus={true} value={newReply} onChange={(e) => setNewReply(e.target.value)} />
                    }
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row-reverse" justify="space-between" alignItems="center" className={classes.footerContainer}>
                        {editingMode &&
                            <Grid item>
                                <Grid container direction='row' alignItems="center">
                                    <Typography className={classes.cancelButton} variant="caption" onClick={() => setEditingMode(false)}>Cancel</Typography>
                                    <Button className={classes.replyButtons} variant="contained" color="primary" size="small" disabled={newReply.length === 0} onClick={editReply}>Submit</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                {reportOpen &&
                    <Report whatToReport='Reply' closeReport={closeReport} callback={reportReply}/>
                }
                {alertOpen && 
                    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity={alertSeverity}>
                            {alertMessage}
                        </Alert>
                </Snackbar>
                }
            </Grid>
    );

};

export default Reply;