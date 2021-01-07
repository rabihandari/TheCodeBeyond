import React from 'react';
import useStyles from './styles';
import { Grid, Typography, Divider, List, ListItem } from '@material-ui/core';

const Archives = () => {
    const classes = useStyles();

    return(
        <Grid container direction="column" className={classes.container}>
            <Typography variant="h4" className={classes.title}>Archives</Typography>
            <Divider variant="fullWidth" style={{backgroundColor: "rgba(255,255,255,.2)"}}/>
            <List style={{ padding: '14px 0px' }}>
                <ListItem button className={classes.listItem}>January 2021</ListItem>
                <ListItem button className={classes.listItem}>February 2021</ListItem>
                <ListItem button className={classes.listItem}>March 2021</ListItem>
                <ListItem button className={classes.listItem}>April 2021</ListItem>
                <ListItem button className={classes.listItem}>May 2021</ListItem>
            </List>
        </Grid>
    );
}

export default Archives;