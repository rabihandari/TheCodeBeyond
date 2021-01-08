import React, { useState } from 'react';
import { Chip, Grid, Grow } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import useStyles from './styles';

const Tags = ({postData, setPostData}) => {
    const classes = useStyles();
    const [listOpened, setListOpened] = useState(false);
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
        'MongoDB', 
        'React.js', 
        'Vue.js'
    ]);

    const handleSelect = (tagToAdd) => () => {
        setPostData({...postData, tags: [...postData.tags, tagToAdd]});
        setTagList(tagList.filter((tag) => tag !== tagToAdd));
        setListOpened(false);
    }

    const handleDelete = (tagToDelete) => () => {
        setPostData({...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete)});
        setTagList([...tagList, tagToDelete]);
    };

    const toggleList = () => {
        setListOpened(!listOpened);
    }

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
                    <Chip label="Add Tag" deleteIcon={<Add className={classes.addIcon} style={ listOpened ? { transform: 'rotate(45deg)' } : {}}/>} onDelete={toggleList} onClick={toggleList} variant="outlined" color="primary" className={classes.chip}/>
                    {listOpened && tagList.map((tag) => 
                        <li key={tag}>
                            <Grow in >
                                <Chip label={tag} deleteIcon={<Add/>} onDelete={handleSelect(tag)} onClick={handleSelect(tag)} variant="outlined" className={classes.chip}/>
                            </Grow>
                        </li>
                    )}
                </ul>
            </Grid>
        </Grid>
    );
}

export default Tags;