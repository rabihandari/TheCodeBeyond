import React from 'react';
import { Container, Grid, Typography, IconButton, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import IconClose from '../../images/icon-close.svg';

const Confirm = ({ action, title, description, close, callback }) => {
    const classes = useStyles();
    const history = useHistory();

    const redTheme = createMuiTheme({ palette: { primary: red } })
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = () => {
        callback();
        close();
    }
    
    const goToLogin = () => {
        history.push('/login');
    }

    return(
        <Grid container className={classes.mainContainer}>
            <Container className={classes.container}>
                <Grid container spacing={2} direction="column">
                    <Grid container justify="flex-end">
                        <IconButton size='small' onClick={close}>
                            <img src={IconClose} alt="Close" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} variant='h6'>{title}</Typography>
                    </Grid>
                    
                    <Grid item className={classes.description} >
                        <Typography variant='caption'>{description}</Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center"style={{ marginTop: '15px' }} spacing={2}>
                        <Grid item>
                            <Button variant="outlined" className={classes.cancelButton} onClick={close}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <MuiThemeProvider theme={redTheme}>
                                <Button variant="contained" className={classes.confirmButton} color='primary' onClick={handleSubmit} disabled={!currentUser}>{action}</Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    
                    {!currentUser &&
                        <Grid container justify="center" style={{ marginTop: '40px' }}>
                            <Typography variant='caption' style={{ textAlign: 'center' }}>Please sign in to be able to {action}<br/>
                                <Typography variant='caption' color="primary" style={{ cursor: 'pointer' }} onClick={goToLogin}>Login to my account</Typography>
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </Container>
        </Grid>
    );
}

export default Confirm;