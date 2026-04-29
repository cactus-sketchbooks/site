import React, { useState, useEffect, useRef } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../../FirebaseConfig.js';

import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import { Link } from 'react-router-dom';

import logoCactus from '../../images/logoCactus3.png';
import foto from '../../images/foto1.png';
import mandacaru from '../../images/mandacaru.png';
import baiao from '../../images/baiao.png';
import facheiro from '../../images/facheiro.png';
import sertao from '../../images/sertaoRedondo.png';
import buriti from '../../images/buriti-kindle.png';
import carcara from '../../images/carcara.png';
import mandacaruQuadrado from '../../images/mandacaruQuadrado.jpg';
import baiaoQuadrado from '../../images/baiaoQuadrado.jpg';
import facheiroQuadrado from '../../images/facheiroQuadrado.jpg';
import sertaoQuadrado from '../../images/sertao3.png';
import buritiQuadrado from '../../images/buritiQuadrado.jpg';
import carcaraQuadrado from '../../images/carcaraQuadrado.jpg';
import mescla1 from '../../images/Mescla1.png';
import mescla2 from '../../images/Mescla2.jpg';

function Home() {
    const [displayModal, setDisplayModal] = useState('none');
    const [modalData, setModalData] = useState({});
    const listRef = useRef(null);

    const [produtos, setProdutos] = useState([]);

    const scroll = (direction) => {
        if (listRef.current) {
            const { scrollLeft, clientWidth } = listRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth / 2 
                : scrollLeft + clientWidth / 2;
            
            listRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };
    

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        let firebaseRef = firebase.database().ref('products/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setProdutos(temp);

                console.log(temp)
            } else {
                console.log('No data available');
            }
        });
    }, []);
    

    const sketchbooksInfos = [
        {
            id: 0,
            name: 'mandacaru',
            description: 'Sketchbook costura copta',
            startPrice: 'R$15,00',
            link: '/mandacaru',
            imgSrc: [mandacaru, mandacaruQuadrado],
        },

        {
            id: 1,
            name: 'baião',
            description: 'Sketchbook quadrado copta',
            startPrice: 'R$25,00',
            link: '/baiao',
            imgSrc: [baiao, baiaoQuadrado],
        },

        {
            id: 2,
            name: 'facheiro',
            description: 'Sketchbook espiral',
            startPrice: 'R$30,00',
            link: '/facheiro',
            imgSrc: [facheiro, facheiroQuadrado],
        },

        {
            id: 3,
            name: 'sertão',
            description: 'Journal',
            startPrice: 'R$8,00',
            link: '/sertao',
            imgSrc: [sertao, sertaoQuadrado],
        },

        {
            id: 4,
            name: 'buriti',
            description: 'Cases para kindle e tablet',
            startPrice: 'R$25,00',
            link: '/buriti',
            imgSrc: [buriti, buritiQuadrado],
        },

        {
            id: 5,
            name: 'carcará',
            description: 'Moleskine',
            startPrice: 'R$18,00',
            link: '/carcara',
            imgSrc: [carcara, carcaraQuadrado],
        },
        {
            id: 6,
            name: 'mescla',
            description: 'Miolo com até 4 papéis!',
            startPrice: 'R$11,00',
            link: '/mescla',
            imgSrc: [mescla1, mescla2],
        },
    ];

    function handleModalInfos(index) {
        setModalData(sketchbooksInfos[index]);
        displayModal === 'none'
            ? setDisplayModal('flex')
            : setDisplayModal('none');
    }

    function closeModal() {
        if (displayModal === 'none') setDisplayModal('flex');
        else {
            setDisplayModal('none');
        }
    }

    return (
        <main id='mainHome'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div className='modalContent'>
                    <div className='sketchbookImgWrapper'>
                        {modalData.imgSrc ? (
                            <img src={modalData.imgSrc[1]} alt='' />
                        ) : (
                            ''
                        )}
                    </div>

                    <div className='sketchbookInfosWrapper'>
                        <span onClick={closeModal}>x</span>
                        <h1>{modalData.name}</h1>
                        <h3>{modalData.description}</h3>
                        <Link to={modalData.link}>
                            Quero um {modalData.name}!
                        </Link>
                    </div>
                </div>
            </div>

            <Header />

            <section id='hero-section'>
                <div className='hero-wrapper'>
                    <div className='hero-title'>
                        <img src={logoCactus} alt='Imagem de um cacto' />
                        <h1>cactus sketchbooks</h1>
                    </div>

                    <div className='hero-data'>
                        <p>Feito com você 🌵🧡</p>
                    </div>
                </div>

                <section id='services-section'>

                    <h2>
                        Conheça alguns de nossos produtos a pronta entrega:<br />
                        {/* <Link to='/produtos'>Ver produtos</Link> <br /> */}
                    </h2>

                   <div className="carouselContainer">
                        <button className="navBtn left" onClick={() => scroll('left')}>‹</button>
                    
                        <div className='productsList' ref={listRef}>
                            {produtos.filter(p => p.stock > 0).map((product) => (
                                <Link className='productWrapper' key={product.id} to={`/produto/${product.id}`}>
                                    <div className='productImgWrapper'>
                                        <img src={product.productImage} alt={product.productName} loading='lazy' />
                                    </div>
                                    <div className='productInfos'>
                                        <h2>{product.productName}</h2>
                                        <h2 className="price">R$ {product.value}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button className="navBtn right" onClick={() => scroll('right')}>›</button>
                    </div>

                    <h2>
                        <Link to='/produtos'>Saiba Mais</Link> <br />
                    </h2>

                    <h2 id='bottomText'>
                        Ou selecione as opções abaixo e monte um cactus do seu
                        jeito!
                    </h2>

                    <div className='service-wrapper'>
                        {sketchbooksInfos.map((item, index) => {
                            return (
                                <div
                                    onClick={() => handleModalInfos(index)}
                                    className='service-card'
                                >
                                    <h4>{item.description}</h4>
                                    <h3>{item.name}</h3>
                                    <h5>
                                        A partir de{'  '}
                                        <span className='startPrice'>
                                            {item.startPrice}
                                        </span>
                                    </h5>
                                    <img
                                        src={item.imgSrc[0]}
                                        alt={item.imgSrc[0]}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className='paperTypeInfos'>
                        <h3>Conheça um pouco mais sobre cada tipo de papel</h3>
                        <Link to='/gramaturas'>Vamos lá!</Link>
                    </div>
                </section>
            </section>

            <section id='section-showcase'>
                <div className='showcase-wrapper'>
                    <div className='showcase-image-wrapper'>
                        <img src={foto} alt='imagem' />
                    </div>

                    <div className='showcase-text'>
                        <h1>Nosso objetivo</h1>

                        <p>
                            A Cactus é mais do que uma loja de encadernação
                            artesanal, por isso, com ela, trabalhamos pra que
                            cada dia mais se torne uma plataforma que
                            compartilha, inspira e cria arte, tudo junto com
                            você, artista. Por isso, acima de tudo, ADORAMOS
                            compartilhar as etapas da produção, criações dos
                            criativos em seus cactus e todos os processos de
                            criatividade. Assim buscamos tornar tudo isso ainda
                            maior.
                        </p>

                        <h2>Artistas e criativos,</h2>
                        <h2 className='highlight-showcase-text'>
                            contem com a Cactus
                        </h2>

                        <h3>🌵use #cactussketchbooks</h3>

                        <a href='#services-section'>Fazer arte</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
export default Home;
