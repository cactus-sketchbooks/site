import React, {useEffect, useState} from 'react'

import './style.scss'

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Buriti() {

    const [dataColors, setDataColors] = useState([])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataColors(temp)

            }

            else {

                console.log("No data available");

            }

        });

    }, []);

    function handleSelectedModel(event) {

        console.log(event.target.value)

    }

    function handleSelectedPaper(event) {

        console.log(event.target.value)

    }

    function handleSelectedCover(event) {

        console.log(event.target.value)

    }

    function handleSelectedElasticColor(event) {

        console.log(event.target.value)

    }

    function selectColor(item, event) {

        console.log(event)

    }

    return (

        <main>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="textIntro">

                    <h1>Monte seu Buriti</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperFormat">Selecione o modelo do Kindle</label>

                    <select onChange={handleSelectedModel} className="paperFormat">

                        <option value="0" selected disabled>Formato do sketchbook</option>
                        <option value="10ª geração">10ª geração</option>
                        <option value="Parperwhite">Parperwhite</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="cover-color">Selecione a cor do tecido da capa da capa</label>

                    <select className="cover">

                        <option value="0" selected disabled>Cor da Capa</option>
                        

                    </select>

                </fieldset>

                <fieldset>

                    <label for="elastic-color">Selecione a cor do elástico</label>

                    <select className="elastic color">

                        <option value="0" selected disabled>Cor do elástico</option>

                    </select>

                </fieldset>

                <h2>Selecione as cores da capa</h2>
                <div className="coverColorWrapper">

                    {dataColors.map((item) => {

                        return (

                            <div style={{backgroundColor: item.colorCode}} className="cardColor">
                        
                                <label className="container">

                                    {item.colorName}
                                    <input onClick={(event) => selectColor(event, item)} type="checkbox" key={item.id} value={item.name}/>
                                    <span className="checkmark"></span>

                                </label>

                            </div>

                        )

                    })}

                </div>

                <h2>Selecione as cores da linha</h2>
                <div className="lineColor">

                    {dataColors.map(item => {
                        return (
                            <div style={{backgroundColor: item.colorCode}} className="colorLabel" className="cardColor">
                        
                                <label>

                                    {item.colorName}
                                    <input  onClick={(event) => selectColor(event, item)} type="checkbox" key={item.id} value={item.name}/>
                                    <span className="checkmark"></span>

                                </label>

                            </div>
                        )
                    })}
                </div>

                <h2>Selecione as cores do elástico</h2>
                <div className="elasticColor">

                    {dataColors.map(item => {
                        return (
                            <div style={{backgroundColor: item.colorCode}} className="colorLabel" className="cardColor">
                        
                                <label>

                                    {item.colorName}
                                    <input onClick={(event) => selectColor(event, item)} type="checkbox" key={item.id} value={item.name}/>
                                    <span className="checkmark"></span>

                                </label>

                            </div>
                        )
                    })}
                </div>

                <button>Finalizar</button>

            </section>

            <Footer />

        </main>

    )

}