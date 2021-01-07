import React from 'react';
import { Card, CardMedia, CardActionArea, Typography, CardContent, Grow } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const Post = ({post, cindex}) => {
    const classes = useStyles();

    return(
        <Grow in timeout={(cindex + 1) * 500}>
            <Card className={classes.card}>
                <CardActionArea>
                    {post.imageFile !== "" && <CardMedia className={classes.media} image={post.imageFile} title={post.title}/>}
                    <div className={classes.content}>
                        <CardContent>
                            <Typography variant='body2' color="textSecondary" component="p" gutterBottom className={classes.createdAt}>{moment(post.createdAt).fromNow()}</Typography>
                            <Typography variant='h5' color="textPrimary" className={classes.title}>{post.title}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>{post.description}</Typography>
                            <Typography variant="body2" component="p" className={classes.tags}>{formatTags(post.tags).join(", ")}</Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>

        </Grow>
    );

    function formatTags(tags) {
        return tags.map(tag => '#' + tag);
    }
}

export default Post;