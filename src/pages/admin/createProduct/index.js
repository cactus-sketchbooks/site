import React, { useEffect, useState } from 'react'

import Header from '../../../components/header'
import Footer from '../../../components/footer'

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function CreateProduct() {

    const [colorData, setColorData] = useState({

        colorName: '',
        colorCode: '',

    })

    function insertNewColor() {

        const id = firebase.database().ref().child('colors').push().key

        const data = {

            colorName: colorData.colorName,
            colorCode: colorData.colorCode,
            id: id,

        }

        firebase.database().ref('colors/' + id)
        .set(data)
        .then(err => console.log(err))

        setColorData({

            colorName: '',
            colorCode: '',
            
        })

        alert("Cor inserida com sucesso!")
        window.location.reload()

    }

    function handleColorRegisterChange(event) {

        const { name, value } = event.target

        setColorData({

            ...colorData, [name]: value

        })

    }

    return (

        <main>

            <Header />

                <section id="ColorSection">

                    <h1>Cadastro de cores</h1>

                    <input id="colorName" name='colorName' onChange={handleColorRegisterChange} placeholder='Nome da cor' />

                    <input id="colorCode" name='colorCode' onChange={handleColorRegisterChange} placeholder='Código da cor' />

                    <button onClick={()=> {insertNewColor()}}>Inserir cor</button>

                </section>

                

            <Footer />

        </main>

    )

}
