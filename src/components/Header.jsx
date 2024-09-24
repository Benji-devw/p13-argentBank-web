
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="main-nav">
                <a className="main-nav-logo" href="./index.html">
                    <img
                        className="main-nav-logo-image"
                        src="/img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
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