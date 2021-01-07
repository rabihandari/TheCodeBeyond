import React from 'react';
import useStyles from './styles';
import { Grid, Typography, Divider, List, ListItem } from '@material-ui/core';

const QuickLinks = () => {
    const classes = useStyles();

    return(
        <Grid container direction="column" className={classes.container}>
            <Typography variant="h4" className={classes.title}>Quick Links</Typography>
            <Divider variant="fullWidth" style={{backgroundColor: "rgba(255,255,255,.2)"}}/>
            <List style={{ padding: '14px 0px' }}>
                <ListItem button className={classes.listItem}>Home</ListItem>
                <ListItem button className={classes.listItem}>About</ListItem>
                <ListItem button className={classes.listItem}>Contact Us</ListItem>
                <ListItem button className={classes.listItem}>About Us</ListItem>
                <ListItem button className={classes.listItem}>Privacy Policy</ListItem>
            </List>
        </Grid>
    );
}

export default QuickLinks;