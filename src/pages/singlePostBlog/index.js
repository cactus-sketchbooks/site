import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from '../../FirebaseConfig.js'

import './style.scss';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

export default function SinglePost() {

    const [path, setPath] = useState('');
    const [dataPost, setDataPost] = useState([]);
    const [dataBlog, setDataBlog] = useState([{}]);
    const [dataBlogExists, setDataBlogExists] = useState(false)

    // const location = useLocation();
    const idPost = useParams().idPost

    window.scrollTo(0, 0)

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('posts/');
        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                setDataBlogExists(true)
                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataBlog(temp)

            }

            else {

                setDataBlogExists(false)

            }
        })

    }, []);

    // useEffect(() => {

    //     setPath(location.pathname.split("/")[2]);

    // }, [])

    useEffect(() => {

        setPath(idPost)

    }, [])

    useEffect(() => {

        dataBlog.map((post => {

            if (post.id === path) {

                setDataPost(post)

            }

        }))

    }, [dataBlog])

    return (

        <main>

            <Header />

            <section id="PostSection">

                <div className="authorInfos">

                    <div className="postImageWrapper">

                        <img src={dataPost.imageUrl} alt="imagem da capa" />

                    </div>

                    <div className="authorWrapper">

                        <div className="pictureWrapper">

                            {dataPost.authorPicture ? (

                                <img src={dataPost.authorPicture} alt="Foto do autor" />

                            ) : (

                                <p></p>

                            )}

                        </div>

                        <div className="textInfos">

                            <h1 title={dataPost.author}>{dataPost.author}</h1>
                            <h5>{dataPost.date}</h5>

                        </div>

                        <div className="hashtags">

                            {dataPost.hashtags ? (

                                dataPost.hashtags.map((hashtag => {

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

                    </div>

                </div>

                <div className="postInfos">

                    <h1>{dataPost.title}</h1>

                    <h3>{dataPost.desc}</h3>

                    <div className="paragraphPost">

                        {
                            Array(dataPost.paragraphs).map((item) => (

                                <div style={{ width: "100%" }}>
                                    <p>{item}</p>
                                </div>

                            ))
                        }

                    </div>

                    {dataPost.file ? (

                        <a href={dataPost.file} target="_blank">Acessar arquivo disponibilizado</a>

                    ) : (

                        <p></p>

                    )}

                </div>

            </section>

            <Footer />

        </main>

    )

}