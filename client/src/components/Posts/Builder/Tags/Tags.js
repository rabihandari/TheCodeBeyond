import React, { useState, useRef } from 'react';
import { Chip, Grid, Button, Popper, Grow, MenuList, MenuItem, Paper, ClickAwayListener } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import useStyles from './styles';

const Tags = ({postData, setPostData}) => {
    const classes = useStyles();
    const [tagList, setTagList] = useState([
        'Swift',
        'SwiftUI',
        'XCode',
        'Django',
        'Python',
        'Node',
        'Express',
        'Android Studio',
        'Java',
        'MongoDB'
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef();

    const openList = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeList = () => {
        setAnchorEl(null);
    }

    const handleSelect = (tagToAdd) => () => {
        setPostData({...postData, tags: [...postData.tags, tagToAdd]});
        setTagList(tagList.filter((tag) => tag !== tagToAdd));
    }

    const handleDelete = (tagToDelete) => () => {
        setPostData({...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete)});
        setTagList([...tagList, tagToDelete]);
    };

    const open = Boolean(anchorEl);

    return (
        <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
                <ul className={classes.chipsContainer}>
                    {postData.tags.map((tag) => 
                        <li key={tag}>
                            <Grow in >
                                <Chip label={tag} onDelete={handleDelete(tag)} variant="outlined" className={classes.chip}/>
                            </Grow>
                        </li>
                    )}
                </ul>
            </Grid>
            
            <Grid item>
                <ClickAwayListener onClickAway={closeList}>
                    <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={openList} ref={anchorRef} startIcon={<Add />} >Add Tag</Button>
                </ClickAwayListener>
                <Popper open={open} transition disablePortal anchorEl={anchorRef.current}>
                    <Grow in style={{ transformOrigin: '0 0 0'}}>
                        <Paper className={classes.list}>
                            <MenuList>
                                {tagList.map((tag) => <MenuItem key={tag} className={classes.listItem} onClick={handleSelect(tag)}>{tag}</MenuItem>)}
                            </MenuList>
                        </Paper>
                    </Grow>
                </Popper>
            </Grid>
        </Grid>
    );
}

export default Tags;