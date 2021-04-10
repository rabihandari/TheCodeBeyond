import React, { useRef, useEffect } from 'react';
import {  Popper, Grow, ClickAwayListener, Paper, MenuList, MenuItem } from '@material-ui/core';

import useStyles from './styles';


const Header = ({ items, anchorRef, open, setOpen }) => {
    const classes = useStyles();


    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);

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
    }, [open, anchorRef]);


    return(
        <Popper className={classes.dropDownListContainer} open={open} anchorEl={anchorRef.current} disablePortal={true} transition>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <div className={classes.dropDownList}>
                                {items.map(item => (
                                    <MenuItem key={item.key} className={classes.menuItem} onClick={handleClose}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default Header;
