import { React, createRef } from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FirebaseConfig.js'

import { Link, useHistory } from "react-router-dom";

function UserProfile() {

    const [dataAccount, setDataAccount] = useState([]);
    const [displayDivAlterInfos, setDisplayDivAlterInfos] = useState("none");
    const [displayDivPedidos, setDisplayDivPedidos] = useState("none");

    let history = useHistory();

    useEffect(() => {

        window.scrollTo(0, 0);

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail)
                            setDataAccount(item)

                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    function signOut() {

        firebase.auth().signOut()
        localStorage.setItem('userEmail', '')
        history.push('/')

    }

    function handleDisplayDivAlterInfos() {

        if (displayDivAlterInfos === "none")
            setDisplayDivAlterInfos("flex")
        else
            setDisplayDivAlterInfos("none")

    }

    function handleDisplayDivPedidos() {

        if (displayDivPedidos === "none")
            setDisplayDivPedidos("flex")
        else
            setDisplayDivPedidos("none")

    }

    function deleteUser() {

        const user = firebase.auth().currentUser;
        
        user.delete().then(() => {
        
            window.alert("Usuário deletado com sucesso")

            firebase.auth().signOut()
            localStorage.setItem('userEmail', '')
            history.push('/')

            firebase.database()
            .ref('users/' + dataAccount.id)
            .remove()

        }).catch((error) => {
        
            if(error) {

                window.alert("Ocorreu um erro na tentativa de deletar sua conta. Tente novamente")

            }

        });

    }

    const [isChecked, setIsChecked] = useState(false);

    const menuMobile = createRef()

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none';
        else
            menuMobile.current.style.display = 'flex';

    }

    return (

        <div className="profilePage">

            <Header />

            <section id="DataSection">

                <h1>Seu perfil</h1>

                <div className="links">

                    <Link to="/meusPedidos">Ver meus pedidos</Link>
                    <Link to="/alterarDados">Alterar dados</Link>

                </div>
                    
                    <div className="userData">

                        <div className="boxInfoUser">

                            <h4>Nome: </h4>
                            <h4>{dataAccount.name}</h4>

                        </div>
                        
                        <div className="boxInfoUser">

                            <h4>E-mail: </h4>
                            <h4>{dataAccount.email}</h4>

                        </div>

                        <div className="boxInfoUser">

                            <h4>Data de nascimento: </h4>
                            <h4>{dataAccount.birthDate}</h4>

                        </div>

                        <div className="boxInfoUser">

                            <h4>Telefone: </h4>
                            <h4>{dataAccount.phoneNumber}</h4>

                        </div>

                        <div className="boxInfoUser">

                            <h4>Endereço: </h4>
                            <h4>{dataAccount.address} - {dataAccount.houseNumber}, {dataAccount.district}, {dataAccount.city} - {dataAccount.state}</h4>

                        </div>

                        <div className="boxInfoUser">

                            <h4>Complemento: </h4>
                            <h4>{dataAccount.complement}</h4>

                        </div>

                        <div className="boxInfoUser">

                            <h4>CEP: </h4>
                            <h4>{dataAccount.cepNumber}</h4>

                        </div>

                        <div className="buttonsWrapper">
                            
                            <button onClick={() => signOut()}>Sair da conta</button>
                            <button className="deleteButton" onClick={() => deleteUser()}>Excluir conta</button>

                        </div>

                    </div>

            </section>

            <Footer />

        </div>

    )

}

export default UserProfile;