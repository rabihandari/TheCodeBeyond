import React, { useState } from 'react';
import { Typography, Grid, Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import useStyles from './styles';
import ThanksPage from '../../../ThanksPage/ThanksPage';
import * as actionTypes from '../../../../actions/actionTypes';
import { getBlockedUsers } from '../../../../api';
import Helper from '../actions/account';
import BlockedUsers from '../../../BlockedUsers/BlockedUsers';

const Account = ({ user, setAlert }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch(); 
    const { account } = useSelector(state => state.settings);
    const [thanksPage, setThanksPage] = useState({ visible: false, message: '' });
    const [profile, setProfile] = useState(user);
    const [blockedUsers, setBlockedUsers] = useState({ visible: false, users: [] });
    const [editing, setEditing] = useState([]);

    const helper = new Helper(profile, setProfile);
    const isCustomAuth = JSON.parse(localStorage.getItem('profile'))?.token.length < 500;

    const handleChangePasswordButton = () => {
        history.push(`/settings/changePassword/${profile.email}`);
    }

    const handleManageUsers =  () => {
        dispatch({ type: actionTypes.LOADING_START });
        getBlockedUsers({ blockedUsersIds: account.blockedUsers }).then(res => {
            setBlockedUsers({ visible: true, users: res.data.users });
            dispatch({ type: actionTypes.LOADING_END });
        }).catch(error => {
            console.log(error);
            setBlockedUsers({ visible: false, ...blockedUsers });
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    const closeThanksPage = () => {
        setThanksPage({ ...thanksPage, visible: false });
    }


    const handleEditButton = (key) => () => {
        if(!editing.includes(key)){
            setEditing([...editing, key]);
        }else{
            setEditing(editing.filter(keyItem => keyItem !== key));
            setProfile(JSON.parse(localStorage.getItem('profile'))?.result);
        }
    }

    const handleSaveEmail = () =>  {
        // Check if email changed
        let oldStorage = JSON.parse(localStorage.getItem('profile'));
        if(profile.email === oldStorage.result.email){
            setEditing(editing.filter(keyItem => keyItem !== 'email'));
            return;
        }

        dispatch({ type: actionTypes.LOADING_START });
        helper.saveEmail().then((res) => {
            setEditing(editing.filter(keyItem => keyItem !== 'email'));
            dispatch({ type: actionTypes.CHANGE_EMAIL });
            localStorage.setItem('profile', JSON.stringify({...oldStorage, result: { ...oldStorage.result, email: res.data.data } }))
            dispatch({ type: actionTypes.LOADING_END });
            setThanksPage({ visible: true, message: 'We\'ve sent you an email to verify your new email. Please check your inbox' });
        }).catch((error) => {
            setProfile({ ...profile, email: oldStorage.result.email });
            setEditing(editing.filter(keyItem => keyItem !== 'email'));
            setAlert({ open: true, message: error.response?.data?.message || error, severity: 'error' });
            dispatch({ type: actionTypes.LOADING_END });
        });
    }


    const handleResendActivation = () => {
        dispatch({ type: actionTypes.LOADING_START });
        helper.saveEmail().then((res) => {
            dispatch({ type: actionTypes.LOADING_END });
            setAlert({ open: true, message: "We've sent you a code again. Check your inbox", severity: 'success' });
        }).catch((error) => {
            setEditing(editing.filter(keyItem => keyItem !== 'email'));
            setAlert({ open: true, message: error.response?.data?.message || error, severity: 'error' });
            dispatch({ type: actionTypes.LOADING_END });
        });
    }

    return(
        <div>
            <Typography className={classes.sectionTitle}>Account</Typography>
            <ul className={classes.sectionBody}>
                {/* --------------------- Email Address ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={8}>
                            <Typography className={classes.itemTitle}>Email Address</Typography>
                            {editing.includes('email') ?
                                <input type="text" className={classes.inputField} placeholder="Edit your email" autoFocus={true} value={profile?.email} onChange={helper.editEmail()}/>
                            :
                                <Typography className={classes.itemValue}>{profile?.email}</Typography>
                            }
                            <Typography variant="caption" className={classes.itemDescription}>Your email appears on your profile and it is a required field. If you signed in using your gmail account, you will no be able to change your email.</Typography>
                            {(account && !account?.confirmed) &&
                                <Typography variant="caption" className={classes.itemDescription} style={{ color: 'red' }}>
                                    Your account is not confirmed yet &nbsp;
                                    <Typography variant="caption" className={classes.resendActivation} onClick={handleResendActivation}>
                                        resend code
                                    </Typography>
                                </Typography>
                            }
                        </Grid>
                        <Grid item md={2} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleEditButton('email')} disabled={!isCustomAuth}>{editing.includes('email') ? "Cancel" : "Change Email"}</Button>
                            {editing.includes('email') &&
                                <Button variant="outlined" className={classes.editButton} onClick={handleSaveEmail} color="primary">Save</Button>
                            }
                        </Grid>
                    </Grid>
                </li>
                {thanksPage.visible &&
                    <ThanksPage message={thanksPage.message} closeThanksPage={closeThanksPage}/>
                }
                {/* --------------------- Password ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={9}>
                            <Typography className={classes.itemTitle}>Password</Typography>
                            <Typography variant="caption" className={classes.itemDescription}>If you signed in using your gmail account, you will no be able to change your password.</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleChangePasswordButton}>Change Password</Button>
                        </Grid>
                    </Grid>
                </li>
                {/* --------------------- Blocked Users ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={9}>
                            <Typography className={classes.itemTitle}>Manage blocked users</Typography>
                            <Typography variant="caption" className={classes.itemDescription}>See a list of all the users you’ve blocked.</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleManageUsers}>Manage blocked users</Button>
                        </Grid>
                    </Grid>
                </li>
                {blockedUsers.visible &&
                    <BlockedUsers close={() => {setBlockedUsers({ ...blockedUsers, visible: false })}} blockedUsers={blockedUsers.users} />
                }
            </ul>
        </div>
    );
}

export default Account;