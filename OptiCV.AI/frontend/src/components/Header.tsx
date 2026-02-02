import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>OptiCV.ai</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/cv-generator">CV Generator</a></li>
                    <li><a href="/subscription">Subscription</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;