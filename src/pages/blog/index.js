import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header'
import Footer from '../../components/footer'

import illustration from '../../images/illustration.png'

import firebase from 'firebase/app';
import firebaseConfig from '../../FirebaseConfig.js'

import './style.scss';

export default function Clients() {

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    const [dataBlog, setDataBlog] = useState([{}])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('posts/');
        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataBlog(temp.reverse())

            }

        })

    }, []);

    return (

        <section id='Blog' >

            <Header />

            <main id='mainBlog'>

                <div className="highlightWrapper">

                    <div className="textDiv">

                        <h1>Confira sobre quem cria com um Cactus!</h1>

                        <p>Pensando em todos os artistas que expressam sua arte nas páginas de um cactus, desenvolvemos o "use e apareça". Projetos e o trabalho de artistas que vivem da arte e adoramos compartilhar aqui. Aos que gostariam de conhecer esses criatives, que mantém a Cactus viva com seus idealizadores, vem com a gente! <br />Gostaria de aparecer também? Crie com seu cactus físico ou digital e poste no Instagram marcando o nosso "@cactussketchbooks" na foto! Use também a #cactussketchbooks na publicação.</p>

                        <Link to="/">Fazer arte!</Link>

                    </div>

                    <div className="illustrationDiv">

                        <img src={illustration} alt="" />

                    </div>

                </div>

                <div className="cardsWrapper">

                    {dataBlog.map((item) => (

                        <Link key={item.id} to={`/post/${item.id}`} className="blogCard">

                            <div className="blogImgWrapper">

                                <div className="authorPictureWrapper">

                                    <img src={item.authorPicture} alt="" />

                                </div>

                                <img src={item.imageUrl} alt="" />

                            </div>

                            <div className="blogTextWrapper">

                                <div className="hashtagWrapper">

                                    {item.hashtags ? (

                                        <>

                                            {item.hashtags.map((hashtag) => {

                                                return (

                                                    <span>{hashtag}</span>

                                                )

                                            })}

                                        </>

                                    ) : ('')}


                                </div>
                                {/* 
                                <h3>CSS: Mecanismo de programação que deu cores e formas para a Web</h3>
                                <span id="postDate">Publicado em {item.date}</span> */}
                                <h3>{item.title}</h3>
                                <span id="postDate">Publicado em {item.date}</span>

                            </div>

                        </Link>

                    ))}

                </div>

            </main>

            <Footer />

        </section>

    )

}
