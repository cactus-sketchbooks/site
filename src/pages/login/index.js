import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './style.scss';

import logo from '../../images/logoCactus2.png';
import sapo from '../../images/sapofoto.png';
import garota from '../../images/garota.jpg';
import olhos from '../../images/olhos.jpg';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../FirebaseConfig.js';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [userIsLogged, setUserIsLogged] = useState(false);

    function makeLogin() {
        firebase
            .auth()
            .signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((userCredential) => {
                var user = userCredential.user;
                localStorage.setItem('userEmail', loginData.email);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(
                    'Ocorreu um erro ao efetuar o login, verifique o nome de usuário e senha e tente novamente!'
                );
            });
    }

    function handleInputLoginChange(event) {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    function onAuthStateChanged(user) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setUserIsLogged(true);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged();
    }, []);

    if (userIsLogged) {
        return <Redirect to='/Perfil' />;
    } else {
        return (
            <section id='SectionLogin'>
                <div className='loginDiv'>
                    <div className='imageLogoWrapper'>
                        <Link to='/'>
                            {' '}
                            <img src={logo} alt='logo cactus' />{' '}
                        </Link>
                    </div>

                    <h1>Bem-vinde!</h1>

                    <fieldset>
                        <input
                            name='email'
                            onChange={handleInputLoginChange}
                            placeholder='E-mail'
                        />

                        <input
                            name='password'
                            onChange={handleInputLoginChange}
                            type='password'
                            placeholder='Senha'
                        />
                    </fieldset>

                    <div className='optionsLogin'>
                        <div className='loginRedirects'>
                            <a href='/cadastro'>Registrar</a>
                            <a href='/recuperarSenha'>Esqueceu a senha?</a>
                        </div>

                        <button onClick={makeLogin}>Login</button>
                    </div>
                </div>

                <div className='loginImageWrapper'>
                    <Slider className='slider' {...carouselSettings}>
                        <div className='sliderImg'>
                            <img src={sapo} alt='Banner' />
                        </div>

                        <div className='sliderImg'>
                            <img src={garota} alt='Banner' />
                        </div>

                        <div className='sliderImg'>
                            <img src={olhos} alt='Banner' />
                        </div>
                    </Slider>
                </div>
            </section>
        );
    }
}
