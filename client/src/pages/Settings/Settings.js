import React, { useState } from 'react';
import { Container, Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';
import FixedNavigation from '../../components/Settings/Navigation/FixedNavigation';
import Sections from '../../components/Settings/Sections/Sections';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Settings = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [selectedSection, setSelectedSection] = useState(-1);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const matches = useMediaQuery(useTheme().breakpoints.up('md'));

    const goToSection = (index) => () => {
        setSelectedSection(index);
    }

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    }

    return(
        <Container className={classes.mainContainer}>
            {user &&
                <Grid container>
                    {matches &&
                        <Grid item md={3}>
                            <FixedNavigation goToSection={goToSection}/>
                        </Grid>
                    }
                    <Grid item md={matches ? 9 : 12}>
                        <Sections user={user.result} setAlert={setAlert} selectedSection={selectedSection}/>
                    </Grid>
                </Grid>
            }
            {alert.open && 
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleAlertClose} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            }
        </Container>
    );
}

export default Settings;