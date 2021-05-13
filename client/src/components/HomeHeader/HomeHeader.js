import React from 'react';
import { Container, Typography, Divider, Grid, IconButton, Link } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';


const HomeHeader = ({ fetchPosts, searchKeyword, selectedTags }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleBack = () => {
        fetchPosts(0, "", []);
    }

    const goToRequest = () => {
        history.push('/request');
    }

    return(
        <div style={{ overflow: 'hidden'}}>
            <Container className={classes.container}>
                <Grid container alignItems={(selectedTags.length > 0 && searchKeyword.length > 0) ? "flex-start" : "center"}  style={ selectedTags.length > 0 && searchKeyword.length > 0 ? { marginBottom: '40px' } : { marginBottom: '20px' }}>
                    <IconButton size="medium" onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Grid item>
                        <Typography variant="h5" className={classes.title}>{searchKeyword.length > 0 ? searchKeyword : formatTags(selectedTags).join(", ")}</Typography>
                        {(selectedTags.length > 0 && searchKeyword.length > 0) &&
                            <Typography variant="caption" className={classes.title}>{formatTags(selectedTags).join(", ")}</Typography>
                        }
                    </Grid>
                </Grid>
                <Typography variant="caption" className={classes.requestPost}>Not getting your result? You can always <Link onClick={goToRequest} className={classes.requestLink}>request a post</Link> from all authors</Typography>
                <Divider className={classes.divider}/>
            </Container>
        </div>
    );

    function formatTags(tags) {
        return tags.map(tag => '#' + tag);
    }
}

export default HomeHeader;