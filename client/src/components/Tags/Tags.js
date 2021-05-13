import React from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './styles';
import tags from '../../config/tags';

const Tags = (props) => {
    const classes = useStyles();

    const handleClick = (tag) => () => {
        if (props.selectedTags.includes(tag)){
            let newTags = props.selectedTags.filter((item) => tag !== item);
            props.setSelectedTags(newTags);
            props.fetchPosts(0, undefined, newTags);
        }else {
            let newTags = [...props.selectedTags, tag];
            props.setSelectedTags(newTags);
            props.fetchPosts(0, undefined, newTags);
        }
        props.setPage(1);
    };


    return(
        <div className={classes.container}>
            <Typography variant="body2" className={classes.title}>Filter by Tags</Typography>
            <Grid container direction="row" justify="center" className={classes.tagsContainer}>
                {tags.map((tag) => 
                    <Chip 
                        key={tag}
                        className={classes.tag} 
                        label={tag} 
                        clickable 
                        size="small"
                        color={getColor(tag)} 
                        onDelete={handleClick(tag)} 
                        onClick={handleClick(tag)} 
                        deleteIcon={getIcon(tag)}
                    />
                )}
            </Grid>
        </div>
    );

    function getIcon(tag){
        return props.selectedTags.includes(tag) ? <DoneIcon /> : <div style={{margin: '0px', width: '0px'}}/>
    }

    function getColor(tag){
        return props.selectedTags.includes(tag) ? "primary" : "default";
    }
}

export default Tags;