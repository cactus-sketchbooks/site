import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Redirect } from "react-router-dom";

import './style.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FirebaseConfig.js'

import logoCactus from '../../images/cactopng2.png';

export default function ForgotPassword() {

    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);

    function handleUserEmail (event) {

        setUserEmail(event.target.value)
        console.log(userEmail)

    }

    function sendEmailPasswordReset() {

        firebase.auth().languageCode = 'pt';

        firebase.auth().sendPasswordResetEmail(userEmail)
        .then(() => {

            window.alert(`Um e-mail para a recuperação de sua senha foi enviado para ${userEmail}`)

        })
        .catch((error) => {

            // var errorCode = error.code
            // var errorMessage = error.message

            window.alert('Não foi possível solicitar a recuperação de senha. Certifique-se que o e-mail inserido está cadastrado ou está escrito de forma correta. Caso o erro persista, tente novamente mais tarde.')

        });

    } 

    return (

        <main id="mainPasswordRecovery">

            <a href="/" className="passwordRecoveryImageWrapper">

                <img src={logoCactus} alt="Logo Armazém do Vinho" />

            </a>

            <div className="passwordRecoveryWrapper">

                <h1>Insira aqui seu e-mail</h1>

                <p>Insira seu e-mail cadastrado no nosso site e clique no botão de recuperar a senha. Após isso, um e-mail de recuperação será enviado. Lembre-se de verificar a caixa de spam.</p>
        
                <input onChange={handleUserEmail} type="text" placeholder="E-mail"/>

                <button onClick={() => sendEmailPasswordReset()}>Recuperar senha</button>
                <Link to="/" >Voltar à página inicial</Link>

            </div>

        </main>

    )

}
