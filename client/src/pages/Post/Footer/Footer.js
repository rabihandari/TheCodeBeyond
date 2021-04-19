import React, { useRef, useState } from 'react';
import {  Typography, Grid, IconButton, Tooltip, ListItemIcon, Chip } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

import useStyles from './styles';
import SaveIcon from '../../../images/icon-save.svg';
import SavedIcon from '../../../images/icon-saved.svg';
import ShareIcon from '../../../images/icon-share.svg';
import CommentIcon from '../../../images/icon-comment.svg';
import DropDownList from '../../../components/DropDownList/DropDownList';
import Confirm from '../../../components/Confirm/Confirm';
import { likePost as sendLike } from '../../../api';

const Header = ({ post, openComments, saved, blocked, savePost, openReport, openReport2, openConfirmation, deletePost }) => {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const anchorRef = useRef(null);
    const anchorRef2 = useRef(null);
    const [likes, setLikes] = useState(post.likes);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("profile"));
    
    const editPost = () => {
        history.push(`/edit/${post._id}`);
    }

    const shareList = [
        <div key="Facebook" className={classes.menuItemContainer}>
            <ListItemIcon className={classes.socialMediaIcon}>
                <Facebook/>
            </ListItemIcon>
            <FacebookShareButton className={classes.socialMediaButton} url={window.location.href} children={
                <Typography className={classes.menuItemText} variant='body2'>Facebook</Typography>
            }/>
        </div>,
        <div key="Twitter" className={classes.menuItemContainer}>
            <ListItemIcon className={classes.socialMediaIcon}>
                <Twitter/>
            </ListItemIcon>
            <TwitterShareButton className={classes.socialMediaButton} url={window.location.href} children={
                <Typography className={classes.menuItemText} variant='body2'>Twitter</Typography>
            }/>
        </div>,
        <div key="LinkedIn" className={classes.menuItemContainer}>
            <ListItemIcon className={classes.socialMediaIcon}>
                <LinkedIn/>
            </ListItemIcon>
            <LinkedinShareButton className={classes.socialMediaButton} url={window.location.href} children={
                <Typography className={classes.menuItemText} variant='body2'>LinkedIn</Typography>
            }/>
        </div>,
    ];

    const likePost = () => {
        // Unlike...
        if(!currentUser){
            history.push('/login');
            return;
        }
        
        if(likes.includes(currentUser.result._id)){
            setLikes(likes.filter(like => like !== currentUser.result._id));
        }else if(likes.includes(currentUser.result.googleId + "abc")){
            setLikes(likes.filter(like => like !== currentUser.result.googleId + "abc"));
        }else{
            setLikes([...likes, currentUser.result._id])
        }
        sendLike({ id: params.id }).catch(error => {
            console.log(error.response.data.message);
        });
    }


    return(
        <Grid container alignItems="center">
            <Grid item xs={6} sm={6}>
                <Grid container className={classes.sideSection} alignItems="center"> 
                    <Grid item>
                        <IconButton size="medium" onClick={likePost}>
                            <Tooltip title="Like">
                                {(likes.includes(currentUser?.result?._id) || likes.includes(currentUser?.result?.googleId + "abc")) ? <FavoriteIcon style={{ color: 'red' }}/> : <FavoriteBorderIcon />}
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.count}>{likes.length}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="medium" onClick={openComments}>
                            <Tooltip title="Comment">
                                <img src={CommentIcon} alt="Comment" height="20" width="20"/>
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.count}>{post.comments.length}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Grid container className={classes.sideSection} alignItems="center" direction="row-reverse">
                    <Grid item >
                        <IconButton size="small" onClick={() => setOpen2((prevOpen) => !prevOpen)}  ref={anchorRef2}>
                            <Tooltip title="Share">
                                <img src={ShareIcon} alt="Share"/>
                            </Tooltip>
                            
                        </IconButton>
                        {open2 &&
                            <DropDownList items={shareList} open={open2} setOpen={setOpen2} anchorRef={anchorRef2}/>
                        }
                        <IconButton size="small" onClick={() => { savePost() }}>
                            <Tooltip title="Save">
                                {saved ? 
                                    <img src={SavedIcon} alt="Save"/>
                                :
                                    <img src={SaveIcon} alt="Save"/>
                                }
                            </Tooltip>
                        </IconButton>
                        <IconButton size="small" ref={anchorRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
                            <MoreHorizIcon style={{ color: 'black' }}/>
                        </IconButton>
                        {open &&
                            <DropDownList items={getList()} open={open} setOpen={setOpen} anchorRef={anchorRef}/>
                        }
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
                <Grid container direction="row" className={classes.tagsContainer} spacing={2}>
                    {post.tags.map((tag) => 
                        <Grid item key={tag}>
                            <Chip 
                                className={classes.tag} 
                                label={tag} 
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>

            {deleteConfirmation &&
                <Confirm 
                    action="Delete"
                    title="Are you sure you want to delete your post"
                    description="Are you sure you want to delete this post. You cannot undo the deletion after you hit the delete button"
                    close={() => {setDeleteConfirmation(false)}}
                    callback={deletePost}
                />
            }
        </Grid>
    );


    function getList() {
        if(currentUser && (currentUser?.result?._id === post.creator || currentUser?.result?.googleId + 'abc' === post.creator) ){
            return [
                <Typography key="Edit this post" className={classes.menuItemText} variant='body2' onClick={editPost}>Edit this post</Typography>,
                <Typography key="Delete this post" className={classes.menuItemText} variant='body2' onClick={() => setDeleteConfirmation(true)}>Delete this post</Typography>,
            ];
        }else {
            return [
                <Typography key="Dismiss this post" className={classes.menuItemText} variant='body2'>Dismiss this post</Typography>,
                <Typography key="Report this post" className={classes.menuItemText} variant='body2' onClick={openReport}>Report this post</Typography>,
                <Typography key="Report this author" className={classes.menuItemText} variant='body2' onClick={openReport2}>Report this author</Typography>,
                <Typography key={blocked ? "Block this author - disabled" : "Block this author" } className={classes.menuItemText} variant='body2' onClick={openConfirmation}>Block this author</Typography>
            ];
        }
    
    }


}

export default Header;


