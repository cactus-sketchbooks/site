import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header'
import Footer from '../../components/footer'

import firebase from 'firebase/app';
import firebaseConfig from '../../FirebaseConfig.js'

import './style.scss';

export default function Blog() {

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

                <h1>Bem-vindos ao Blog da Cactus</h1>

                <div className="cardsWrapper">

                    {dataBlog.map((item) => {

                        return (

                            <Link key={dataBlog.id} to={`/post/${item.id}`} className="blogCard">

                                <div className="thumbWrapper">

                                    <img draggable="false" src={item.imageUrl} alt="" />

                                </div>

                                <div className="postInfos">

                                    <h2>{item.title}</h2>

                                    <div className="autorInfos">

                                        {item.authorPicture !== undefined ? (

                                            <div className="pictureWrapper">

                                                <img draggable="false" src={item.authorPicture} alt="foto do autor" />

                                            </div>

                                        ) : (
                                        
                                            <p></p>
                                        
                                        )}

                                        <h4>{item.author}</h4>

                                    </div>

                                    <p>{item.desc}</p>

                                    <div className="hashtags">

                                        {item.hashtags ? (

                                            item.hashtags.map((hashtag => {

                                                return (

                                                    <span>{hashtag}</span>

                                                )

                                            }))


                                        )

                                            :

                                            (

                                                <p></p>

                                            )
                                        }

                                    </div>

                                    <div className="dateWrapper">

                                        {item.date !== undefined ?

                                            <h5>Postado em {item.date}</h5>

                                            :

                                            <h5></h5>

                                        }

                                    </div>

                                </div>

                            </Link>

                        )

                    })}

                </div>

            </main>

            <Footer />

        </section>

    )

}
