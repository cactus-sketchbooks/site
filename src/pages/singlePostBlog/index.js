import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

import instagram from '../../images/instagram2.svg'
import behance from '../../images/behance.svg'
import youtube from '../../images/youtube.svg'

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

        <main id="MainBlog">

            <Header />

            <section id="PostAuthorSection">

                <div className="textIntroWrapper">

                    <span>Publicado em {dataPost.date}</span>

                    <h1>{dataPost.title}</h1>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, repudiandae possimus? Quod ullam odit molestias quae mollitia beatae dignissimos voluptas, earum quos similique nobis ab.</p>

                    <ul>

                        {dataPost.hashtags ? (

                            <>

                                {
                                    dataPost.hashtags.map((hashtag) => {

                                        return (

                                            <li>{hashtag}</li>

                                        )

                                    })
                                }

                            </>


                        ) : ('')

                        }

                    </ul>

                </div>

                <div className="authorInfos">

                    <div className="authorImgWrapper">

                        <img src={dataPost.authorPicture} alt="" />

                    </div>

                    <div className="authorSocials">

                        <h1>{dataPost.author}</h1>

                        <div className="socialMediaWrapper">

                            {dataPost.instagram ?

                                (
                                    <div className="socialMedias">

                                        <a id="socialMediaLink" target="_blank" href={dataPost.instagram}><img src={instagram} alt="" /></a>

                                    </div>

                                ) : ('')

                            }

                            {dataPost.behance ?

                                (
                                    <div className="socialMedias">

                                        <a id="socialMediaLink" target="_blank" href={dataPost.behance}><img src={behance} alt="" /></a>

                                    </div>

                                ) : ('')

                            }

                            {dataPost.youtube ?

                                (
                                    <div className="socialMedias">

                                        <a id="socialMediaLink" target="_blank" href={dataPost.youtube}><img src={youtube} alt="" /></a>

                                    </div>

                                ) : ('')

                            }

                        </div>

                    </div>

                </div>

                <div className="postImgWrapper">

                    <img src={dataPost.imageUrl} alt="" />

                </div>



            </section>

            <section id="PostTextSection">

                <p>{dataPost.paragraphs}</p>

            </section>

            <Footer />

        </main>

    )

}