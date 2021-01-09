import React from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './styles';

const Tags = (props) => {
    const classes = useStyles();

    const tags = [
        'Swift',
        'SwiftUI',
        'XCode',
        'Django',
        'Python',
        'Node.js',
        'Express',
        'Android',
        'Java',
        'MongoDB',
        'Angular', 
        'jQuery', 
        'Polymer', 
        'React.js', 
        'Vue.js'
    ];

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
            <Typography variant="h4" className={classes.title}>Tags</Typography>
            <Grid container direction="row" justify="center" className={classes.tagsContainer}>
                {tags.map((tag) => 
                    <Chip 
                        key={tag}
                        className={classes.tag} 
                        label={tag} 
                        clickable 
                        color={getColor(tag)} 
                        onDelete={handleClick(tag)} 
                        onClick={handleClick(tag)} 
                        deleteIcon={getIcon(tag)}
                        variant="outlined" 
                    />
                )}
            </Grid>
        </div>
    );

    function getIcon(tag){
        return props.selectedTags.includes(tag) ? <DoneIcon /> : <div style={{margin: '0px', width: '0px'}}/>
    }

    function getColor(tag){
        return props.selectedTags.includes(tag) ? "primary" : "secondary";
    }
}

export default Tags;