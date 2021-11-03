import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function Contact() {
    return (
        <div>
            <Header />
            <section id="contact-body">
                <h1>Contato</h1>
                <p> Preencha os campos abaixo e clique em "Enviar Mensagem"</p>

                <form class="contact-form">

                    <input type="text" className="text-box" name="user_name" placeholder="Nome*"/>

                    <input type="text" className="text-box" name="user_email" placeholder="Seu E-mail*"/>

                    <input type="text" className="text-box" name="user_number" placeholder="Telefone*"/>

                    <textarea className="message-box" name="message" cols="30" rows="8" placeholder="Sua mensagem*"/>
                    
                    <div className="button-contact">
                        <input id='enterButtonSignIn' type="submit" className="submitBox" value="Enviar Mensagem"></input>
                    </div>

                </form>
            </section >
            <Footer />
        </div>
    )
} export default Contact;