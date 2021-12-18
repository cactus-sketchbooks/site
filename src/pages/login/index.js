import React from 'react';
import './style.scss';

import logo from '../../images/cactopng2.png';
import sapo from '../../images/sapofoto.png';
import garota from '../../images/garota.jpg';
import olhos from '../../images/olhos.jpg';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Login() {

    var carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3200,
        adaptiveHeight: true,
        pauseOnHover: false,
    };

    return (

        <section id="SectionLogin">

            <div className="loginDiv">

                <div className="imageLogoWrapper">

                    <a href="/"> <img src={logo} alt="logo cactus" /> </a>

                </div>

                <h1>Bem-vinde!</h1>

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

                <Slider className="slider" {...carouselSettings}>

                    <div className="sliderImg">

                        <img src={sapo} alt="Banner" />

                    </div>

                    <div className="sliderImg">

                        <img src={garota} alt="Banner" />

                    </div>

                    <div className="sliderImg">

                        <img src={olhos} alt="Banner" />

                    </div>

                </Slider>

            </div>

        </section >

    )
}