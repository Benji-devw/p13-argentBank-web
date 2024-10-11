import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, className }) => {
    return (
        <div id="layout">
            <Header />
            <main className={className} >{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
