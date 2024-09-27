import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../api/call-api';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: 'tony@stark.com',
        password: '123',
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, value } = e.target;
        name === 'remember-me'
            ? localStorage.setItem('rememberMe', e.target.checked)
            : setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const payload = await callApi('/user/login', 'POST', formData);
        const user = await callApi('/user/profile', 'POST', {}, payload.body.token);
        console.log('payload', payload);

        if (payload.status === 200 && user.status === 200) {
            navigate(`/user/${user.body.id}`);
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
                        <input type="checkbox" id="remember-me" name="remember-me" onChange={handleChanges} />
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
