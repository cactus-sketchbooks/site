import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js'
import Footer from '../../components/footer/index.js'

import cacto1 from '../../images/cactopng2.png'
import foto from '../../images/foto1.png'

function Home() {

    return (

        <main>

        <Header />

        <section id="hero-section">

            <div class="hero-wrapper">

                <div class="hero-title">
                    <h1>cactus</h1>
                    <img src={cacto1} alt="Imagem de um cacto" />
                    <h2>sketchbooks</h2>
                </div>

                
                <div class="hero-data">
                    <p>Você cria, nós fazemos 🌵💚</p>
                </div>
            </div>

            <section id="services-section">
                <div class="service-wrapper">
                    <div class="service-card">
                        <h3>mandacaru</h3>
                    </div>

                    <div class="service-card">
                        <h3>baião</h3>
                    </div>

                    <div class="service-card">
                        <h3>facheiro</h3>
                    </div>

                    <div class="service-card">
                        <h3>carcará</h3>
                    </div>
                </div>
            </section>

        </section>

        <section id="section-showcase">

            <div className="showcase-wrapper">

                <div className="showcase-image-wrapper">

                    <img src={foto} alt="imagem" />

                </div>

                <div className="showcase-text">

                    <h1>Lorem Ipsum dale dale xesque brtt eh o daddy</h1>
                    <h3>Lorem Ipsum dale dale xesque brtt eh o daddy</h3>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    <button>AAAAAAA</button>
                    
                </div>

            </div>

        </section>

        <Footer />

        </main>

    )
} export default Home;