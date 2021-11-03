import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js'
import Footer from '../../components/footer/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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

                    <p>A Cactus foi plantada por Bruno Matos e Helen Cristina no ano de 2018. Lorem ipsum dolor sit amet, consectetur lorem, sed do eiusmod tempor incididunt ut lab lorem Queria sair daqui, jogando de Lucian top
                    Lucian top de cleptomância
                    Para dar diversson à minha stream
                    Entretenimento, de graça
                    E acima de tudo: Diverson!
                    Porque sem diverson, no és una stream boa
                    Agora, com Lucian banido
                    O objetivo mudou
                    Está mais claro do que nunca
                    Hoje comeremos cu
                    Venha, venha comigo nessa jornada!
                    </p>

                    <div className="about-container-images">
                        <a href="https://www.instagram.com/p/CUGBF8xp4mi/">
                            <img draggable="false" src={img3} alt="" />
                        </a>
                        <a href="https://www.instagram.com/p/CUV9t5ZJoye/">
                            <img draggable="false" src={img1} alt="" />
                        </a>
                        <a href="https://www.instagram.com/p/B5kriJKp5n7/">
                            <img draggable="false" src={img2} alt="" />
                        </a>
                    </div>

                    <div className="about-container-contact">
                        <a className="about-hashtag" href="https://www.instagram.com/explore/tags/cactussketchbooks/?hl=en" target="_blank"> 🌵use #cactussketchbooks </a>

                        <a className="about-butto" href="/cart">Fazer arte</a>                    
                    </div>
                        
                </article>
            </div>
        </section>

        <Footer />

        </main>

    )
} export default About;