import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header'
import Footer from '../../components/footer'

import illustration from '../../images/illustration.png'
import foto from '../../images/talin.JPG'

import firebase from 'firebase/app';
import firebaseConfig from '../../FirebaseConfig.js'

import './style.scss';

export default function Clients() {

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    const [dataBlog, setDataBlog] = useState([{}])
    const [dataBlogExists, setDataBlogExists] = useState(false)

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('posts/');
        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                setDataBlogExists(true)
                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataBlog(temp.reverse())

            }

            else {

                setDataBlogExists(false)

            }
        })

    }, []);

    return (

        <section id='Blog' >

            <Header />

            <main id='mainBlog'>

                <div className="highlightWrapper">

                    <div className="textDiv">

                        <h1>Adquira seu Cactus e exponha sua arte no nosso site!</h1>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, ipsa harum velit quam labore quisquam nihil ad beatae neque, quo molestiae. Odio neque tempora nemo!</p>

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
