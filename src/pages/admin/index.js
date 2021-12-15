import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

import './style.scss';

// import firebase from 'firebase/app';
// import 'firebase/auth';

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