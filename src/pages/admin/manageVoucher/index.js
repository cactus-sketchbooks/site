import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import './style.scss';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function ManageVoucher() {
    const [vouchers, setVouchers] = useState([]);
    const [isNewVoucherValidated, setIsNewVoucherValidated] = useState(false);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [voucherData, setVoucherData] = useState({
        voucherCode: '',
        beginDate: '',
        endDate: '',
        discountPercent: -1,
        minOrderValue: -1,
    });
    const [dataVoucherKeys, setDataVoucherKeys] = useState([]);
    const [selectVoucherToDelete, setSelectVoucherToDelete] = useState('');

    // confere se o ususario logado é admin
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

    // lê os cupons ja cadastrados
    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('vouchers/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setVouchers(
                    temp.sort((a, b) => {
                        return a.title > b.title
                            ? 1
                            : b.title > a.title
                            ? -1
                            : 0;
                    })
                );
            } else {
                console.log('No data available');
            }
        });
    }, []);

    // armazenas as keys ue identificam cada cupom
    useEffect(() => {
        if (vouchers) {
            var keys = [];
            vouchers.map((item) => keys.push(item.id));
            setDataVoucherKeys(keys);
        }
    }, [vouchers]);

    function handleInputLoginChange(event) {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
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

    function handleVoucherRegisterChange(event) {
        const { name, value } = event.target;

        setVoucherData({
            ...voucherData,
            [name]: value,
        });
    }
    function checkNewVoucherValidation() {
        if (
            voucherData.voucherCode === '' ||
            voucherData.beginDate === '' ||
            voucherData.endDate === '' ||
            voucherData.discountPercent < 0 ||
            voucherData.minOrderValue < 0 ||
            voucherData.beginDate > voucherData.endDate
        ) {
            alert(
                'Cupom não cadastrado. Confira todos os campos e tente novamente.'
            );
        } else {
            insertNewVoucher();
        }
    }

    function insertNewVoucher() {
        const id = firebase.database().ref().child('vouchers').push().key;

        const data = {
            id: id,
            voucherCode: voucherData.voucherCode,
            beginDate: voucherData.beginDate,
            endDate: voucherData.endDate,
            discountPercent: Number(voucherData.discountPercent),
            minOrderValue: Number(voucherData.minOrderValue),
        };

        firebase
            .database()
            .ref('vouchers/' + id)
            .set(data)
            .then((err) => console.log(err));

        setVoucherData({
            voucherCode: '',
            beginDate: '',
            endDate: '',
            discountPercent: -1,
            minOrderValue: -1,
        });

        alert('Cupom cadastrado com sucesso!');
        window.location.reload();
    }

    function handleSelectVoucherToDelete(event) {
        setSelectVoucherToDelete(event.target.value);
    }

    function deleteVoucher() {
        firebase
            .database()
            .ref('vouchers/' + dataVoucherKeys[selectVoucherToDelete])
            .remove()
            .then(() => alert('Cupom removido com sucesso!'));
    }

    if (userIsLogged) {
        return (
            <main>
                <Header />

                <section id='VoucherSection'>
                    <h1>Cadastro de Cupons</h1>

                    <label htmlFor='voucherCode'>
                        Insira o código do Cupom
                    </label>
                    <input
                        type='text'
                        id='voucherCode'
                        name='voucherCode'
                        onChange={handleVoucherRegisterChange}
                        placeholder='Código do Cupom'
                    />

                    <label htmlFor='beginDate'>Data de Início do Cupom:</label>
                    <input
                        type='date'
                        id='beginDate'
                        name='beginDate'
                        onChange={handleVoucherRegisterChange}
                    ></input>

                    <label htmlFor='endDate'>Data de Término do Cupom:</label>
                    <input
                        type='date'
                        id='endDate'
                        name='endDate'
                        onChange={handleVoucherRegisterChange}
                    ></input>

                    <label htmlFor='discountPercent'>
                        Porcentagem de disconto do Cupom:
                    </label>
                    <input
                        type='number'
                        id='discountPercent'
                        name='discountPercent'
                        min='0'
                        onChange={handleVoucherRegisterChange}
                    ></input>

                    <label htmlFor='minOrderValue'>
                        Valor minimo do pedido valido para o cupom
                    </label>
                    <input
                        type='number'
                        id='minOrderValue'
                        name='minOrderValue'
                        min='0'
                        onChange={handleVoucherRegisterChange}
                    ></input>

                    <button
                        onClick={() => {
                            checkNewVoucherValidation();
                        }}
                    >
                        Cadastrar Cupom
                    </button>
                </section>

                <section id='deleteVoucherSection'>
                    <fieldset>
                        <legend>
                            <h1>Excluir um Cupom</h1>
                        </legend>

                        <select
                            onChange={handleSelectVoucherToDelete}
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Selecione um cupom
                            </option>
                            {vouchers.map((item, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {item.voucherCode} - (
                                        {item.discountPercent}%)
                                    </option>
                                );
                            })}
                        </select>

                        <button
                            id='deleteButton'
                            onClick={() => {
                                deleteVoucher();
                            }}
                        >
                            Apagar
                        </button>
                    </fieldset>
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
