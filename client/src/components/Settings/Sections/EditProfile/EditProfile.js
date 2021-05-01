import React, { useState } from 'react';
import { Typography, Grid, Button, Avatar} from '@material-ui/core';
import { useDispatch } from 'react-redux'; 

import useStyles from './styles';
import Helper from '../actions/editProfile';
import * as actionTypes from '../../../../actions/actionTypes';
import PublishIcon from '@material-ui/icons/Publish';

const EditProfile = ({ user, setAlert }) => {
    const classes = useStyles();
    const dispatch = useDispatch(); 
    const [profile, setProfile] = useState(user);
    const [editing, setEditing] = useState([]);

    const helper = new Helper(profile, setProfile);

    const handleEditButton = (key) => () => {
        if(!editing.includes(key)){
            setEditing([...editing, key]);
        }else{
            setEditing(editing.filter(keyItem => keyItem !== key));
            setProfile(JSON.parse(localStorage.getItem('profile'))?.result);
        }
    }

    const handleSaveButton = (key, callback) => () => {
        dispatch({ type: actionTypes.LOADING_START });
        callback().then((res) => {
            setEditing(editing.filter(keyItem => keyItem !== key));
            let oldStorage = JSON.parse(localStorage.getItem('profile'));
            localStorage.setItem('profile', JSON.stringify({...oldStorage, result: { ...oldStorage.result, [key]: res.data.data } }))
            dispatch({ type: actionTypes.LOADING_END });
            setAlert({ open: true, message: res.data.message, severity: 'success' });
        }).catch((error) => {
            let oldStorage = JSON.parse(localStorage.getItem('profile'));
            setProfile({ ...profile, [key]: oldStorage.result[key] })
            dispatch({ type: actionTypes.LOADING_END });
            setAlert({ open: true, message: error.response.data.message, severity: 'error' });
        });
    }

    return(
        <div>
            <Typography className={classes.sectionTitle}>Edit Profile</Typography>
            <ul className={classes.sectionBody}>
                {/* --------------------- Name ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={8}>
                            <Typography className={classes.itemTitle}>Name</Typography>
                            
                            {editing.includes('name') ?
                                <input type="text" className={classes.inputField} placeholder="Edit your name" autoFocus={true} value={profile?.name} onChange={helper.editName()}/>
                            :
                                <Typography className={classes.itemValue}>{profile?.name}</Typography>
                            }
                            <Typography variant="caption" className={classes.itemDescription}>Your name appears on your profile, published posts, and all your comments and replies. It is a required field.</Typography>
                        </Grid>
                        <Grid item md={2} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleEditButton('name')}>{editing.includes('name') ? "Cancel" : "Edit"}</Button>
                            {editing.includes('name') &&
                                <Button variant="outlined" className={classes.editButton} onClick={handleSaveButton('name', helper.saveName)} color="primary">Save</Button>
                            }
                        </Grid>
                    </Grid>
                </li>
                {/* --------------------- Bio ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item md={10}>
                            <Typography className={classes.itemTitle}>Bio</Typography>
                            {editing.includes('bio') ?
                                <input type="text" className={classes.bioField} placeholder="Add your bio" autoFocus={true} value={profile?.bio} onChange={helper.editBio()}/>
                            :
                                profile?.bio ?
                                    <Typography className={classes.itemValue}>{profile?.bio}</Typography>
                                :
                                    <Typography className={classes.itemValueEmpty}>Add your bio</Typography>
                            }
                            <Typography variant="caption" className={classes.itemDescription}>Your bio appears on your profile and next to your stories. Max 160 characters.</Typography>
                        </Grid>
                        <Grid item md={2} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleEditButton('bio')}>{editing.includes('bio') ? "Cancel" : "Edit"}</Button>
                            {editing.includes('bio') &&
                                <Button variant="outlined" className={classes.editButton} onClick={handleSaveButton('bio', helper.saveBio)} color="primary">Save</Button>
                            }
                        </Grid>
                    </Grid>
                </li>
                {/* --------------------- Photo ---------------------- */}
                <li className={classes.itemContainer}>
                    <Grid container alignItems="flex-start" justify="space-between">
                        <Grid item xs={9} md={7}>
                            <Typography className={classes.itemTitle} style={{ marginBottom: '10px', maxWidth: '60%'}}>Photo</Typography>
                            <Typography variant="caption" className={classes.itemDescription}>Your photo appears on your profile page and with your posts across The Code Beyond. </Typography>
                            <Typography variant="caption" className={classes.itemDescription}>Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.</Typography>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            {editing.includes('profilePicture') ?
                                <label style={{ position: 'relative', display: 'block' }}>
                                    <Avatar className={classes.editProfile} src={profile?.profilePicture} alt={profile?.name}></Avatar>
                                    <Avatar className={classes.profileOverlay} src="" alt={profile?.name} children={<PublishIcon/>}></Avatar>
                                    <input 
                                        type="file" 
                                        style={{ display: 'none' }} 
                                        onChange={(e) => {
                                            helper.editProfilePicture(e);
                                        }}/>
                                </label>
                                
                            :
                                <Avatar className={classes.profilePicture} src={profile?.profilePicture} alt={profile?.name}></Avatar>
                            }
                        </Grid>
                        <Grid item md={2} className={classes.buttonContainer}>
                            <Button variant="outlined" className={classes.editButton} onClick={handleEditButton('profilePicture')}>{editing.includes('profilePicture') ? "Cancel" : "Edit"}</Button>
                            {editing.includes('profilePicture') &&
                                <Button variant="outlined" className={classes.editButton} onClick={handleSaveButton('profilePicture', helper.saveProfilePicture)} color="primary">Save</Button>
                            }
                        </Grid>
                    </Grid>
                </li>
            </ul>
        </div>
    );
}

export default EditProfile;