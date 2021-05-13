import React from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import useStyles from './styles';

const PopularPost = ({post}) => {
    const classes = useStyles();
    const history = useHistory();

    const goToPost = () => {
        history.push(`/answer/${post._id}`)
    }


    return(
        <Grid container className={classes.container} onClick={goToPost}>
            <Grid item md={12}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center">
                            <Avatar className={classes.profilePicture} src={post.creator.profilePicture} alt={post.creator.name}>{post.creator.name.charAt(0)}</Avatar>
                            <Typography variant="caption" className={classes.postCreator}>{post.creator.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" className={classes.postTitle}>{post.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" className={classes.postDate}>{moment(post.createdAt).format('MMM YY')} · {post.tags.join(", ")}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PopularPost;