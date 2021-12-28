import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import clientPhoto from '../../images/talin.JPG';

function Clients() {

    const [displayModal, setDisplayModal] = useState("none");
    const [modalDataPost, setModalDataPost] = useState({});

    const clients = [
        {
            title: "A arte de falar merda",
            name: "Micaeela condoiseele barcle",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "1",
        },
        {
            title: "Como ser gostoso",
            name: "hanry cavill da silva",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "2",
        },
        {
            title: "aha ha ha",
            name: "kawai o foof",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "3",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "4",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "4",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "4",
        },
    ];

    function handleModalInfo(item) {
        setModalDataPost(item)
        displayModal === "none" ? setDisplayModal("flex") : setDisplayModal("none")
    }

    function closeModal() {
        if (displayModal === "none") setDisplayModal("flex")
        else setDisplayModal("none")
    }

    return (

        <main id="MainBlog">

            <Header />

            <section id="BlogCardsSection">

                <div className="headingText">

                    <h1>Use e apareça</h1>
                    <p>Adquira nossos sketchbooks e tenha a oportunidade de compartilhar sua experiência e arte conosco!</p>

                </div>

                <div className="cardsWrapper">

                    {clients.map((item) => {

                        return (

                            <div className="blogCard">

                                <div className="thumbWrapper">

                                    <img src={item.picture} alt="imagem do post" />

                                </div>

                                <div className="postInfos">

                                    <h1>{item.title}</h1>

                                    <div className="autorInfos">

                                        <div className="pictureWrapper">

                                            <img src={item.picture} alt="foto do autor" />

                                        </div>

                                        <h4>{item.name}</h4>

                                    </div>

                                    <p>{item.description}</p>

                                </div>

                                <div className="postText" style={{ display: displayModal }} role="dialog">
                                    <span onClick={closeModal}>X</span>
                                    <div className="postContent">

                                        <h1>{item.name}</h1>

                                        <p>{item.feedback}</p>

                                    </div>
                                </div>

                                <div className="btnWrapper">

                                    <Link to={`/post/${item.title}`}>Ler mais</Link>

                                </div>

                            </div>

                        )

                    })}

                </div>

            </section>

            <Footer />

        </main>

    )

} export default Clients;