import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/sign-in';
import User from './pages/user';
import SignUp from './pages/sign-up';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import {checkTokenExpiration} from './redux/authSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkTokenExpiration());
    }, [dispatch]);
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path={`/user`} element={<PrivateRoute element={User} />} />
                {/* <Route path={`/user/:id`} element={<PrivateRoute element={User} />} /> */}
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </Router>
    );
};

export default App;