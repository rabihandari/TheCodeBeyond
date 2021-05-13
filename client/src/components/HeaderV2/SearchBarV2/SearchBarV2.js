import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Divider, Grow } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';


const SearchBar = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleClear = () => {
        setKeyword('');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            history.push('/');
            props.fetchPosts(0, event.target.value, undefined);
        }
        setKeyword(event.target.value);
    }

    return(
            <Grow in>
                <Paper className={classes.root} onBlur={props.toggleSearch}>
                    <IconButton className={classes.iconButton} onClick={props.toggleSearch}>
                        <ArrowBack />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search..."
                        autoFocus
                        onChange={handleChange}
                        value={keyword}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton className={classes.iconButton} onClick={handleClear}>
                        <CloseIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                </Paper>

            </Grow>
    );

}

export default SearchBar;