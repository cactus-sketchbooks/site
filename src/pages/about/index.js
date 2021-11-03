import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function About() {
    return (
        <div>
            <Header />
            <section id="about-body">
                <h1>Sobre Nós</h1>
            </section >
            <Footer />
        </div>
    )
} export default About;