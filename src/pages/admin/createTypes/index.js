import React, { useEffect, useState } from 'react'

import InputMask from 'react-input-mask';

import Header from '../../../components/header'
import Footer from '../../../components/footer'

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js'

import prices from '../../../prices.json'

export default function CreateTypes() {

    const [data, setData] = useState([])
    const [types, setTypes] = useState([])
    const [typesOfSketchbook, setTypesOfSketchbook] = useState([])
    const [sketchbook, setSketchbook] = useState([])
    const [paperType, setPaperType] = useState([])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('sketchbooks/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setData(temp)

            }
            else {
                console.log("No data available");
            }

        });

    }, []);

    function handleSelectedSketchbook(event) {

        var position = event.target.value
        var dataSketchbook = data[position]

        // const paperNames = Object.keys(dataSketchbook);

        // setPaperType(paperNames);
        console.log(dataSketchbook)

    }

    function handleSelectedPaperType(event) {

        var position = event.target.value
        var dataPaper = paperType[position]

        console.log(dataPaper)

        // const paperNames = Object.keys(dataSketchbook);

        // setPaperType(paperNames);

    }

    function id() {

        const id = firebase.database().ref().child('posts').push().key
        console.log(id)

    }

    return (

        <main>

            <select onChange={handleSelectedSketchbook}>

                <option selected disabled value="">Selecione o modelo</option>

                {data.map((item, index) => {

                    return (

                        <option value={index} key={index}>{item.name}</option>

                    )

                })}

            </select>

            <select onChange={handleSelectedPaperType}>

                <option selected disabled value="">Selecione o tamanho</option>

                {paperType.map((item, index) => {

                    return (

                        <option value={index} key={index}>{item}</option>

                    )

                })}

            </select>

        </main>

    )

}