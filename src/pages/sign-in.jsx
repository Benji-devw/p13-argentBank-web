import { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useEffect } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: 'tony@stark.com',
        password: '123',
        rememberMe: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, errorMessage, isAuthenticated } = useSelector((state) => state.auth);

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
            navigate('/user');
        }
    }, [isAuthenticated, navigate]);

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
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </section>
        </Layout>
    );
};

export default SignIn;
