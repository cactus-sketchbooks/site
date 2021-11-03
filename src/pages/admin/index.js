import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function Admin() {
    return (
        <div>
            <Header />
            <section id="admin-body">
                <h1>Admin</h1>
            </section >
            <Footer />
        </div>
    )
} export default Admin;