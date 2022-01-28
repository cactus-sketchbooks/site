import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'

import './style.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from '../../../images/cactopng2.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Baiao() {

    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([])
    const [isValidated, setIsValidated] = useState(false)
    const [checkStatus, setCheckStatus] = useState(false)
    const [checkedBoxes, setCheckedBoxes] = useState(0)
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('')
    const [selectedLineColor, setSelectedLineColor] = useState('')
    const [selectedElasticColor, setSelectedElasticColor] = useState('')
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');

    const settings = {

        className: "start",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,

    }

    const values = {

        name: "Baião",
        formats: [{

            name: "21X21",
            types: [

                {
                    name: "Papel Kraft",
                    value: 70
                },
                {
                    name: "Papel Canson",
                    value: 75
                },
                {
                    name: "Papel Preto",
                    value: 75
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 115
                },
                {
                    name: "Papel Montval",
                    value: 115
                }

            ]

        },
        {

            name: "15X15",
            types: [

                {
                    name: "Papel Reciclado",
                    value: 38
                },
                {
                    name: "Papel Pólen",
                    value: 38
                },
                {
                    name: "Papel Kraft",
                    value: 48
                },
                {
                    name: "Papel Canson",
                    value: 52
                },
                {
                    name: "Papel Preto",
                    value: 52
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 85
                },
                {
                    name: "Papel Montval",
                    value: 85
                }

            ]

        },
        {

            name: "10X10",
            types: [

                {
                    name: "Papel Reciclado",
                    value: 25
                },
                {
                    name: "Papel Pólen",
                    value: 25
                },
                {
                    name: "Papel Kraft",
                    value: 38
                },
                {
                    name: "Papel Canson",
                    value: 38
                },
                {
                    name: "Papel Preto",
                    value: 38
                },
                {
                    name: "Papel Canson Aquarela",
                    value: 68
                },
                {
                    name: "Papel Montval",
                    value: 68
                }

            ]

        },

        ]

    }

    function handleSelectedSketchbook(event) {

        // console.log(values.formats[0].types.map(item => item.name))
        // console.log(event.target.value)
        let position = event.target.value

        console.log(values.formats[position].name)
        setSelectedPaperWidth(values.formats[position].name)
        setformatTypes(values.formats[position].types)

    }

    function handleSelectedType(event) {

        let position = (event.target.value)
        console.log(formatTypes[position])
        setSketchbookInfos(formatTypes[position])
        // setSelectedPaper(event.target.value)

    }

    // console.log(values.formats.map(format => format.name)) //formatos a4,a5..
    // console.log(values.formats.map(format => format.types.map(item => item))) //tipos dos formatos


    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged()

    }, [])

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

    let history = useHistory();

    function addToCart() {

        const temp = JSON.parse(localStorage.getItem('products'))
        var listOfItems = temp !== null ? Object.keys(temp).map((key) => temp[key]) : []

        const newItems = []

        const dataToSend = {

            model: 'Baião',
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos.name,
            value: sketchbookInfos.value,
            lineColor: selectedLineColor,
            elasticColor: selectedElasticColor,
            coverColors: selectedColors,
            clientNote: clientNote,

        }

        newItems.push(dataToSend)

        if (listOfItems.lenght > 0) {

            newItems.map(item => listOfItems.push(item))
            localStorage.setItem('products', JSON.stringify(listOfItems))

        } else {

            newItems.map(item => listOfItems.push(item))
            localStorage.setItem('products', JSON.stringify(listOfItems))

        }

        history.push('/Carrinho')

    }

    const checkColor = (item, event) => {

        const isChecked = event.target.checked
        setCheckStatus(event.target.value)

        if (isChecked) {

            setSelectedColors([...selectedColors, {

                name: item.colorName,
                code: item.colorCode

            }])

            setCheckedBoxes(checkedBoxes + 1)

        } else {

            const color = item.colorName
            let index = selectedColors.findIndex((element) => element.name === color)

            if (index !== -1) {

                selectedColors.splice(index, 1)
                setCheckedBoxes(checkedBoxes - 1)

            }

        }

    }

    useEffect(() => {

        if (formatTypes == '' || sketchbookInfos == '' || selectedLineColor == '' || selectedElasticColor == '' || (checkedBoxes > 2 || checkedBoxes == 0)) {

            setIsValidated(false)

        } else {

            setIsValidated(true)

        }

    }, [formatTypes, sketchbookInfos, selectedLineColor, selectedElasticColor, checkedBoxes])

    function handleSelectedLineColor(item, event) {

        setSelectedLineColor(event)

    }

    function handleSelectedElasticColor(item, event) {

        setSelectedElasticColor(event)

    }

    function handleClientNote(event) {

        setClientNote(event.target.value)

    }

    return (

        <main>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="logoWrapper">

                    <img src={logo} alt="logo" />

                </div>

                <div className="textIntro">

                    <h1>Monte seu Baião</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperWidth">Selecione o tamanho do papel</label>

                    <select onChange={handleSelectedSketchbook} className="paperWidth">

                        <option value="0" selected disabled>Tamanho do papel</option>

                        {values.formats.map((format, index) => {

                            return (

                                <option value={index} key={index}>{format.name}</option>

                            )

                        }
                        )}

                    </select>

                </fieldset>

                <fieldset>

                    <label for="paper">Selecione o papel do miolo</label>

                    <select onChange={handleSelectedType} className="paper">

                        <option value="0" selected disabled>Papel do miolo</option>

                        {formatTypes.map((type, index) => {

                            return (

                                <option value={index} key={index}>{type.name} - R$ {type.value}</option>

                            )

                        })}

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

                        {dataColors.map((item, index) => {

                            return (

                                <div className="cardColor">

                                    {item.image ?

                                        (<div key={item.id} className="colorBox">

                                            <img src={item.image} alt="cor" />

                                        </div>)

                                        :

                                        (<div key={item.id} style={{ backgroundColor: item.colorCode }} className="colorBox">

                                            <p>{item.colorCode}</p>

                                        </div>)

                                    }

                                    <div className="colorName">

                                        <p>{item.colorName}</p>

                                        <input
                                            type="checkbox"
                                            value={index}
                                            onChange={(event) => checkColor(item, event)}
                                            style={{ accentColor: item.colorCode }}
                                        />

                                    </div>

                                </div>

                            )

                        })}

                    </Slider>

                </div>

                <section id="RadioSelectionColors">

                    <div className="boxColor">

                        <div className="textWrapper">

                            <div className="textBackground">

                                <h2>Cor da linha</h2>

                            </div>

                            <p>Selecione <strong>uma</strong> cor</p>

                        </div>

                        <div className="lineColorWrapper">

                            {dataColors.map((item, index) => {

                                return (

                                    <div className="colorWrapper">

                                        {item.image ?

                                            (

                                                <div className="elasticColor">

                                                    <img src={item.image} alt="cor do elástico" />

                                                </div>

                                            )

                                            :

                                            (

                                                <div style={{ backgroundColor: item.colorCode }} className="elasticColor" />

                                            )

                                        }

                                        <input

                                            type="radio"
                                            onClick={(event) => handleSelectedLineColor(event, item, index)}
                                            name="selectedLineColor"
                                            key={item.id}
                                            value={item.name}
                                            className="checkbox"
                                            style={{ accentColor: item.colorCode }}

                                        />

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    <div className="boxColor">

                        <div className="textWrapper">

                            <div className="textBackground">

                                <h2>Cor do elástico</h2>

                            </div>

                            <p>Selecione <strong>uma</strong> cor</p>

                        </div>

                        <div className="elasticColorWrapper">

                            {dataColors.map((item, index) => {

                                return (

                                    <div className="colorWrapper">

                                        {item.image ?

                                            (

                                                <div className="elasticColor">

                                                    <img src={item.image} alt="cor do elástico" />

                                                </div>

                                            )

                                            :

                                            (

                                                <div style={{ backgroundColor: item.colorCode }} className="elasticColor" />

                                            )

                                        }

                                        <input

                                            type="radio"
                                            onClick={(event) => handleSelectedElasticColor(event, item, index)}
                                            name="selectedElasticColor"
                                            key={item.id}
                                            value={item.name}
                                            style={{ accentColor: item.colorCode }}

                                        />

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                </section>

                <div className="additionalInfos">

                    <label for="additionalInfos">Informações adicionais <strong>(opcional)</strong></label>

                    <textarea
                        type="text"
                        name="additionalInfos"
                        id="additionalInfos"
                        onChange={handleClientNote}
                    />

                    {isValidated ? (

                        <>

                            <div className="productInfosWrapper">

                                <h1>Seu sketchbook</h1>

                                <ul>

                                <li><strong>Tamanho do papel: </strong>{selectedPaperWidth}</li>
                                <li><strong>Papel do miolo: </strong>{sketchbookInfos.name}</li>

                                <li>
                                    <strong>Cor da capa: </strong>
                                    {selectedColors.map((color, index) => {

                                        return (

                                            <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                        )

                                    })}
                                </li>

                                <li><strong>Cor da linha: </strong>{selectedLineColor.colorName}</li>
                                <li><strong>Cor do elástico: </strong>{selectedElasticColor.colorName}</li>

                                </ul>

                                <h3>Valor do sketchbook: R$ {sketchbookInfos.value}</h3>

                                <button onClick={() => addToCart()}>Adicionar ao carrinho</button>

                            </div>

                        </>

                    ) : (

                        <>

                            <p>Você deve selecionar <strong>todas as opções</strong> antes de finalizar seu sketchbook</p>
                            {/* <button disabled>Finalizar</button> */}

                        </>

                    )}

                </div>

            </section>

            <Footer />

        </main>

    )

}