import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js'
import Footer from '../../components/footer/index.js'

//import cacto1 from '../../images/cactopng2.png'
//import product from '../../images/wrapped-sketchbook.png'
import cactos from '../../images/cactosoverlay.png'
import img1 from '../../images/1.png'
import img2 from '../../images/2.png'
import img3 from '../../images/3.png'

function About() {

    return (

        <main>

        <Header />

        <section id="about-section">
            <div className="about-background">
                <img draggable="false" src={cactos} alt="Cactos" />
            </div>

            <div className="about-container">
                <article>
                    <h1>Sua arte. Nossa criação.</h1>

                    <p>A cactus foi plantada por Bruno Matos e Helen Cristina no ano de 2018. De lá pra cá esses dois jovens artistas cresceram com ela, tornando essa loja de encadernação artesanal e plataforma de criação. Estamos aqui pra somar com todos que confiam na cactus e espalhar a nossa arte e quem cria com ela pelo mundo, vamos com a gente plantar e gerar arte?
                    </p>

                    <div className="about-container-images">
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/p/CUGBF8xp4mi/">
                            <img draggable="false" src={img3} alt="" />
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/p/CUV9t5ZJoye/">
                            <img draggable="false" src={img1} alt="" />
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/p/B5kriJKp5n7/">
                            <img draggable="false" src={img2} alt="" />
                        </a>
                    </div>

                    <div className="about-container-contact">
                        <a className="about-hashtag" href="https://www.instagram.com/explore/tags/cactussketchbooks/?hl=en" target="_blank"rel="noreferrer"> 🌵use #cactussketchbooks </a>

                        <a className="about-button" href="/cart">Fazer arte</a>                    
                    </div>
                        
                </article>
            </div>
        </section>

        <Footer />

        </main>

    )
} export default About;