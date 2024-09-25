import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/sign-in';
import User from './pages/user';
import SignUp from './pages/sign-up';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/user" element={<PrivateRoute element={User} />} />
            </Routes>
        </Router>
    );
};

export default App;