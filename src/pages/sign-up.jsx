import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callApi } from '../api/call-api';
import Layout from '../components/Layout';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        // rememberMe: false,
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, type, value } = e.target;
        // console.log('e', name, 'type', type, 'value', value);
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const payload = await callApi('/signup', 'POST', formData);
        payload.status === 200 ? navigate('/user') : alert(payload.message);
    };

    // console.log('formData', formData);
    return (
        <Layout>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSignUp}>
                    <div className="input-wrapper">
                        <label htmlFor="firstname">First name</label>
                        <input type="text" id="firsname" name="firstName" onChange={handleChanges} required />{' '}
                        <label htmlFor="lasname">Last name</label>
                        <input type="textk" id="lasname" name="lastName" onChange={handleChanges} required />
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onChange={handleChanges} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handleChanges} required />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" name="rememberMe" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">
                        Sign Up
                    </button>
                </form>
            </section>
        </Layout>
    );
};

export default SignUp;
