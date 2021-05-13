import React from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';

const PopularPost = ({post}) => {
    const classes = useStyles();
    const history = useHistory();
    const matches = useMediaQuery(useTheme().breakpoints.up('sm'));

    const goToPost = () => {
        history.push(`/answer/${post._id}`)
    }


    return(
        <Grid container className={classes.container} onClick={goToPost}>
            <Grid item md={12}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Avatar className={classes.profilePicture} src={post.creator.profilePicture} alt={post.creator.name}>{post.creator.name.charAt(0)}</Avatar>
                                    </Grid>
                                    <Grid item style={{ marginLeft: '10px' }}>
                                        <Typography variant="caption" className={classes.creatorName}>{post.creator.name}</Typography>
                                        <Typography variant="caption" className={classes.creatorEmail}>{post.creator.email}</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            {post.answers.length > 0 &&
                                <Grid item style={{ marginLeft: '30px' }}>
                                    <Grid container>
                                        <CheckIcon size="small" className={classes.checkIcon}/>
                                        {matches &&
                                            <Typography variant="body2" style={{ color: '#00c500', marginLeft: '5px' }}>Answered</Typography>
                                        }
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: '20px' }}>
                        <Typography variant="body2" className={classes.postTitle}>{post.title}</Typography>
                        <Typography variant="body2" className={classes.postDesc}>{post.description}</Typography>
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