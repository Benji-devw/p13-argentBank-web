import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setIsLoading, updateUserData, setIsEditing } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const { isEditing, isLoading, firstName, lastName } = useSelector((state) => state.user);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
    });
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch user data and handle navigation if token is not present
    const handleSave = (e) => {
        e.preventDefault();
        dispatch(setIsLoading());
        setTimeout(() => {
            dispatch(updateUserData({ userData, token }));
            dispatch(setIsEditing());
        }, 1000);
    };

    const handleEdit = () => {
        dispatch(setIsEditing());
    };

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setUserData({
            firstName: firstName,
            lastName: lastName,
        });
        if (token) {
            dispatch(getUserData(token));
        } else {
            navigate('/sign-in');
        }
    }, [token, dispatch, navigate, firstName, lastName]);

    return (
        <Layout className="main bg-dark">
            <div className="main bg-dark">
                <div className="header">
                    <h1>Welcome back</h1>

                    {isEditing ? (
                        <form className="user-edit" onSubmit={handleSave}>
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChangeName}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div>
                                <button type="submit" className="editing-button">
                                    {isLoading ? 'Saving...' : 'Save'}
                                    {/* Save */}
                                </button>
                                <button className="canceling-button" onClick={handleEdit}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1>
                                {firstName} {lastName}
                            </h1>
                            <button className="edit-button" onClick={handleEdit}>
                                Edit Name
                            </button>
                        </>
                    )}
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
            </div>
        </Layout>
    );
};

export default User;
