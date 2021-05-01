import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Avatar, Grow } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../actions/actionTypes';

import useStyles, { CustomIndeterminate } from './styles';
import { unblockUser } from '../../api';

const BlockedUsers = ({ blockedUsers, close }) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState(blockedUsers);
    
    const removeUser = (id) => {
        setUsers(users.filter(user => user._id !== id));
    }
    
    const userObjects = users.map(user => <UserRow key={user._id} _id={user._id} name={user.name} profilePicture={user.profilePicture} setLoading={setLoading} removeUser={removeUser}/>);
    
    return(
        <Grid container className={classes.mainContainer}>
            <Container className={classes.container}>
                <Grow in >
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Typography className={classes.title} variant='h6'>You have blocked</Typography>
                            <CustomIndeterminate style={{ visibility: isLoading ? 'visible' : 'hidden', marginTop: '10px'}}/>
                        </Grid>
                        <Grid item style={{ marginTop: users.length > 0 ? '20px' : '0px' }}>
                            {users.length > 0 ?
                                userObjects
                            :
                                <Typography className={classes.body} variant='body1'>You have not blocked anybody yet!</Typography>
                            }
                        </Grid>
                        <Grid container justify="center" alignItems="center"style={{ marginTop: '15px' }} spacing={2}>
                            <Grid item>
                                <Button variant="outlined" className={classes.submitButton} onClick={close} color="secondary">Go back</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grow>
            </Container>
        </Grid>
    );
}

export default BlockedUsers;


const UserRow = ({ _id, name, profilePicture, setLoading, removeUser }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const redTheme = createMuiTheme({ palette: { primary: red } })
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    const handleUnblockButton = () => {
        setLoading(true);
        unblockUser({ id: _id }).then(() => {
            removeUser(_id);
            dispatch({ type: actionTypes.UNBLOCK, payload: { id: _id } })
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    }

    return(
        <Grid container key={_id} justify="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center'}}>
                <Avatar className={classes.headerPicture} src={profilePicture} alt={name}>{name.charAt(0)}</Avatar>
                <Typography variant='body2' className={classes.username}>{name}</Typography>
            </Grid>
            <Grid item>
                <MuiThemeProvider theme={redTheme}>
                    <Button 
                        variant={hovered ? "outlined" : "contained"} 
                        className={classes.blockedButton} 
                        color={hovered ? "default" : "primary"} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                        size='small'
                        onClick={handleUnblockButton}
                    >
                        {hovered ? 'Unblock' : 'Blocked'}
                    </Button>
                </MuiThemeProvider>
            </Grid>
        </Grid>
            
    );
}