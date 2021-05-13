import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Popper, Grow, ClickAwayListener, Paper, MenuList, MenuItem, Grid, Typography, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { logout } from '../../../actions/auth';

const Profile = ({ name, email, imageUrl }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (action) => (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);

        switch (action) {
            case "Create Post":
                history.push('/createPost');
                break;
            case "Request Post":
                history.push('/request');
                break;
            case "View Posts":
                history.push('/my-posts');
                break;
            case "Settings":
                history.push('/settings');
                break;
            case "Logout":
                dispatch(logout());
                history.push('/');
                    break;
            default:
                break;
        }


    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return(
        <div>
            <Avatar ref={anchorRef} onClick={handleToggle} className={classes.profilePicture} src={imageUrl} alt={name}>{name.charAt(0)}</Avatar>
            <Popper className={classes.dropDownListContainer} open={open} anchorEl={anchorRef.current} role={undefined} transition>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose()}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <Grid container direction="row" alignItems="center" spacing={2} className={classes.dropDownHeader}>
                                <Grid item>
                                    <Avatar onClick={handleToggle} className={classes.headerPicture} src={imageUrl} alt={name}>{name.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" >{name}</Typography>
                                    <Typography variant="caption" style={{ fontFamily: 'MetropolisRegular' }}>{email}</Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                            <div className={classes.dropDownList}>
                                <MenuItem className={classes.menuItem} onClick={handleClose('Create Post')}>Create a post</MenuItem>
                                <MenuItem className={classes.menuItem} onClick={handleClose('Request Post')}>Request a post</MenuItem>
                                <MenuItem className={classes.menuItem} onClick={handleClose('View Posts')}>My posts</MenuItem>
                                <MenuItem className={classes.menuItem} onClick={handleClose('Settings')}>Settings</MenuItem>
                                <MenuItem className={classes.menuItem} onClick={handleClose('Logout')}>Logout</MenuItem>
                            </div>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
}

export default Profile;