import React, { useState, createRef } from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './style.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FirebaseConfig.js'
import logo from '../../images/cactopng.png';

export default function Header() {

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccount, setDataAccount] = useState([]);
    const [header, setHeader] = useState(false);

    const changeBackgroundColor = () => {
        if (window.scrollY >= 40) {
            setHeader(true);
        } else {
            setHeader(false);
        };
    };

    const [isChecked, setIsChecked] = useState(false);

    const menuMobile = createRef()

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none';
        else
            menuMobile.current.style.display = 'flex';

    }

    window.addEventListener('scroll', changeBackgroundColor);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    setDataUsers(temp)

                    temp.map((item) => {

                        if (item.email === userEmail) {
                            setDataAccount(item)
                        }

                    })

                } else
                    console.log("No data available");

            })

        firebase.database().ref('admins/').get('/admins')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail) {
                            setIsAdmin(true)
                        }

                    })

                } else
                    console.log("No data available");

            })

    }, []);

    return (

        <div>

            <header className={header ? 'header active' : 'header'}>

                <div onClick={scrollToTop} className='logo' >

                    <Link to="/"> <img src={logo} alt="Logo" /> </Link>

                </div>

                <div className='menu' >

                    {isAdmin ?

                        <>

                            <ul>
                                <li><Link onClick={scrollToTop} to="/sobre"> Quem Somos </Link></li>
                                <li><Link onClick={scrollToTop} to="/admin"> Admin </Link></li>
                                <li><Link onClick={scrollToTop} to="/contato"> Contato </Link></li>
                                <li><Link onClick={scrollToTop} to="/blog"> Nossos Clientes </Link></li>
                                <li><Link onClick={scrollToTop} to="/carrinho"> Carrinho </Link></li>
                                <li><Link onClick={scrollToTop} to="/login"> Login </Link></li>
                            </ul>

                        </>

                        :

                        <>

                            <ul>
                                <li><Link onClick={scrollToTop} to="/sobre"> Quem Somos </Link></li>
                                <li><Link onClick={scrollToTop} to="/contato"> Contato </Link></li>
                                <li><Link onClick={scrollToTop} to="/blog"> Nossos Clientes </Link></li>
                                <li><Link onClick={scrollToTop} to="/carrinho"> Carrinho </Link></li>
                                <li><Link onClick={scrollToTop} to="/login"> Login </Link></li>
                            </ul>

                        </>

                    }

                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={() => {

                        setIsChecked(!isChecked);
                        showMenuMobile()
                        window.scrollTo(0, 0)

                    }} />

                    <label htmlFor="checkbox" >

                        <span></span>
                        <span></span>
                        <span></span>

                    </label>

                </div>
            </header>

            <div className='menu-mobile' ref={menuMobile} >

                {isAdmin ?

                    <>

                        <ul>
                            <li><Link to="/sobre"> Quem Somos </Link></li>
                            <li><Link to="/admin"> Adim </Link></li>
                            <li><Link to="/contato"> Contato </Link></li>
                            <li><Link to="/clientes"> Nossos Clientes </Link></li>
                            <li><Link to="/carrinho"> Carrinho </Link></li>
                            <li><Link to="/login"> Login </Link></li>
                        </ul>

                    </>

                    :

                    <>

                        <ul>

                            <li><Link to="/sobre"> Quem Somos </Link></li>
                            <li><Link to="/admin"> Admin </Link></li>
                            <li><Link to="/contato"> Contato </Link></li>
                            <li><Link to="/clientes"> Nossos Clientes </Link></li>
                            <li><Link to="/carrinho"> Carrinho </Link></li>
                            <li><Link to="/login"> Login </Link></li>

                        </ul>

                    </>

                }

            </div>

        </div>
    )
}