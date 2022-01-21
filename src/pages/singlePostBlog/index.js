import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

import instagram from '../../images/instagram2.svg'
import behance from '../../images/behance.svg'

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

            <section id="PostAuthorSection">

                <div className="postImgWrapper">

                    <img src={dataPost.imageUrl} alt="" />

                </div>

                <Link to="/nossosClientes">Voltar</Link>

                <div className="authorImgWrapper">

                    <img src={dataPost.authorPicture} alt="" />

                </div>
                
                <span>Fulano de tal</span>

                <div className="socialMediaWrapper">

                    <div className="socialMedias">

                        <img src={instagram} alt="" />

                    </div>

                    <div className="socialMedias">

                        <img src={behance} alt="" />

                    </div>

                </div>

            </section>

            <section id="PostTextSection">

                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
                <span>Publicado em {dataPost.date}</span>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, dolorem quam nisi mollitia ipsa quo sed tempora vel, unde quos earum pariatur soluta velit blanditiis reiciendis perspiciatis rerum sint consectetur debitis ipsum. Explicabo eos, dolores magnam sequi quod rerum hic tempore consectetur voluptas deleniti praesentium veritatis deserunt eius. Consectetur omnis eos enim natus. Quia, minima ex vitae velit libero id exercitationem illo voluptates labore doloribus delectus impedit obcaecati molestias facilis accusantium corporis maiores cupiditate unde placeat minus suscipit ad ab architecto. Cumque placeat culpa doloremque pariatur, fuga est veniam deserunt, iste, iusto enim vel nobis accusamus nostrum illo quidem ipsum? Maiores unde deserunt veniam quod inventore vel nobis pariatur ullam dolor maxime nemo qui quibusdam, at eligendi iste aut consequuntur rerum. Voluptatem quos eos voluptas et hic ipsa at ea aut quibusdam ex, atque labore harum magni nihil ab expedita rerum, facilis ipsum. Dignissimos, aspernatur neque? Eius animi ea debitis delectus illo id, itaque corrupti possimus! Nihil iure beatae atque rem itaque vel provident ducimus illum id reiciendis, pariatur quo rerum voluptate voluptatum neque consectetur libero voluptates! Laudantium omnis atque excepturi dolor, vitae recusandae inventore. Unde laborum asperiores reiciendis quo ipsa! Inventore, adipisci. Corporis non, placeat atque esse temporibus ipsa molestias rerum, deserunt provident aliquid error blanditiis aliquam asperiores ex eum quia consequuntur possimus velit quis distinctio, vel illum aspernatur officiis. Nemo corporis quasi dolorum quo, quas facilis. Quaerat, sunt at voluptatum adipisci unde dignissimos, quae natus quas, odio corrupti pariatur nesciunt odit qui vel ipsa veniam? Voluptatibus, ut magnam ab saepe iusto veritatis alias, doloribus, quo praesentium necessitatibus similique dolorum deserunt! Voluptatum quaerat quisquam impedit cumque voluptates possimus nihil debitis corporis voluptatem reprehenderit porro veniam sunt obcaecati laboriosam fugiat vero dolorum ipsa dicta perferendis, accusamus beatae molestiae eos inventore deserunt. Non fugit veniam error unde, quaerat autem omnis laudantium?</p>

            </section>

            <Footer />

        </main>

    )

}