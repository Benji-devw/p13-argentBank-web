import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
// import { callApi } from '../api/call-api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: 'tony@stark.com',
        password: '123',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const errorMessage = useSelector((state) => state.auth.errorMessage);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        name === 'remember-me'
            ? localStorage.setItem('rememberMe', e.target.checked)
            : setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(login(formData));
            if (login.fulfilled.match(resultAction)) {
                const token = resultAction.payload;
                localStorage.setItem('userToken', token);
                navigate('/user');
            } else {
                console.error('Login failed:', resultAction.payload);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
        }
    };

    // console.log('isLoading', isLoading);
    return (
        <Layout>
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
                        <input type="checkbox" id="remember-me" name="remember-me" onChange={handleChanges} />
                        <label htmlFor="remember-me">Remember me</label>
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
