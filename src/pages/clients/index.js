import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import clientPhoto from '../../images/talin.JPG';


function Clients() {


    const clients = [
        {
            name: "Fulano de tal da silva souza",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "1",
        },
        {
            name: "Sicrano dos santos das neves carvalho",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
            feedback: "Lorem Ipsum Ips sit amet consect et dolor",
            picture: clientPhoto,
            key: "2",
        },
    ];

    return (
        <div>
            <Header />
            <section id="clients-body">
                {clients.map((item, index) => (
                    <nav className="clientInfos">
                        <header>
                            <img src={item.picture} alt=""></img>
                            <h1>{item.name}</h1>
                        </header>
                        <article>
                            <aside className="clientWork">
                                <h2>{item.description}</h2>
                                <img src={item.picture} alt=""></img>
                            </aside>
                            <aside className="clientWork">
                                <h3>{item.feedback}</h3>
                            </aside>
                        </article>
                    </nav>
                ))}
            </section >
            <Footer />
        </div>
    )
} export default Clients;