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
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, value } = e.target;
        name === 'remember-me'
            ? localStorage.setItem('rememberMe', e.target.checked)
            : setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const payload = await callApi('/user/signup', 'POST', formData);
        // payload.status === 200 ? navigate('/user') : alert(payload.message);

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

    // console.log('formData', formData);
    return (
        <Layout className="main bg-dark">
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
                        <input type="checkbox" id="remember-me" name="rememberMe" onChange={handleChanges} />
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
