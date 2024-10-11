import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
    const data = useSelector((state) => state.auth);
    const { firstName } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    // console.log('firstName', firstName);

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {data.token ? (
                        <>
                            <Link className="main-nav-item" to="/user">
                                <i className="fa fa-user-circle"></i>
                                {firstName}
                            </Link>
                            <Link className="main-nav-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out"></i>
                                Sign out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="main-nav-item" to="/sign-in">
                                <i className="fa fa-user-circle"></i>
                                Sign In
                            </Link>
                        </>
                    )}
                    {/* <Link className="main-nav-item" to="/sign-up">
                        <i className="fa fa-user-circle"></i>
                        Sign Up
                    </Link> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;
