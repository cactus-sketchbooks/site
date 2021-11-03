import React from 'react';
import './style.scss';

import logo from '../../images/cactopng2.png';
import sapo from '../../images/sapofoto.png';

// import Header from '../../components/header/index.js';
// import Footer from '../../components/footer/index.js';

export default function Login() {

    return (

            <section id="SectionLogin">

                <div className="loginDiv">

                    <div className="imageLogoWrapper">

                       <a href="/"> <img src={logo} alt="logo cactus" /> </a>

                    </div>

                    <h1>Bem-vinde</h1>

                    <fieldset>

                        <input name='email' placeholder='E-mail' />

                        <input name='password' type='password' placeholder='Senha' />

                    </fieldset>

                    <div className="optionsLogin">

                        <div className="loginRedirects">

                            <a href='/cadastro' >Registrar</a>
                            <a href='/mudarSenha' >Esqueceu a senha?</a>

                        </div>

                        <button>Login</button>

                    </div>

                </div>

                <div className="loginImageWrapper">

                    <img src={sapo} alt="foto" />

                </div>

            </section >

    )
}