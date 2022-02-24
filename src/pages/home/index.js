import React, { useState, useEffect } from 'react';
import './style.scss';
import Header from '../../components/header/index.js'
import Footer from '../../components/footer/index.js'

import { Link } from 'react-router-dom'

import cacto1 from '../../images/cactopng2.png'
import foto from '../../images/foto1.png'
import mandacaru from '../../images/mandacaru.png'
import baiao from '../../images/baiao.png'
import facheiro from '../../images/facheiro.png'
import sertao from '../../images/sertao.png'
import buriti from '../../images/buriti-kindle.png';
import carcara from '../../images/carcara.png'
import mandacaruQuadrado from '../../images/mandacaruQuadrado.jpg'
import baiaoQuadrado from '../../images/baiaoQuadrado.jpg'
import facheiroQuadrado from '../../images/facheiroQuadrado.jpg'
import sertaoQuadrado from '../../images/sertaoQuadrado.jpg'
import buritiQuadrado from '../../images/buritiQuadrado.jpg'
import carcaraQuadrado from '../../images/carcaraQuadrado.jpg'

function Home() {

    const [displayModal, setDisplayModal] = useState('none')
    const [modalData, setModalData] = useState({})

    const sketchbooksInfos = [

        {
            id: 0,
            name: 'mandacaru',
            description: 'Sketchbook costura copta',
            link: '/mandacaru',
            imgSrc: [mandacaru, mandacaruQuadrado]
        },

        {
            id: 1,
            name: 'baião',
            description: 'Sketchbook quadrado copta',
            link: '/baiao',
            imgSrc: [baiao, baiaoQuadrado]
        },

        {
            id: 2,
            name: 'facheiro',
            description: 'Sketchbook espiral',
            link: '/facheiro',
            imgSrc: [facheiro, facheiroQuadrado]
        },

        {
            id: 3,
            name: 'sertão',
            description: 'Journal',
            link: '/sertao',
            imgSrc: [sertao, sertaoQuadrado]
        },

        {
            id: 4,
            name: 'buriti',
            description: 'Cases para kindle e tablet',
            link: '/buriti',
            imgSrc: [buriti, buritiQuadrado]
        },

        {
            id: 5,
            name: 'carcará',
            description: 'Moleskine',
            link: '/carcara',
            imgSrc: [carcara, carcaraQuadrado]
        },

    ]

    function handleModalInfos(index) {

        setModalData(sketchbooksInfos[index])
        displayModal === "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal === "none")
            setDisplayModal("flex")
        else {
            setDisplayModal("none");
        }

    }

    return (

        <main id="mainHome">

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <div className="modalContent">

                    <div className="sketchbookImgWrapper">

                        {modalData.imgSrc ? (<img src={modalData.imgSrc[1]} alt="" />) : ('')}

                    </div>

                    <div className="sketchbookInfosWrapper">

                        <span onClick={closeModal}>x</span>
                        <h1>{modalData.name}</h1>
                        <h3>{modalData.description}</h3>
                        <Link to={modalData.link}>Quero um {modalData.name}!</Link>

                    </div>

                </div>

            </div>

            <Header />

            <section id="hero-section">

                <div className="hero-wrapper">

                    <div className="hero-title">
                        <h1>cactus</h1>
                        <img src={cacto1} alt="Imagem de um cacto" />
                        <h1>sketchbooks</h1>
                    </div>

                    <div className="hero-data">
                        <p>Você cria, nós fazemos 🌵🧡</p>
                    </div>

                </div>

                <section id="services-section">

                    <h2>Monte seu Cactus: modelos, cores, tudo!</h2>

                    <h2 id="bottomText">Selecione as opções abaixo e monte um cactus do seu jeito!</h2>

                    <div className="service-wrapper">

                        {sketchbooksInfos.map((item, index) => {

                            return (

                                <div onClick={() => handleModalInfos(index)} className="service-card">

                                    <h3>{item.name}</h3>
                                    <h4>{item.description}</h4>
                                    <img src={item.imgSrc[0]} alt={item.imgSrc[0]} />

                                </div>

                            )

                        })}

                    </div>

                    <div className="paperTypeInfos">

                        <h3>Conheça um pouco mais sobre cada tipo de papel</h3>
                        <Link to="/gramaturas">Vamos lá!</Link>

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

                        <a href="#services-section">Fazer arte</a>

                    </div>

                </div>

            </section>

            <Footer />

        </main>

    )
} export default Home;