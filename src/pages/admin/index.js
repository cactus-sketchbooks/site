import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

export default function Admin() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [userIsLogged, setUserIsLogged] = useState(false);

    function makeLogin() {
        firebase
            .auth()
            .signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(() => {
                var userEmail = localStorage.getItem('userEmail');

                firebase
                    .database()
                    .ref('admins')
                    .get('/admins')
                    .then(function (snapshot) {
                        if (snapshot.exists()) {
                            var data = snapshot.val();
                            var temp = Object.keys(data).map(
                                (key) => data[key]
                            );

                            temp.map((item) => {
                                if (item.email === userEmail)
                                    setUserIsLogged(true);
                            });
                        } else {
                            console.log('No data available');
                        }
                    });

                localStorage.setItem('userEmail', loginData.email);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    function handleInputLoginChange(event) {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    useEffect(() => {
        var userEmail = localStorage.getItem('userEmail');

        firebase
            .database()
            .ref('admins')
            .get('/admins')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);

                    temp.map((item) => {
                        if (item.email === userEmail) setUserIsLogged(true);
                    });
                } else {
                    console.log('No data available');
                }
            });
    }, []);

    if (userIsLogged) {
        return (
            <main>
                <Header />

                <section id='SectionAdmin'>
                    <ul>
                        <Link to='/listaDeClientes'>Lista de clientes</Link>
                        <Link to='/gerenciarCores'>Gerenciar cores</Link>
                        <Link to='/cadastrarProdutos'>Cadastrar produtos</Link>
                        <Link to='/gerenciarProdutos'>Gerenciar produtos</Link>
                        <Link to='/gerenciarCupons'>Gerenciar cupons</Link>
                        {/* <Link to="/gerenciarTipos">Gerenciar tipos</Link> */}
                        <Link to='/pedidos'> Pedidos em andamento</Link>
                        {/* <Link to="">Alterar conteúdo das páginas</Link> */}
                        <Link to='criarPost'>
                            Criar um post na página "Use e Apareça"
                        </Link>
                    </ul>
                </section>

                <Footer />
            </main>
        );
    } else {
        return (
            <div className='Admin'>
                <Header />

                <main id='mainRegister'>
                    <div className='adminRegister'>
                        <div className='titleAdmin'>
                            <h1>Bem vindos, equipe da Cactus 🌵</h1>
                        </div>

                        <fieldset>
                            <h1>Entrar</h1>

                            <input
                                name='email'
                                onChange={handleInputLoginChange}
                                placeholder='E-mail'
                            />

                            <input
                                name='password'
                                type='password'
                                onChange={handleInputLoginChange}
                                placeholder='Senha'
                            />
                        </fieldset>

                        <div className='buttonsFormRegister'>
                            <Link id='enterButtonSignIn' onClick={makeLogin}>
                                Entrar
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }
}
