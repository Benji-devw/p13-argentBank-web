import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Component, ...rest }) => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;