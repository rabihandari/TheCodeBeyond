import React, { useRef, useState } from 'react';
import {  Typography, Avatar, Grid, IconButton, Tooltip, ListItemIcon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Facebook, Twitter, LinkedIn } from '@material-ui/icons';
import moment from 'moment';
import readingTime from 'reading-time';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

import useStyles from './styles';
import SaveIcon from '../../../images/icon-save.svg';
import SavedIcon from '../../../images/icon-saved.svg';
import ShareIcon from '../../../images/icon-share.svg';
import DropDownList from '../../../components/DropDownList/DropDownList';
import Confirm from '../../../components/Confirm/Confirm';

const Header = ({ user, post, saved, blocked, savePost, openReport, openReport2, openConfirmation, deletePost }) => {
    const classes = useStyles();
    const history = useHistory();
    const anchorRef = useRef(null);
    const anchorRef2 = useRef(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));

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

    return(
        <Grid container alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h3" className={classes.mdTitle}>{post.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container className={classes.profileSection} alignItems="center">
                    <Grid item>
                        <Avatar className={classes.profilePicture} src={user.profilePicture} alt={user.name}>{user.name.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" className={classes.userName}>{user.name}</Typography>
                        <Typography variant="caption" className={classes.createdAt}>{moment(post.createdAt).format('LL')} &#9679; {readingTime(post.body).text}</Typography>
                    </Grid>   
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container className={classes.profileSection} alignItems="center" direction={matches ? "row-reverse" : "row"}>
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
            
            <Grid item md={12}>
                <Typography variant="body1" className={classes.mdDescription}>{post.description}</Typography>
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
