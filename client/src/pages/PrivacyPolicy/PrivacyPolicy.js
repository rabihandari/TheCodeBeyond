import React from 'react';
import { Container } from '@material-ui/core';

import policy from './policy';
import useStyles from './styles';

const PrivacyPolicy = () => {
    const classes = useStyles();

    return(
        <Container className={classes.container}>
            <div dangerouslySetInnerHTML={{ __html: policy }} />
        </Container>
    );
}

export default PrivacyPolicy;