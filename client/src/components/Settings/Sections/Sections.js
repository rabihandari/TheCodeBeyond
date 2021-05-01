import React, { useEffect, createRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import EditProfile from './EditProfile/EditProfile';
import Account from './Account/Account';
import Security from './Security/Security';

const Sections = ({ user, setAlert, selectedSection }) => {
    const classes = useStyles();
    const history = useHistory();
    const [sectionRefs, setSectionRefs] = useState([]);
    const sectionsNumber = 3;

    useEffect(() => {
        if(!user){
            history.push('/login');
        }
        if (sectionRefs.length === 0){
            setSectionRefs(elRefs => (
                Array(sectionsNumber).fill().map((_, i) => elRefs[i] || createRef())
            ));

        }
        if(!sectionRefs[selectedSection] || selectedSection === -1) return;
        sectionRefs[selectedSection].current.scrollIntoView({ block: 'start',  behavior: 'smooth'});
    }, [user, history, selectedSection, sectionRefs]);


    return(
        <Grid container className={classes.sectionsContainer} direction='column'>
            {/* Edit Profile */}
            <Grid item className={classes.sectionContainer} ref={sectionRefs[0]}>
                <EditProfile user={user} setAlert={setAlert}/>
            </Grid>
            {/* Account */}
            <Grid item className={classes.sectionContainer} ref={sectionRefs[1]}>
                <Account user={user} setAlert={setAlert}/>
            </Grid>
            {/* Security */}
            <Grid item className={classes.sectionContainer} ref={sectionRefs[2]}>
                <Security user={user} setAlert={setAlert}/>
            </Grid>
        </Grid>
    );
}

export default Sections;