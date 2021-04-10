import React , { useState } from 'react';
import { Typography, CardMedia, CardActionArea, Grid } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const PopularPost = ({post}) => {
    const classes = useStyles();
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    return(
        <Grid container className={classes.container}>
            <CardActionArea onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <Grid container direction="row" alignItems="stretch">
                    <Grid item xs={3} xl={3}>
                        {post.imageFile !== "" && <CardMedia image={post.imageFile} className={classes.media}></CardMedia>}
                    </Grid>
                    <Grid item className={classes.content} xs={9}  xl={9}>
                        <Grid container direction="column" justify="space-evenly" alignItems="flex-start" style={{ height: '100%' }}>
                            <Grid item>
                                <Typography component="p" className={classes.contentTitle} style={ hovered ? { color: 'blue' } : null }>{post.title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography component="p" className={classes.contentCreator}>By {post.name} on {moment(post.createdAt).format('LL')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActionArea>

        </Grid>
    );
}

export default PopularPost;