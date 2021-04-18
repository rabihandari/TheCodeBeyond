import React, { useState, useEffect } from 'react';
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
    const [titles, setTitles] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (event, newValue) => {
        if (newValue === null) return;
        props.fetchPosts(0, newValue, undefined);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value === ""){
            props.fetchPosts(0, "", undefined);
        }
    }

    useEffect(() => {
        fetchTitles().then(({ data }) => {
            setTitles(data.map(item => item.title));
        });
    }, []);

    return(
        <Grid container direction="row" justify="flex-end" alignItems="center">
            <img className={classes.searchIcon} src={searchIcon} alt="search" onClick={() => setExpanded(!expanded)}/>
            <Autocomplete 
                classes={{
                    option: classes.option,
                    paper: classes.listBackground,
                    noOptions: classes.noOption,
                }}
                freeSolo
                onChange={handleChange}
                noOptionsText="No results"
                options={titles}
                blurOnSelect={true}
                filterOptions={filterOptions}
                renderInput={(params) => (
                    <div className={classes.searchHolder} ref={params.InputProps.ref} >
                        <InputBase 
                            className={classes.searchInput} 
                            placeholder="Search" 
                            inputProps={params.inputProps}
                            onKeyDown={handleKeyDown}
                            autoFocus={true}
                            style={{ width: (expanded ? '250px' : '0px') }} 
                        />
                    </div>
                )}
            />
        </Grid>
    );

}

export default SearchBarV2;