import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import './style.scss';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function ClientList() {
    const [dataUsers, setDataUsers] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [data, setData] = useState([]);
    const [displaySearchResult, setDisplaySearchResult] = useState('none');
    const [dataBackup, setDataBackup] = useState([]);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        firebase
            .database()
            .ref('users')
            .get('/users')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);
                    setDataUsers(temp);
                    setData(temp);
                    setDataBackup(temp);
                } else {
                    console.log('No data available');
                }
            });
    }, []);

    function handleSearchInput(event) {
        if (event.key === 'Enter') {
            clearSearchName();
            searchName();
        }
        setSearchInput(event.target.value);
    }

    function searchName() {
        var name = [];

        data.map((item) => {
            var nameToSearch = item.name.toLowerCase();
            var search = searchInput.toLowerCase();

            if (nameToSearch.includes(search)) name.push(item);
        });

        setDataUsers(name);
        setDisplaySearchResult('flex');
    }

    function clearSearchName() {
        setDisplaySearchResult('none');
        setDataUsers(dataBackup);
    }

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
            <div className='ClientListPage'>
                <Header />

                <main id='mainClientList'>
                    <h1>Informações dos usuários</h1>

                    <div className='filterName'>
                        <h3>Pesquisa por nome</h3>

                        <div className='searchName'>
                            <input
                                type='text'
                                placeholder='Dê Enter para realizar a busca'
                                onKeyDown={handleSearchInput}
                            />
                        </div>
                    </div>

                    <section
                        style={{ display: displaySearchResult }}
                        className='searchNameResult'
                    >
                        <div className='divSearchNameResult'>
                            <a
                                onClick={() => {
                                    clearSearchName();
                                }}
                            >
                                Limpar pesquisa
                            </a>
                            <h2>Resultado da busca</h2>
                        </div>
                    </section>

                    {dataUsers.map((item) => (
                        <div className='boxClientList'>
                            <h3>{item.name}</h3>

                            <div>
                                <div>
                                    <p>
                                        <b>Telefone</b>: {item.phoneNumber}
                                    </p>
                                    <p>
                                        <b>E-mail</b>: {item.email}
                                    </p>
                                    <p>
                                        <b>Data de nascimento</b>:{' '}
                                        {item.birthDate}{' '}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <b>Cidade</b>: {item.city}
                                    </p>
                                    <p>
                                        <b>UF</b>: {item.state}
                                    </p>
                                    <p>
                                        <b>CEP</b>: {item.cepNumber}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <b>Rua</b>: {item.address}
                                    </p>
                                    <p>
                                        <b>Bairro</b>: {item.district}
                                    </p>
                                    <p>
                                        <b>Complemento</b>: {item.complement}
                                    </p>
                                    <p>
                                        <b>N°</b>: {item.houseNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>

                <Footer />
            </div>
        );
    } else {
        return (
            <div className='Admin'>
                <Header />

                <main id='mainRegister'>
                    <div className='adminRegister'>
                        <div className='titleAdmin'>
                            <h1>Bem vindos, equipe da Cactus </h1>
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
