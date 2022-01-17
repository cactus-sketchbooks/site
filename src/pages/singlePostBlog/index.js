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
                console.log(post)

            }

        }))

    }, [dataBlog])

    return (

        <main>

            <Header />

            <section id="PostSection">

                <div className="textIntroWrapper">

                    {/* <h1>{dataPost.title}</h1> */}
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur voluptatum id minus accusantium! Sunt, velit.</p>

                </div>

                <div className="postImgWrapper">

                    <img src={dataPost.imageUrl} alt="imagem" />

                </div>

                <div className="postContent">

                    <div className="headingInfos">

                        <div className="authorPictureWrapper">

                            <img src={dataPost.authorPicture} alt="" />

                        </div>

                        <span>Por {dataPost.author}</span>

                        <span>{dataPost.date}</span>

                    </div>

                    <div className="postTextContent">

                        {/* <h3>{dataPost.title}</h3> */}
                        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque corporis quos, illum aut ad illo!</h3>

                    </div>

                </div>

            </section>

            <Footer />

        </main>

    )

}