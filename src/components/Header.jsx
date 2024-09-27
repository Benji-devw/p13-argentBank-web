import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('userToken');
        navigate('/');
    };

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {token ? (
                        <>
                            <Link className="main-nav-item" to="/user">
                                <i className="fa fa-user-circle"></i>
                                User
                            </Link>
                            <button className="main-nav-item" onClick={handleLogout}>
                                <i className="fa fa-sign-out"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="main-nav-item" to="/sign-in">
                                <i className="fa fa-user-circle"></i>
                                Sign In
                            </Link>
                        </>
                    )}
                    <Link className="main-nav-item" to="/sign-up">
                        <i className="fa fa-user-circle"></i>
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
