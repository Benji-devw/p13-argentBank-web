import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, className }) => {
    return (
        <div id="layout">
            <Header />
            <main className={className} >{children}</main>
            <Footer />
        </div>
    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Layout;