import React from 'react';
import useStyles from './styles';
import { Grid, Typography, Divider, List, ListItem } from '@material-ui/core';

const Social = () => {
    const classes = useStyles();

    return(
        <Grid container direction="column" className={classes.container}>
            <Typography variant="h4" className={classes.title}>Social</Typography>
            <Divider variant="fullWidth" style={{backgroundColor: "rgba(255,255,255,.2)"}}/>
            <List style={{ padding: '14px 0px' }}>
                <ListItem button className={classes.listItem} component="a" href="https://www.facebook.com" target="_blank">Facebook</ListItem>
                <ListItem button className={classes.listItem} component="a" href="https://www.twitter.com" target="_blank">Twitter</ListItem>
                <ListItem button className={classes.listItem} component="a" href="https://www.instagram.com" target="_blank">Instagram</ListItem>
                <ListItem button className={classes.listItem} component="a" href="https://www.linkedin.com" target="_blank">LinkedIn</ListItem>
                <ListItem button className={classes.listItem} component="a" href="https://www.pinterest.com" target="_blank">Pinterest</ListItem>
            </List>
        </Grid>
    );
}

export default Social;