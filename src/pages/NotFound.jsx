import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
    return (
        <Layout className="main bg-dark not-found-container">
            <div className="not-found">
                <h1>404</h1>
                <p>Oops! La page que vous recherchez n&rsquo;existe pas.</p>
                <Link to="/" className="transaction-button">
                    Retour à l&rsquo;accueil
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;
