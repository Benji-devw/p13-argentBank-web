import { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useEffect } from 'react';
import { AlerteMessage } from '../components/AlerteMessage';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, errorMessage, isAuthenticated } = useSelector((state) => state.auth);
    const [showError, setShowError] = useState(null);

    const handleChanges = (e) => {
        const { name, value, checked } = e.target;
        setFormData({ ...formData, [name]: value || checked });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
        if (errorMessage) {
            setShowError(errorMessage);
            setTimeout(() => {
                setShowError(null);
            }, 3000);
        }
    }, [isAuthenticated, navigate, errorMessage]);

    return (
        <Layout className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onChange={handleChanges} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChanges} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="rememberMe" name="rememberMe" onChange={handleChanges} />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button disabled={isLoading} className="sign-in-button" type="submit">
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>

                    {showError && <AlerteMessage message={errorMessage} alerte="error-message" />}
                </form>
            </section>
        </Layout>
    );
};

export default SignIn;
