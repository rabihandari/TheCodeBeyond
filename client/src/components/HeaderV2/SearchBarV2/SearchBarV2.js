import React, { useState, useEffect, useRef } from 'react';
import { Grid, InputBase } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

import useStyles from './styles';
import { fetchTitles } from '../../../api/index';
import searchIcon from '../../../images/icon-search.svg';

const filterOptions = createFilterOptions({
    limit: 5,
  });

const SearchBarV2 = (props) => {
    const classes = useStyles();
    const searchInput = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [titles, setTitles] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e, newValue) => {
        if (newValue === null) return;
        console.log("Clicked 1");
        props.fetchPosts(0, newValue, undefined);
        setKeyword(keyword);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            props.fetchPosts(0, event.target.value, undefined);
        }
        setKeyword(event.target.value);
    }

    const toggleSearchBar = () => {
        if(searchInput){
            !expanded ? searchInput.current.focus() : searchInput.current.blur();
        }
        setExpanded(!expanded)
    }

    useEffect(() => {
        fetchTitles().then(({ data }) => {
            setTitles(data.map(item => item.title));
        });
    }, []);

    return(
        <Grid container direction="row" justify="flex-end" alignItems="center" onBlur={() => {setExpanded(false)}} >
            <img className={classes.searchIcon} src={searchIcon} alt="search" onClick={toggleSearchBar}/>
            <Autocomplete 
                classes={{
                    option: classes.option,
                    paper: classes.listBackground,
                    noOptions: classes.noOption,
                }}
                freeSolo
                onChange={handleChange}
                options={titles}
                selectOnFocus={true}
                filterOptions={filterOptions}
                renderInput={(params) => (
                    <div className={classes.searchHolder} ref={params.InputProps.ref} >
                        <InputBase 
                            className={classes.searchInput} 
                            inputRef={searchInput}
                            placeholder="Search" 
                            inputProps={params.inputProps}
                            value={keyword}
                            onKeyDown={handleKeyDown}
                            style={{ width: (expanded ? '250px' : '0px') }} 
                        />
                    </div>
                )}
            />
        </Grid>
    );

}

export default SearchBarV2;