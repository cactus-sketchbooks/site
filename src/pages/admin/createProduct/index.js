import React, { useEffect, useState } from 'react'

import InputMask from 'react-input-mask';

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
        image: '',
        models: [],

    })

    const [selectedModels, setSelectedModels] = useState([])
    const [imageUrl, setImageUrl] = useState('')

    function insertNewColor() {

        const id = firebase.database().ref().child('colors').push().key

        const data = {

            id: id,
            colorName: colorData.colorName,
            colorCode: colorData.colorCode,
            models: selectedModels,
            image: imageUrl,

        }

        firebase.database().ref('colors/' + id)
            .set(data)
            .then(err => console.log(err))

        setColorData({

            colorName: '',
            colorCode: '',
            image: '',
            models: []

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

    const checkModel = (event) => {

        const isChecked = event.target.checked

        if (isChecked) {

            setSelectedModels([...selectedModels,

                event.target.value,

            ])

            console.log(selectedModels)

        } else {

            let index = selectedModels.findIndex((element) => element === event.target.value)

            if (index !== -1) {

                selectedModels.splice(index, 1)
                console.log(selectedModels)

            }

        }

    }

    function uploadImage(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('images/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setImageUrl(url))
            });

    }

    return (

        <main>

            <Header />

            <section id="ColorSection">

                <h1>Cadastro de cores</h1>

                <input id="colorName" name='colorName' onChange={handleColorRegisterChange} placeholder='Nome da cor' />

                <InputMask
                    id="colorCode"
                    name="colorCode"
                    mask="#******"
                    maskChar=""
                    onChange={handleColorRegisterChange}
                    placeholder='Código da cor'
                />

                <input type='file' onChange={uploadImage} accept="image/png, image/jpeg" placeholder='Imagem' />

                <div className="modelSelector">

                    <h3>Selecione os modelos que terão essa cor disponível</h3>

                    <div className="checkboxWrapper">

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="baiao" value="baiao" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Baião</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="buriti" value="buriti" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Buriti</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="carcara" value="carcara" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Carcará</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="facheiro" value="facheiro" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Facheiro</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="mandacaru" value="mandacaru" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Mandacaru</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="sertao" value="sertao" onChange={(event) => checkModel(event)}/>
                            <label for="baiao">Sertão</label>

                        </div>

                    </div>

                </div>

                <button onClick={() => { insertNewColor() }}>Inserir cor</button>

            </section>

            <Footer />

        </main>

    )

}
