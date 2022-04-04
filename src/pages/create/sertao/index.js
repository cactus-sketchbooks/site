import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { Link, useHistory } from 'react-router-dom'

import './style.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from '../../../images/sertao.png';
import SertaoTipo1 from '../../../images/capas/CAPA MODELO JOURNAL UMA COR (A5-A6).png';
import SertaoTipo2 from '../../../images/capas/CAPA MODELO JOURNAL UMA COR (14X14 - 10X10).png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Sertao() {

    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([])
    const [isValidated, setIsValidated] = useState(false)
    const [checkedBoxes, setCheckedBoxes] = useState(0)
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('')
    const [selectedLineColor, setSelectedLineColor] = useState('')
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
   
    const settings = {

        className: "start",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: maxSlides,
        swipeToSlide: true,

    }

    const values = {

        name: "Sertão",
        formats: [{

            name: "A5",
            id: 26,
            size: {
                width: 14,
                length: 20,
                height: 1,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 22
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 22
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 22
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 22
                },
                {
                    name: "Papel Pólen Liso",
                    value: 22
                },
                {
                    name: "Papel Pólen Pontilhado",
                    value: 22
                },
                {
                    name: "Papel Pólen Quadriculado",
                    value: 22
                },
                {
                    name: "Papel Pólen Pautado",
                    value: 22
                },
                {
                    name: "Papel Kraft",
                    value: 25
                },
                {
                    name: "Papel Canson",
                    value: 25
                },
                {
                    name: "Papel Preto",
                    value: 25
                },

            ]

        },
        {

            name: "A6",
            id: 27,
            size: {
                // width: 9.5,
                width: 10,
                length: 14,
                height: 1,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 12
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 12
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 12
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 12
                },
                {
                    name: "Papel Pólen Liso",
                    value: 12
                },
                {
                    name: "Papel Pólen Pontilhado",
                    value: 12
                },
                {
                    name: "Papel Pólen Quadriculado",
                    value: 12
                },
                {
                    name: "Papel Pólen Pautado",
                    value: 12
                },
                {
                    name: "Papel Kraft",
                    value: 15
                },
                {
                    name: "Papel Canson",
                    value: 15
                },
                {
                    name: "Papel Preto",
                    value: 15
                },

            ]

        },
        {

            name: "10X10",
            id: 28,
            size: {
                width: 10,
                length: 10,
                height: 1,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 10
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 10
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 10
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 10
                },
                {
                    name: "Papel Pólen Liso",
                    value: 10
                },
                {
                    name: "Papel Pólen Pontilhado",
                    value: 10
                },
                {
                    name: "Papel Pólen Quadriculado",
                    value: 10
                },
                {
                    name: "Papel Pólen Pautado",
                    value: 10
                },
                {
                    name: "Papel Kraft",
                    value: 15
                },
                {
                    name: "Papel Canson",
                    value: 15
                },
                {
                    name: "Papel Preto",
                    value: 15
                },

            ]

        },
        {

            name: "14X14",
            id: 29,
            size: {
                width: 14,
                length: 14,
                height: 1,
                weight: 0.5
            },
            types: [

                {
                    name: "Papel Reciclado Liso",
                    value: 20
                },
                {
                    name: "Papel Reciclado Pontilhado",
                    value: 20
                },
                {
                    name: "Papel Reciclado Quadriculado",
                    value: 20
                },
                {
                    name: "Papel Reciclado Pautado",
                    value: 20
                },
                {
                    name: "Papel Pólen Liso",
                    value: 20
                },
                {
                    name: "Papel Pólen Pontilhado",
                    value: 20
                },
                {
                    name: "Papel Pólen Quadriculado",
                    value: 20
                },
                {
                    name: "Papel Pólen Pautado",
                    value: 20
                },
                {
                    name: "Papel Kraft",
                    value: 25
                },
                {
                    name: "Papel Canson",
                    value: 25
                },
                {
                    name: "Papel Preto",
                    value: 25
                },

            ]

        },

        ]

    }

    useEffect(() => {

        if(window.innerWidth < 820) {

            setMaxSlides(3)

        } else {

            setMaxSlides(5)
            
        }
        
    }, [])

    function handleSelectedSketchbook(event) {

        let position = event.target.value

        setSelectedPaperWidth(values.formats[position].name)
        setformatTypes(values.formats[position].types)
        setFormatSize(values.formats[position].size)
        setFormatId(values.formats[position].id)

    }

    function handleSelectedType(event) {

        let position = (event.target.value)
        setSketchbookInfos(formatTypes[position])

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

            model: 'Sertão',
            id: formatId,
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos.name,
            value: sketchbookInfos.value,
            lineColor: selectedLineColor,
            coverColors: selectedColors,
            clientNote: clientNote,
            size: formatSize

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

        if (formatTypes === '' || sketchbookInfos === '' || selectedLineColor === '' || (checkedBoxes > 1 || checkedBoxes === 0)) {

            setIsValidated(false)

        } else {

            setIsValidated(true)

        }

    }, [formatTypes, sketchbookInfos, selectedLineColor, checkedBoxes])

    function handleSelectedLineColor(item, event) {

        setSelectedLineColor(event)

    }

    function handleClientNote(event) {

        setClientNote(event.target.value)

    }

    function handleModalInfos() {

        displayModal === "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal === "none")
            setDisplayModal("flex")
        else {
            setDisplayModal("none");
        }

    }

    return (

        <main id="MainSketchbook">

            <div style={{ display: displayModal }} role="dialog" className='divModal' >

                <div className="modalContent">

                    <span onClick={closeModal}>x</span>

                    <div className="sketchbookImgWrapper">

                        <h3>Modelo de capa (A5-A6)</h3>
                        <img src={SertaoTipo1} alt="" />

                    </div>

                    <div className="sketchbookImgWrapper">

                        <h3>Modelo de capa (14X14 - 10X10)</h3>
                        <img id="sertao" src={SertaoTipo2} alt="" />

                    </div>

                </div>

            </div>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="logoWrapper">

                    <img src={logo} alt="logo" />

                </div>

                <div className="textIntro">

                    <h1>Monte seu Sertão</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperWidth">Selecione o tamanho do papel</label>

                    <select onChange={handleSelectedSketchbook} className="paperWidth">

                        <option value="" selected disabled>Tamanho do papel</option>

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

                    <p>Veja mais sobre a gramatura e quantidade de páginas clicando <Link to="/gramaturas">aqui</Link></p>

                </fieldset>

                <div className="textWrapper">

                    <div className="textBackground">

                        <h2>Cor da capa</h2>

                    </div>

                    <p>Selecione <strong>uma única</strong> cor. Arraste para o lado para conferir todas as opções. <button onClick={() => handleModalInfos()}>Clique aqui para visualizar os modelos de capa</button></p>

                </div>

                <div className="sliderColors">

                    <Slider {...settings}>

                        {dataColors.map((item, index) => (

                            item.models.includes("sertao") && item.categories.includes("cover") ? (

                                <div className="cardColor">

                                    {item.image ?

                                        (<div key={item.id} className="colorBox">

                                            <img draggable="false" src={item.image} alt="cor" />

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

                            ) : null

                        ))}

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

                            {dataColors.map((item, index) => (

                                item.models.includes("sertao") && item.categories.includes("line") ? (

                                    <div className="colorWrapper">

                                        {item.image ?

                                            (

                                                <div className="elasticColor">

                                                    <img src={item.image} alt="cor da linha" />

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

                                ) : null

                            ))}

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

                                </ul>

                                <h3>Valor do sketchbook: R$ {sketchbookInfos.value}</h3>

                                <button onClick={() => addToCart()}>Adicionar ao carrinho</button>

                            </div>

                        </>

                    ) : (

                        <>

                            <p>Você deve selecionar <strong>todas as opções</strong> antes de finalizar seu sketchbook</p>

                        </>

                    )}

                </div>

            </section>

            <Footer />

        </main>

    )

}