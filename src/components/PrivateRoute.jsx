import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;