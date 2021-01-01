import React from 'react';
import { Card, CardMedia, CardActionArea, Typography, CardContent } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const Post = ({post}) => {
    const classes = useStyles();

    console.log(post);
    return(
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={post.imageFile} title={post.title}/>
                <div className={classes.content}>
                    <CardContent>
                        <Typography variant='body2' color="textSecondary" component="p" gutterBottom className={classes.createdAt}>{moment(post.createdAt).fromNow()}</Typography>
                        <Typography variant='h5' color="textPrimary" className={classes.title}>{post.title}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>{post.description}</Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
}

export default Post;