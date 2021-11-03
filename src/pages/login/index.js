import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function Login() {
    return (
        <div>
            <Header />
            <section id="login-body">
                <h1>Login</h1>
            </section >
            <Footer />
        </div>
    )
} export default Login;