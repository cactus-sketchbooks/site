import React, { useState, createRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../FirebaseConfig.js';
import logo from '../../images/cactopng.png';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function Header() {
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [header, setHeader] = useState(false);

    const changeBackgroundColor = () => {
        if (window.scrollY >= 40) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    const menuMobile = createRef();

    function onAuthStateChanged(user) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setUserIsLogged(true);
        });
    }

    function showMenuMobile() {
        if (isChecked) menuMobile.current.style.display = 'none';
        else menuMobile.current.style.display = 'flex';
    }

    window.addEventListener('scroll', changeBackgroundColor);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        onAuthStateChanged();
    }, []);

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');

        firebase
            .database()
            .ref('admins/')
            .get('/admins')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);

                    temp.map((item) => {
                        if (item.email === userEmail) {
                            setIsAdmin(true);
                        }
                    });
                } else console.log('No data available');
            });
    }, []);


    const location = useLocation();
    const pathName = location.pathname;

    let divClass = '';

    if (pathName === '/') {
        divClass = 'postDate';
    } else {
        divClass = 'displayNone';
    }

    return (
        <div>
            <header className={header ? 'header active' : 'header'}>
                <div className='innerHeader'>
                    <div onClick={scrollToTop} className='logo'>
                        <Link to='/'>
                            {' '}
                            <img src={logo} alt='Logo' />
                        </Link>
                    </div>

                    {window.innerWidth < 820 ? (
                        <div className='linkWrapper'>
                            <Link to='/carrinho'>Carrinho</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className='menu'>
                        {isAdmin ? (
                            <>
                                <ul>
                                    <li>
                                        <Link onClick={scrollToTop} to='/sobre'>
                                            {' '}
                                            Quem Somos{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/admin'>
                                            {' '}
                                            Admin{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/contato'>
                                            {' '}
                                            Contato{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={scrollToTop}
                                            to='/nossosClientes'
                                        >
                                            {' '}
                                            Use e Apareça{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/carrinho'>
                                            {' '}
                                            Carrinho{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/login'>
                                            {' '}
                                            Login{' '}
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul>
                                    <li>
                                        <Link onClick={scrollToTop} to='/sobre'>
                                            {' '}
                                            Quem Somos{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/contato'>
                                            {' '}
                                            Contato{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={scrollToTop}
                                            to='/nossosClientes'
                                        >
                                            {' '}
                                            Use e Apareça{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/carrinho'>
                                            {' '}
                                            Carrinho{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={scrollToTop} to='/login'>
                                            {' '}
                                            Login{' '}
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>

                    <div className='sandwich'>
                        <input
                            type='checkbox'
                            id='checkbox'
                            onClick={() => {
                                setIsChecked(!isChecked);
                                showMenuMobile();
                                window.scrollTo(0, 0);
                            }}
                        />

                        <label htmlFor='checkbox'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                </div>
                <div className={divClass}>
                    <h3>5 dias de produção + 2 dias úteis para postagem</h3>
                </div>
            </header>

            <div className='menu-mobile' ref={menuMobile}>
                {isAdmin ? (
                    <>
                        <ul>
                            <li>
                                <Link to='/sobre'> Quem Somos </Link>
                            </li>
                            <li>
                                <Link to='/admin'> Admin </Link>
                            </li>
                            <li>
                                <Link to='/contato'> Contato </Link>
                            </li>
                            <li>
                                <Link to='/nossosClientes'>
                                    {' '}
                                    Use e Apareça{' '}
                                </Link>
                            </li>
                            <li>
                                <Link to='/carrinho'> Carrinho </Link>
                            </li>
                            <li>
                                <Link to='/login'> Login </Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul>
                            <li>
                                <Link to='/sobre'> Quem Somos </Link>
                            </li>
                            <li>
                                <Link to='/admin'> Admin </Link>
                            </li>
                            <li>
                                <Link to='/contato'> Contato </Link>
                            </li>
                            <li>
                                <Link to='/nossosClientes'>
                                    {' '}
                                    Use e Apareça{' '}
                                </Link>
                            </li>
                            <li>
                                <Link to='/carrinho'> Carrinho </Link>
                            </li>
                            <li>
                                <Link to='/login'> Login </Link>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
