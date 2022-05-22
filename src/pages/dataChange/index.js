import { React } from 'react';
import { useEffect, useState } from 'react';

import InputMask from 'react-input-mask';

import Header from '../../components/header';
import Footer from '../../components/footer';
import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../FirebaseConfig.js';

export default function ChangeInfos() {
    const [dataAccount, setDataAccount] = useState([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [registerData, setRegisterData] = useState({
        address: '',
        birthDate: '',
        cepNumber: '',
        city: '',
        complement: '',
        district: '',
        email: '',
        houseNumber: '',
        name: '',
        phoneNumber: '',
        state: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        const userEmail = localStorage.getItem('userEmail');

        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

        firebase
            .database()
            .ref('users/')
            .get('/users')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);

                    temp.map((item) => {
                        if (item.email === userEmail) setDataAccount(item);
                    });
                } else {
                    console.log('No data available');
                }
            });
    }, []);

    function handleInputRegisterChange(event) {
        const { name, value } = event.target;

        setRegisterData({
            ...registerData,
            [name]: value,
        });
    }

    // function handleInputEmailChange(event) {

    //     const { name, value } = event.target

    //     setRegisterData({

    //         ...registerData, [name]: value

    //     })

    //     const user = firebase.auth().currentUser;

    //     user.updateEmail(registerData.email).then(() => {
    //     }).catch((error) => {

    //         if (error) {

    //             window.alert("Não foi possível atualizar seu e-mail. Tente novamente")

    //         }

    //     });

    // }

    function updateRegister() {
        const user = firebase.auth().currentUser;

        if (registerData.email) {
            user.updateEmail(registerData.email)
                .then(() => {
                    localStorage.setItem('userEmail', registerData.email);
                })
                .catch((error) => {
                    if (error) {
                        window.alert(
                            'Ocorreu um erro ao atualizar seu e-mail. Tente novamente'
                        );
                    }
                });
        }

        firebase
            .database()
            .ref('users/' + dataAccount.id)
            .update({
                address:
                    registerData.address !== ''
                        ? registerData.address
                        : dataAccount.address,
                birthDate:
                    registerData.birthDate !== undefined
                        ? registerData.birthDate
                        : dataAccount.birthDate,
                cepNumber:
                    registerData.cepNumber !== ''
                        ? registerData.cepNumber
                        : dataAccount.cepNumber,
                city:
                    registerData.city !== undefined
                        ? registerData.city
                        : dataAccount.city,
                complement:
                    registerData.complement !== ''
                        ? registerData.complement
                        : dataAccount.complement,
                district:
                    registerData.district !== ''
                        ? registerData.district
                        : dataAccount.district,
                email:
                    registerData.email !== ''
                        ? registerData.email
                        : dataAccount.email,
                houseNumber:
                    registerData.houseNumber !== ''
                        ? registerData.houseNumber
                        : dataAccount.houseNumber,
                id: dataAccount.id,
                name:
                    registerData.name !== ''
                        ? registerData.name
                        : dataAccount.name,
                phoneNumber:
                    registerData.phoneNumber !== ''
                        ? registerData.phoneNumber
                        : dataAccount.phoneNumber,
                state: selectedUf !== '' ? selectedUf : dataAccount.state,
            })
            .then(() => alert('Conta atualizada com sucesso!'))
            .catch((error) => {
                console.log(error);
            });
    }

    function handleSelectedUf(event) {
        setSelectedUf(event.target.value);
    }

    return (
        <main id='mainDataChange'>
            <Header />

            <section className='changeSection'>
                <h3>
                    Clique nos campos de texto abaixo e preencha{' '}
                    <strong>apenas</strong> o que deseja alterar
                </h3>

                <form className='userDataChange'>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={handleInputRegisterChange}
                        placeholder='Nome completo'
                    />

                    <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={handleInputRegisterChange}
                        placeholder='E-mail'
                    />

                    <InputMask
                        id='phoneNumber'
                        name='phoneNumber'
                        type='tel'
                        mask='(99) 99999-9999'
                        maskChar=''
                        onChange={handleInputRegisterChange}
                        placeholder='Telefone com DDD'
                    />

                    <InputMask
                        id='birthDate'
                        name='birthDate'
                        type='text'
                        mask='99/99/9999'
                        maskChar=''
                        onChange={handleInputRegisterChange}
                        placeholder='Data de nascimento'
                    />

                    <InputMask
                        id='cepNumber'
                        name='cepNumber'
                        type='text'
                        mask='99999-999'
                        maskChar=''
                        onChange={handleInputRegisterChange}
                        placeholder='CEP'
                    />

                    <input
                        type='text'
                        name='city'
                        id='localidade'
                        onChange={handleInputRegisterChange}
                        placeholder='Cidade'
                    />

                    <select onChange={handleSelectedUf} name='state' id='uf'>
                        <option disabled selected value=''>
                            Estado
                        </option>

                        <option value='AC'>AC</option>
                        <option value='AL'>AL</option>
                        <option value='AP'>AP</option>
                        <option value='AM'>AM</option>
                        <option value='BA'>BA</option>
                        <option value='CE'>CE</option>
                        <option value='DF'>DF</option>
                        <option value='ES'>ES</option>
                        <option value='GO'>GO</option>
                        <option value='MA'>MA</option>
                        <option value='MT'>MT</option>
                        <option value='MS'>MS</option>
                        <option value='MG'>MG</option>
                        <option value='PA'>PA</option>
                        <option value='PB'>PB</option>
                        <option value='PR'>PR</option>
                        <option value='PE'>PE</option>
                        <option value='PI'>PI</option>
                        <option value='RJ'>RJ</option>
                        <option value='RN'>RN</option>
                        <option value='RS'>RS</option>
                        <option value='RO'>RO</option>
                        <option value='RR'>RR</option>
                        <option value='SC'>SC</option>
                        <option value='SP'>SP</option>
                        <option value='SE'>SE</option>
                        <option value='TO'>TO</option>
                    </select>

                    <input
                        type='text'
                        id='address'
                        name='address'
                        onChange={handleInputRegisterChange}
                        placeholder='Endereço'
                    />

                    <input
                        type='number'
                        id='houseNumber'
                        name='houseNumber'
                        onChange={handleInputRegisterChange}
                        placeholder='Número'
                    />

                    <input
                        type='text'
                        id='district'
                        name='district'
                        onChange={handleInputRegisterChange}
                        placeholder='Bairro'
                    />

                    <input
                        type='text'
                        id='complement'
                        name='complement'
                        onChange={handleInputRegisterChange}
                        placeholder='Complemento'
                    />
                </form>

                <button onClick={() => updateRegister()}>Alterar dados</button>
            </section>

            <Footer />
        </main>
    );
}
