import React, { useRef, useState } from 'react';
import {  Typography, Grid, IconButton, Tooltip, ListItemIcon } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

import useStyles from './styles';
import SaveIcon from '../../../images/icon-save.svg';
import ShareIcon from '../../../images/icon-share.svg';
import CommentIcon from '../../../images/icon-comment.svg';
import DropDownList from '../../../components/DropDownList/DropDownList';
import { likePost as sendLike } from '../../../api';

const Header = ({ post, openComments }) => {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory();
    const anchorRef = useRef(null);
    const anchorRef2 = useRef(null);
    const [likes, setLikes] = useState(post.likes);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("profile"));
    
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

    const moreList = [
        <Typography key="Dismiss this post" className={classes.menuItemText} variant='body2'>Dismiss this post</Typography>,
        <Typography key="Report this post" className={classes.menuItemText} variant='body2'>Report this post</Typography>,
        <Typography key="Report this author" className={classes.menuItemText} variant='body2'>Report this author</Typography>,
        <Typography key="Block this author" className={classes.menuItemText} variant='body2'>Block this author</Typography>
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
                        <IconButton size="small">
                            <Tooltip title="Save">
                                <img src={SaveIcon} alt="Save"/>
                            </Tooltip>
                        </IconButton>
                        <IconButton size="small" ref={anchorRef} onClick={() => setOpen((prevOpen) => !prevOpen)}>
                            <MoreHorizIcon style={{ color: 'black' }}/>
                        </IconButton>
                        {open &&
                            <DropDownList items={moreList} open={open} setOpen={setOpen} anchorRef={anchorRef}/>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Header;
