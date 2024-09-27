import { useEffect, useState } from 'react';
import { callApi } from '../api/call-api';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const UserUpdate = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
    });

    const handleCHanges = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = await callApi('/user/profile', 'PUT', userData, token);

        if (payload.status === 200) {
            navigate(`/user/${payload.body.id}`);
        }
        alert('User updated');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const payload = await callApi('/user/profile', 'POST', {}, token);
            // const payload = await callApi('/user/profile', 'PUT', userData, token);

            if (payload.status === 200) {
                setUserData({ firstName: payload.body.firstName, lastName: payload.body.lastName });
            }
        };
        fetchUserData();
    }, []);

    return (
        <Layout>
            <section className="sign-in-content">
                <h1>User Update</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleCHanges}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleCHanges}
                        />
                    </div>
                    <button className="sign-in-button" type="submit">
                        Update
                    </button>
                </form>
            </section>
        </Layout>
    );
};

export default UserUpdate;
