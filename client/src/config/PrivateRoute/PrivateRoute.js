import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, componentProps, ...rest }) => {
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    return (
        <Route {...rest} render={props => (
            currentUser ?
                <Component {...props} {...componentProps} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;