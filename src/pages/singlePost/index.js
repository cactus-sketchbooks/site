import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './style.scss';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import clientPhoto from '../../images/talin.JPG';

export default function SinglePost() {

    const [path, setPath] = useState('');
    const [dataPost, setDataPost] = useState([]);

    const location = useLocation();

    useEffect(() => {

        setPath(location.pathname.split("/")[2]);

    }, [])

    const clients = [
        {
            title: "A arte de falar merda",
            name: "Micaeela condoiseele barcle",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "1",
        },
        {
            title: "Como ser gostoso",
            name: "hanry cavill da silva",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "2",
        },
        {
            title: "aha ha ha",
            name: "kawai o foof",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "3",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "4",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "4",
        },
        {
            title: "homiaranha",
            name: "Beltrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            picture: clientPhoto,
            key: "4",
        },
    ];

    useEffect(() => {

        clients.map((post => {

            if (post.title === path) {

                setDataPost(post)
                console.log(post)

            }

        }))

    }, [path])

    return (

        <main>

            <Header />

                <section id="PostSection">

                    <div className="postImageWrapper">

                        <img src={dataPost.picture} alt="imagem da capa" />

                    </div>

                    <div className="postInfos">

                        <h1>{dataPost.title}</h1>
                        <h3>{dataPost.name}</h3>

                    </div>

                    <p>{dataPost.feedback}</p>

                </section>

            <Footer />

        </main>

    )

}