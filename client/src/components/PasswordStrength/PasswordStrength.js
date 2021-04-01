import React from 'react';
import { Grid, Typography } from '@material-ui/core'; 
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useStyles from './styles';



const PasswordStrength = ({ password1, password2 }) => {
    const classes = useStyles();
    
    let min6 = lengthValid(password1);
    let matches = passwordsMatch(password1, password2);
    let letter = hasLetter(password1);
    let number = hasNumber(password1);
    
    function passwordsMatch(password1, password2) {
        return password1 === password2 && password1.length > 0;
    }

    function lengthValid(password) {
        return password.length >= 6;
    }

    function hasLetter(password) {
        let regExp = /[a-zA-Z]/g;
        return regExp.test(password);
    }

    function hasNumber(password) {
        let regExp = /\d/;
        return regExp.test(password);
    }


    return(
        <div className={classes.container}>
            <Grid container direction="column">
                <Grid item className={classes.holder}>
                    {matches ?
                        <CheckCircleIcon style={{ color: '#38b974' }}/>
                    :
                        <CheckCircleOutlineIcon />
                    }
                    <Typography className={classes.constraintText} variant="caption" style={ matches ? { color: '#38b974' } : { color: 'black' }}>Passwords Match</Typography>
                </Grid>
                <Grid item className={classes.holder}>
                    {min6 ?
                        <CheckCircleIcon style={{ color: '#38b974' }}/>
                    :
                        <CheckCircleOutlineIcon />
                    }
                    <Typography className={classes.constraintText} variant="caption" style={ min6 ? { color: '#38b974' } : { color: 'black' }}>Min 6 charachters</Typography>
                </Grid>
                <Grid item className={classes.holder}>
                    {letter ?
                        <CheckCircleIcon style={{ color: '#38b974' }}/>
                    :
                        <CheckCircleOutlineIcon />
                    }
                    <Typography className={classes.constraintText} variant="caption" style={ letter ? { color: '#38b974' } : { color: 'black' }}>1 Letter</Typography>
                </Grid>
                <Grid item className={classes.holder}>
                    {number ?
                        <CheckCircleIcon style={{ color: '#38b974' }}/>
                    :
                        <CheckCircleOutlineIcon />
                    }
                    <Typography className={classes.constraintText} variant="caption" style={ number ? { color: '#38b974' } : { color: 'black' }}>1 Number</Typography>
                </Grid>
            </Grid>
        </div>
    );
}


export default PasswordStrength