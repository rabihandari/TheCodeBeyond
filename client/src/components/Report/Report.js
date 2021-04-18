import React, { useState } from 'react';
import { Container, Grid, Typography, IconButton, RadioGroup, FormControlLabel, Radio, Checkbox, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import IconClose from '../../images/icon-close.svg';

const Report = ({ whatToReport, closeReport, callback }) => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState('spam');
    const [checked, setChecked] = useState(false);

    const redTheme = createMuiTheme({ palette: { primary: red } })
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleCheckboxToggle = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = () => {
        let reportData = {
            reason: value,
            blockAuthor: checked,
        }
        callback(reportData);
        closeReport();
    }
    
    const goToLogin = () => {
        history.push('/login');
    }

    return(
        <Grid container className={classes.mainContainer}>
            <Container className={classes.container}>
                <Grid container spacing={2} direction="column">
                    <Grid container justify="flex-end">
                        <IconButton size='small' onClick={closeReport}>
                            <img src={IconClose} alt="Close" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.title} variant='h6'>Report {whatToReport}</Typography>
                    </Grid>
                    <Grid item style={{ marginTop: '20px' }}>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="spam" control={
                                <Radio size="small" color="primary" />
                            } label={
                                <Typography variant='body2'>Spam</Typography>
                            } />
                            <FormControlLabel value="harrasment" control={
                                <Radio size="small" color="primary" />
                            } label={
                                <Typography variant='body2'>Harrasment</Typography>
                            } />
                            <FormControlLabel value="rule_violation" control={
                                <Radio size="small" color="primary" />
                            } label={
                                <Typography variant='body2'>Rule Violation</Typography>
                            } />
                        </RadioGroup>
                    </Grid>
                    <Grid item style={{ marginTop: '15px' }}>
                        <FormControlLabel value="rule_violation" control={
                                <Checkbox color="primary" size='small' inputProps={{ 'aria-label': 'secondary checkbox' }} onChange={handleCheckboxToggle} checked={checked}/>
                            } label={
                                <Typography variant='body2'>Also block this user</Typography>
                            } />
                    </Grid>
                    <Grid container justify="center" alignItems="center"style={{ marginTop: '15px' }} spacing={2}>
                        <Grid item>
                            <Button variant="outlined" className={classes.cancelButton} onClick={closeReport}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <MuiThemeProvider theme={redTheme}>
                                <Button variant="contained" className={classes.reportButton} color='primary' onClick={handleSubmit} disabled={!currentUser}>Report</Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    
                    {!currentUser &&
                        <Grid container justify="center" style={{ marginTop: '40px' }}>
                            <Typography variant='caption' style={{ textAlign: 'center' }}>Please sign in to be able to report this {whatToReport}<br/>
                                <Typography variant='caption' color="primary" style={{ cursor: 'pointer' }} onClick={goToLogin}>Login to my account</Typography>
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </Container>
        </Grid>
    );
}

export default Report;