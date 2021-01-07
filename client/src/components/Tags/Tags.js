import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Chip, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import useStyles from './styles';
import { getPosts } from '../../actions/posts';

const Tags = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);

    const tags = [
        'Swift',
        'SwiftUI',
        'XCode',
        'Django',
        'Python',
        'Node.js',
        'Express',
        'Android Studio',
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
            props.setSelectedTags(props.selectedTags.filter((item) => tag !== item));
        }else {
            props.setSelectedTags([...props.selectedTags, tag]);
        }
        props.setPage(1);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        dispatch(getPosts(0, {"tags": props.selectedTags} ));
    }, [props.selectedTags, dispatch]);


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