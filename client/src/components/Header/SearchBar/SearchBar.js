import React, { useState, useEffect } from 'react';
import { Grid, InputBase } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

import useStyles from './styles';
import { fetchTitles } from '../../../api/index';

const filterOptions = createFilterOptions({
    limit: 5,
  });

const SearchBar = (props) => {
    const classes = useStyles();
    const [titles, setTitles] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (event, newValue) => {
        if (newValue === null) return;
        props.fetchPosts(0, newValue, undefined);
    }

    useEffect(() => {
        fetchTitles().then(({ data }) => {
            setTitles(data.map(item => item.title));
        });
    }, []);

    return(
        <Grid container direction="row" justify="flex-end" alignItems="center">
            <Autocomplete 
                classes={{
                    option: classes.option,
                    paper: classes.listBackground,
                    noOptions: classes.noOption,
                }}
                freeSolo
                onFocus={() => {setExpanded(true)}}
                onBlur={() => {setExpanded(false)}}
                onChange={handleChange}
                noOptionsText="No results"
                options={titles}
                filterOptions={filterOptions}
                renderInput={(params) => (
                    <div className={classes.searchHolder} ref={params.InputProps.ref}>
                        <InputBase className={classes.searchInputs} placeholder="Search" inputProps={params.inputProps} autoFocus style={{ width: (expanded ? '250px' : '200px') }} />
                    </div>
                )}
            />
        </Grid>
    );

}

export default SearchBar;