import React from 'react';
import { useEffect, useState } from 'react'

import InputMask from 'react-input-mask';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import firebaseConfig from '../../FirebaseConfig.js'

import { Link, Redirect } from 'react-router-dom';

import './style.scss';

import logo from '../../images/cactopng2.png';

export default function SignUp() {

    const [selectedUf, setSelectedUf] = useState('')
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);

    const [registerData, setRegisterData] = useState({

        name: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        cepNumber: '',
        address: '',
        city: '',
        state: '',
        houseNumber: '',
        district: '',
        complement: '',
        password: '',
        passwordConfirm: '',

    })

    function makeRegister() {

        firebase.auth()
            .createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then((user) => {

                const id = firebase.database().ref().child('posts').push().key

                firebase.database().ref('users/' + id).set({

                    name: registerData.name,
                    email: registerData.email,
                    phoneNumber: registerData.phoneNumber,
                    birthDate: registerData.birthDate,
                    cepNumber: registerData.cepNumber,
                    address: registerData.address,
                    city: registerData.city,
                    state: selectedUf,
                    houseNumber: registerData.houseNumber,
                    district: registerData.district,
                    complement: registerData.complement,
                    id: id

                })

                localStorage.setItem('id', id)

                alert('Cadastro realizado com sucesso!')

                setRegisterDone(true)

            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // alert(errorMessage)
                alert('A senha deve possuir pelo menos 6 caracteres')
            });

    }

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setRegisterData({

            ...registerData, [name]: value

        })

    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    function handleSelectedUf(event) {

        setSelectedUf(event.target.value)

    }

    function makeVerifications() {

        var counter = 0

        registerData.name !== '' ? counter++ : counter = counter
        registerData.email !== '' ? counter++ : counter = counter
        registerData.password !== '' ? counter++ : counter = counter
        registerData.passwordConfirm !== '' ? counter++ : counter = counter
        registerData.phoneNumber !== '' ? counter++ : counter = counter
        registerData.birthDate !== '' ? counter++ : counter = counter
        registerData.cepNumber !== '' ? counter++ : counter = counter
        registerData.city !== '' ? counter++ : counter = counter
        selectedUf !== '' ? counter++ : counter = counter
        registerData.houseNumber !== '' ? counter++ : counter = counter
        registerData.address !== '' ? counter++ : counter = counter
        registerData.district !== '' ? counter++ : counter = counter
        registerData.complement !== '' ? counter++ : counter = counter

        if (counter === 13) {

            if (registerData.password !== registerData.passwordConfirm) {

                alert('As senhas não são iguais!');

            }

            else {

                makeRegister();

            }

        }

        else {

            alert('Você precisa preencher todos os campos!')

        }

    }

    if (userIsLogged) {

        return (

            <Redirect to='/' />

        )

    } else {

        if (registerDone) {

            return (

                <Redirect to='/' />

            )

        } else {

            return (

                <section id="SectionSignUp">

                    <div className="textIntroSignUp">

                        <div className="imageLogoWrapper">

                            <Link to="/"> <img src={logo} alt="logo cactus" /> </Link>

                        </div>

                        <h1>Faça arte. <br />Crie com a Cactus.</h1>

                    </div>

                    <div className="signUpDiv">

                        <div className="formRegister">

                            <input id='name' name='name' onChange={handleInputRegisterChange} placeholder='Nome completo' />
                            <input id='email' name='email' onChange={handleInputRegisterChange} placeholder='E-mail' />

                            <div className="passwordDiv">

                                <input id='password' name='password' type="password" onChange={handleInputRegisterChange} placeholder='Senha' />
                                <input id='passwordConfirm' name='passwordConfirm' type="password" onChange={handleInputRegisterChange} placeholder='Confirmação de senha' />

                            </div>

                            <InputMask
                                id='phoneNumber' 
                                name='phoneNumber' 
                                type='tel' 
                                mask="(99) 99999-9999" 
                                maskChar="" 
                                onChange={handleInputRegisterChange} 
                                placeholder='Telefone com DDD' 
                            />

                            <InputMask 
                                id='birthDate' 
                                name='birthDate' 
                                type='text'
                                mask="99/99/9999" 
                                maskChar="" 
                                onChange={handleInputRegisterChange} 
                                placeholder="Data de nascimento" 
                            />
                            
                            <InputMask 
                                id='cepNumber' 
                                name="cepNumber" 
                                type='text' 
                                mask="99999-999" 
                                maskChar="" 
                                onChange={handleInputRegisterChange} 
                                placeholder="CEP" 
                            />

                            <div className="cityDiv">

                                <select onChange={handleSelectedUf} name="state" id="uf">

                                    <option disabled selected value="" >Estado</option>

                                        <option value="AC">AC</option>
                                        <option value="AL">AL</option>
                                        <option value="AP">AP</option>
                                        <option value="AM">AM</option>
                                        <option value="BA">BA</option>
                                        <option value="CE">CE</option>
                                        <option value="DF">DF</option>
                                        <option value="ES">ES</option>
                                        <option value="GO">GO</option>
                                        <option value="MA">MA</option>
                                        <option value="MT">MT</option>
                                        <option value="MS">MS</option>
                                        <option value="MG">MG</option>
                                        <option value="PA">PA</option>
                                        <option value="PB">PB</option>
                                        <option value="PR">PR</option>
                                        <option value="PE">PE</option>
                                        <option value="PI">PI</option>
                                        <option value="RJ">RJ</option>
                                        <option value="RN">RN</option>
                                        <option value="RS">RS</option>
                                        <option value="RO">RO</option>
                                        <option value="RR">RR</option>
                                        <option value="SC">SC</option>
                                        <option value="SP">SP</option>
                                        <option value="SE">SE</option>
                                        <option value="TO">TO</option>

                                </select>

                                <input name="city" id="localidade" onChange={handleInputRegisterChange} placeholder="Cidade" />

                            </div>

                            <input id='address' name='address' onChange={handleInputRegisterChange} placeholder='Endereço' />
                            <input id='houseNumber' name='houseNumber' type='number' onChange={handleInputRegisterChange} placeholder='Número' />
                            <input id='district' name='district' onChange={handleInputRegisterChange} placeholder='Bairro' />
                            <input id='complement' name='complement' onChange={handleInputRegisterChange} placeholder='Complemento' />

                            <div className="legalTermsWrapper">

                                <p>Ao clicar em "Cadastrar" você estará concordando com os <Link to="/termosDeUso" target="_blank" rel="norreferer">Termos de Uso</Link> e <Link to="/politicaDePrivacidade" target="_blank" rel="norreferer">Política de Privacidade</Link> </p>

                            </div>

                            <button onClick={() => { makeVerifications() }}>Cadastrar</button>

                        </div>

                    </div>

                </section >

            )
        }
    }
}