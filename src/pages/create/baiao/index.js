import React, { useEffect, useState, Component } from 'react'
import Slider from "react-slick";

import './style.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Baiao() {

    const [dataColors, setDataColors] = useState([])
    const [selectedColors, setSelectedColors] = useState('')
    const [displayCheckbox, setDisplayCheckbox] = useState('flex')

    const settings = {

        className: "start",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,

    }

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

    function handleSelectedPaperWidth(event) {

        console.log(event.target.value)

    }

    function handleSelectedPaper(event) {

        console.log(event.target.value)

    }

    function handleSelectedCover(event) {

        console.log(event.target.value)

    }

    function selectColor(item, event) {

        console.log(event)

    }

    const checkColor = (item, event) => {
        
        const isChecked = event.target.checked

        if(isChecked) {

            setSelectedColors([...selectedColors, {
    
                name: item.colorName,
                code: item.colorCode
    
            }])

            console.log('adicionou')

        } else {

            const color = item.colorName
            console.log(color)
            let index = selectedColors.findIndex((element) => element.name === color)
            console.log(index)

            if(index !== -1) {

                selectedColors.splice(index, 1)
                console.log('removeu')

            }

        }

        console.log(selectedColors)

    }

    // useEffect(() => {

    //     if(selectedColors.length === 2) {

    //         setDisplayCheckbox('none')

    //     } else {

    //         setDisplayCheckbox('flex')

    //     }

    // }, [selectedColors])

    return (

        <main>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="textIntro">

                    <h1>Monte seu Baião</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperWidth">Selecione o tamanho do papel</label>

                    <select onChange={handleSelectedPaperWidth} className="paperWidth">

                        <option value="0" selected disabled>Tamanho do papel</option>
                        <option value="21x21">21x21</option>
                        <option value="15x15">15x15</option>
                        <option value="10x10">10x10</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="paper">Selecione o papel do miolo</label>

                    <select onChange={handleSelectedPaper} className="paper">

                        <option value="0" selected disabled>Papel do miolo</option>
                        <option value="Pólen Bold 90g">Pólen Bold 90g</option>
                        <option value="Reciclado 120g">Reciclado 120g</option>
                        <option value="Kraft 140g">Kraft 140g</option>
                        <option value="Color preto 180g">Color preto 180g</option>
                        <option value="Canson 140g">Canson 140g</option>
                        <option value="Canson 200g">Canson 200g</option>
                        <option value="Canson Aquarela 300g">Canson Aquarela 300g</option>
                        <option value="Montval 300g">Montval 300g</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="cover">Selecione o modelo da capa</label>

                    <select onChange={handleSelectedCover} className="cover">

                        <option value="0" selected disabled>Modelo da Capa</option>
                        <option value="1 Cor">1 Cor</option>
                        <option value="2 Cores">2 Cores</option>
                        <option value="Cor + Kraft">Cor + Kraft</option>
                        <option value="Kraft">Kraft</option>

                    </select>

                </fieldset>

                <div className="textWrapper">

                    <div className="textBackground">

                        <h2>Cor da capa</h2>

                    </div>

                    <p>Selecione <strong>até duas</strong> cores</p>

                </div>

                <div className="sliderColors">

                    <Slider {...settings}>

                        {dataColors.map((item) => {

                            return (

                                <div className="cardColor">

                                    <div key={item.id} style={{ backgroundColor: item.colorCode }} className="colorBox">

                                        <p>{item.colorCode}</p>

                                    </div>

                                    <div className="colorName">

                                        <p>{item.colorName}</p>

                                        <input style={{display: displayCheckbox}} type="checkbox" onChange={(event) => checkColor(item, event)} />

                                    </div>

                                </div>

                            )

                        })}

                    </Slider>

                </div>

                <h2>Selecione as cores da linha</h2>

                <div className="lineColor">

                    {dataColors.map(item => {
                        return (
                            <div style={{ backgroundColor: item.colorCode }} className="colorLabel" className="cardColor">

                                <label>

                                    {item.colorName}
                                    <input onClick={(event) => selectColor(event, item)} type="checkbox" key={item.id} value={item.name} />
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
                            <div style={{ backgroundColor: item.colorCode }} className="colorLabel" className="cardColor">

                                <label>

                                    {item.colorName}
                                    <input onClick={(event) => selectColor(event, item)} type="checkbox" key={item.id} value={item.name} />
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