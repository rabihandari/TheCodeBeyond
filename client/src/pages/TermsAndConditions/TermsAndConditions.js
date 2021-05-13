import React from 'react';
import { Container } from '@material-ui/core';

import terms from './terms';
import useStyles from './styles';

const TermsAndConditions = () => {
    const classes = useStyles();

    return(
        <Container className={classes.container}>
            <div dangerouslySetInnerHTML={{ __html: terms }} />
        </Container>
    );
}

export default TermsAndConditions;