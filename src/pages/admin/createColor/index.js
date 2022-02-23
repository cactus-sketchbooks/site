import React, { useEffect, useState } from 'react'

import InputMask from 'react-input-mask';

import Header from '../../../components/header'
import Footer from '../../../components/footer'

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function CreateColor() {

    const [colorData, setColorData] = useState({

        colorName: '',
        colorCode: '',
        image: '',
        models: [],
        categories: [],

    })

    const [selectedModels, setSelectedModels] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [imageUrl, setImageUrl] = useState('')

    function insertNewColor() {

        const id = firebase.database().ref().child('colors').push().key

        const data = {

            id: id,
            colorName: colorData.colorName,
            colorCode: colorData.colorCode,
            models: selectedModels,
            categories: selectedCategories,
            image: imageUrl,

        }

        firebase.database().ref('colors/' + id)
            .set(data)
            .then(err => console.log(err))

        setColorData({

            colorName: '',
            colorCode: '',
            image: '',
            models: [],
            categories: [],

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

    const checkCategory = (event) => {

        const isChecked = event.target.checked

        if (isChecked) {

            setSelectedCategories([...selectedCategories,

            event.target.value,

            ])

            console.log(selectedCategories)

        } else {

            let index = selectedCategories.findIndex((element) => element === event.target.value)

            if (index !== -1) {

                selectedCategories.splice(index, 1)
                console.log(selectedCategories)

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

                <input type="text" id="colorName" name='colorName' onChange={handleColorRegisterChange} placeholder='Nome da cor' />

                <div className="formatType">

                    <InputMask
                        type="text"
                        id="colorCode"
                        name="colorCode"
                        mask="#******"
                        maskChar=""
                        onChange={handleColorRegisterChange}
                        placeholder='Código da cor'
                    />

                    <h2>Ou</h2>

                    <input type='file' onChange={uploadImage} accept="image/png, image/jpeg" />

                </div>

                <div className="checkboxSelector">

                    <h3>Selecione a(s) categoria(s) da cor</h3>

                    <div className="checkboxWrapper">

                        <div className="checkbox">

                            <input type="checkbox" name="selectedCategory" id="cover" value="cover" onChange={(event) => checkCategory(event)} />
                            <label for="cover">Cor de capa</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedCategory" id="line" value="line" onChange={(event) => checkCategory(event)} />
                            <label for="line">Cor de linha</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedCategory" id="elastic" value="elastic" onChange={(event) => checkCategory(event)} />
                            <label for="elastic">Cor de elástico</label>

                        </div>

                    </div>

                </div>

                <div className="checkboxSelector">

                    <h3>Selecione os modelos que terão essa cor disponível</h3>

                    <div className="checkboxWrapper">

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="baiao" value="baiao" onChange={(event) => checkModel(event)} />
                            <label for="baiao">Baião</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="buriti" value="buriti" onChange={(event) => checkModel(event)} />
                            <label for="buriti">Buriti</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="carcara" value="carcara" onChange={(event) => checkModel(event)} />
                            <label for="carcara">Carcará</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="facheiro" value="facheiro" onChange={(event) => checkModel(event)} />
                            <label for="facheiro">Facheiro</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="mandacaru" value="mandacaru" onChange={(event) => checkModel(event)} />
                            <label for="mandacaru">Mandacaru</label>

                        </div>

                        <div className="checkbox">

                            <input type="checkbox" name="selectedModel" id="sertao" value="sertao" onChange={(event) => checkModel(event)} />
                            <label for="sertao">Sertão</label>

                        </div>

                    </div>

                </div>

                <button onClick={() => { insertNewColor() }}>Cadastrar cor</button>

            </section>

            <Footer />

        </main>

    )

}
