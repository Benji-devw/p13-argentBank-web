import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../api/call-api';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: 'tony@stark.com',
        password: '123',
        // rememberMe: false,
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        // const { name, type, value } = e.target;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const payload = await callApi('/login', 'POST', formData);
        console.log('payload', payload);
        if (payload.status === 200) {
            navigate('/user');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userToken', payload.body.token);
        } else {
            alert(payload.message);
        }
    };

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
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                </form>
            </section>
        </Layout>
    );
};

export default SignIn;
