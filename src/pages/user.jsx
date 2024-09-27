import React, { useEffect, useState } from 'react';
import { callApi } from '../api/call-api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const User = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');
            
            if (!token) {
                console.error('No token found');
                navigate('/');
            }

            const payload = await callApi('/user/profile', 'POST', {}, token);
            console.log('USER-----', payload);
            if (payload.status === 200) {
                setUserData(payload.body);
            }
            
        };

        fetchUserData();
    }, []);


    return (
        <Layout>
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {userData && userData.firstName} {userData && userData.lastName}
                </h1>
                <Link to='/user-update' className="edit-button">Edit Name</Link>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </Layout>
    );
};

export default User;