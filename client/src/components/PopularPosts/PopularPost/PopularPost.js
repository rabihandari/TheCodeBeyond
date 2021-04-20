import React from 'react';
import { Typography, CardMedia, Grid, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import readingTime from 'reading-time';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';

const PopularPost = ({post}) => {
    const classes = useStyles();
    const history = useHistory();
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const goToPost = () => {
        history.push(`/${post._id}/${post.title}`)
    }


    return(
        <Grid container className={classes.container} onClick={goToPost}>
            <Grid item md={9}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center">
                            <Avatar variant="rounded" className={classes.profilePicture} src={post.profilePicture} alt={post.name}>{post.name.charAt(0)}</Avatar>
                            <Typography variant="caption" className={classes.postCreator}>{post.name} in {post.tags.join(",")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.postTitle}>{post.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" className={classes.postDate}>{moment(post.createdAt).format('MMM YY')} · {readingTime(post.body).text}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {matches &&
                <Grid item md={3}>
                    <CardMedia image={post.imageFile} alt={post.title} className={classes.postImage} />
                </Grid>
            }
        </Grid>
    );

    // return(
    //     <Grid container className={classes.container} onClick={goToPost}>
    //         <Grid container direction="row" alignItems="stretch">
    //             <Grid item xs={3} xl={3}>
    //                 {post.imageFile !== "" && <CardMedia image={post.imageFile} className={classes.media}></CardMedia>}
    //             </Grid>
    //             <Grid item className={classes.content} xs={9}  xl={9}>
    //                 <Grid container direction="column" justify="space-evenly" alignItems="flex-start" style={{ height: '100%' }}>
    //                     <Grid item>
    //                         <Typography component="p" className={classes.contentTitle} style={ hovered ? { color: 'blue' } : null }>{post.title}</Typography>
    //                     </Grid>
    //                     <Grid item>
    //                         <Typography component="p" className={classes.contentCreator}>By {post.name} on {moment(post.createdAt).format('LL')}</Typography>
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //         </Grid>
    //     </Grid>
    // );
}

export default PopularPost;