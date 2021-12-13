import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js'
import Footer from '../../components/footer/index.js'

import cacto1 from '../../images/cactopng2.png'
import foto from '../../images/foto1.png'
import mandacaru from '../../images/mandacaru.png'
import baiao from '../../images/baiao.png'
import facheiro from '../../images/facheiro.png'
import sertao from '../../images/sertao.png'
import kindle from '../../images/buriti-kindle.png'
import carcara from '../../images/carcara.jpg'

function Home() {

    return (

        <main>

        <Header />

        <section id="hero-section">

            <div class="hero-wrapper">

                <div class="hero-title">
                    <h1>cactus</h1>
                    <img src={cacto1} alt="Imagem de um cacto" />
                    <h1>sketchbooks</h1>
                </div>

                <div class="hero-data">
                    <p>Você cria, nós fazemos 🌵💚</p>
                </div>
            </div>

            <section id="services-section">
                <h2>Monte seu Cactus: modelos, cores, tudo!</h2>
                <div class="service-wrapper">
                    <div class="service-card">
                        <h3>mandacaru</h3>
                        <h4>Sketchbook costura copta</h4>
                        <img src={mandacaru} alt="Mandacaru" />
                    </div>

                    <div class="service-card">
                        <h3>baião</h3>
                        <h4>Sketchbook quadrado copta</h4>
                        <img src={baiao} alt="Baião" />
                    </div>

                    <div class="service-card">
                        <h3>facheiro</h3>
                        <h4>Sketchbook espiral</h4>
                        <img src={facheiro} alt="Facheiro" />
                    </div>

                    <div class="service-card">
                        <h3>Carcará</h3>
                        <h4>Moleskine</h4>
                        <img src={carcara} alt="Carcará" />
                    </div>

                    <div class="service-card">
                        <h3>sertão</h3>
                        <h4>Journal</h4>
                        <img src={sertao} alt="Sertão" />
                    </div>

                    <div class="service-card">
                        <h3>buriti</h3>
                        <h4>Cases para kindle e tablet</h4>
                        <img src={kindle} alt="Buriti kindle" />
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

                    <h1>Nosso objetivo</h1>

                    <p>A Cactus é mais do que uma loja de encadernação artesanal, por isso, com ela, trabalhamos pra que cada dia mais se torne uma plataforma que compartilha, inspira e cria arte, tudo junto com você, artista. Por isso, acima de tudo, ADORAMOS compartilhar as etapas da produção, criações dos criativos em seus cactus e todos os processos de criatividade. Assim buscamos tornar tudo isso ainda maior.</p>

                    <h2>Artistas e criativos,</h2>
                    <h2 className="highlight-showcase-text">contem com a Cactus</h2>

                    <h3>🌵use #cactussketchbooks</h3>

                    <button>Fazer arte</button>
                    
                </div>

            </div>

        </section>

        <Footer />

        </main>

    )
} export default Home;