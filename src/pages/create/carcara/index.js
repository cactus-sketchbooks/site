import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/carcara2.jpg';
import CarcaraRetangular from '../../../images/capas/CarcaraRetangular.png';
import CarcaraQuadrado from '../../../images/capas/CarcaraQuadrado.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function Carcara() {
    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(0);
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const [clicked, setClicked] = useState(5);
    const [currentStep, setCurrentStep] = useState(1);

    const settings = {
        className: 'start',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: maxSlides,
        swipeToSlide: true,
    };

    const values = {
        name: 'Carcará',
        formats: [
            {
                name: 'A3 - Paisagem',
                id: 301,
                size: {
                    // width: 29.7,
                    width: 30,
                    length: 42,
                    height: 3,
                    // height: 2.5,
                    weight: 0.8,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 102,
                    },
                    // conferir
                    // {
                    //     name: 'Papel Marfim Liso',
                    //     value: 102,
                    // },
                    {
                        name: 'Papel Kraft',
                        value: 107,
                    },

                    {
                        name: 'Papel Preto',
                        value: 144,
                    },
                ],
            },
            {
                name: 'A3 - Retrato',
                id: 302,
                size: {
                    // width: 29.7,
                    width: 30,
                    length: 42,
                    height: 3,
                    // height: 2.5,
                    weight: 0.8,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 102,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 102,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 107,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 137,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 157,
                    },
                    {
                        name: 'Papel Preto',
                        value: 144,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 230,
                    },
                    {
                        name: 'Papel Montval',
                        value: 230,
                    },
                ],
            },
            {
                name: 'A4 - Paisagem',
                id: 303,
                size: {
                    width: 21,
                    length: 29,
                    // height: 2.5,
                    height: 3,
                    weight: 0.7,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 67,
                    },
                    // conferir se esta disponivel
                    // {
                    //     name: 'Papel Marfim Liso',
                    //     value: 67,
                    // },
                    {
                        name: 'Papel Kraft',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 122,
                    },
                ],
            },
            {
                name: 'A4 - Retrato',
                id: 304,
                size: {
                    width: 21,
                    length: 29,
                    // height: 2.5,
                    height: 3,
                    weight: 0.7,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 82,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval',
                        value: 122,
                    },
                ],
            },
            {
                name: 'A5 - Paisagem',
                id: 305,
                size: {
                    width: 15,
                    length: 21,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 45,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 49,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 55,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 62,
                    },
                    {
                        name: 'Papel Preto',
                        value: 59,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 85,
                    },
                    {
                        name: 'Papel Montval',
                        value: 85,
                    },
                ],
            },
            {
                name: 'A5 - Retrato',
                id: 306,
                size: {
                    width: 15,
                    length: 21,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 45,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 49,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 55,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 62,
                    },
                    {
                        name: 'Papel Preto',
                        value: 59,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 85,
                    },
                    {
                        name: 'Papel Montval',
                        value: 85,
                    },
                ],
            },
            {
                name: 'A6 - Paisagem',
                id: 307,
                size: {
                    // width: 10.5,
                    width: 11,
                    length: 15,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 35,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 40,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 45,
                    },
                    {
                        name: 'Papel Preto',
                        value: 42,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 50,
                    },
                    {
                        name: 'Papel Montval',
                        value: 50,
                    },
                ],
            },
            {
                name: 'A6 - Retrato',
                id: 308,
                size: {
                    // width: 10.5,
                    width: 11,
                    length: 15,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 35,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 40,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 45,
                    },
                    {
                        name: 'Papel Preto',
                        value: 42,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 50,
                    },
                    {
                        name: 'Papel Montval',
                        value: 50,
                    },
                ],
            },
            {
                name: 'A7 - Paisagem',
                id: 309,
                size: {
                    // width: 7.5,
                    width: 8,
                    // length: 10.5,
                    length: 11,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado',
                        value: 18,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 18,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 18,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 20,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 22,
                    },
                    {
                        name: 'Papel Preto',
                        value: 19,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 24,
                    },
                    {
                        name: 'Papel Montval',
                        value: 24,
                    },
                ],
            },
            {
                name: 'A7 - Retrato',
                id: 310,
                size: {
                    // width: 7.5,
                    width: 8,
                    // length: 10.5,
                    length: 11,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado',
                        value: 18,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 18,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 18,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 20,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 22,
                    },
                    {
                        name: 'Papel Preto',
                        value: 19,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 24,
                    },
                    {
                        name: 'Papel Montval',
                        value: 24,
                    },
                ],
            },
            {
                name: '21X21',
                id: 311,
                size: {
                    width: 21,
                    length: 21,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 82,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 90,
                    },
                    {
                        name: 'Papel Preto',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval',
                        value: 122,
                    },
                ],
            },
            {
                name: '15X15',
                id: 312,
                size: {
                    width: 15,
                    length: 15,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 45,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 45,
                    },
                    {
                        name: 'Papel Marfim Pontado',
                        value: 45,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 49,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 55,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 62,
                    },
                    {
                        name: 'Papel Preto',
                        value: 59,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 85,
                    },
                    {
                        name: 'Papel Montval',
                        value: 85,
                    },
                ],
            },
            {
                name: '10X10',
                id: 313,
                size: {
                    width: 10,
                    length: 10,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 30,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 30,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 35,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 40,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 45,
                    },
                    {
                        name: 'Papel Preto',
                        value: 42,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 50,
                    },
                    {
                        name: 'Papel Montval',
                        value: 50,
                    },
                ],
            },
        ],
    };

    useEffect(() => {
        if (window.innerWidth < 820) {
            setMaxSlides(3);
        } else {
            setMaxSlides(5);
        }
    }, []);

    function handleSelectedSketchbook(event) {
        let position = event.target.value;

        setSelectedPaperWidth(values.formats[position].name);
        setformatTypes(values.formats[position].types);
        setFormatSize(values.formats[position].size);
        setFormatId(values.formats[position].id);

        // zera o selector de papeis se o cliente chegar a selecionar o papel do miolo, mas mudar de ideia e voltar e mudar o tamanho do sketchbook
        // forçando-o a escolher novamente os papel do miolo, garantindo que o preço e o papel escolhidos estarão corretos
        setSketchbookInfos('');
        document.querySelector('.paper').selectedIndex = 0;
    }

    function handleSelectedType(event) {
        let position = event.target.value;
        setSketchbookInfos(formatTypes[position]);
    }

    function onAuthStateChanged(user) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setUserIsLogged(true);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged();
    }, []);

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setDataColors(temp);
            } else {
                console.log('No data available');
            }
        });
    }, []);

    let history = useHistory();

    function addToCart() {
        const temp = JSON.parse(localStorage.getItem('products'));
        var listOfItems =
            temp !== null ? Object.keys(temp).map((key) => temp[key]) : [];

        const newItems = [];

        const dataToSend = {
            model: 'Carcará',
            id: formatId,
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos.name,
            value: sketchbookInfos.value,
            elasticColor: selectedElasticColor,
            coverColors: selectedColors,
            sketchFinish: selectedSketchFinish,
            clientNote: clientNote,
            size: formatSize,
        };

        newItems.push(dataToSend);

        // n lembro o porquê disso (inclusive, length tá escrito errado, então a condição não funciona)
        if (listOfItems.lenght > 0) {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        } else {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        }

        history.push('/Carrinho');
    }

    function changeColor(event) {
        let isChecked;

        setTimeout(() => {
            isChecked = event.target.control.checked;

            if (isChecked) {
                event.target.style.backgroundColor = '#000';
            } else {
                event.target.style.backgroundColor = 'transparent';
            }
        }, 80);
    }

    const checkColor = (item, event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors([
                ...selectedColors,
                {
                    name: item.colorName,
                    code: item.colorCode,
                },
            ]);

            setCheckedBoxes(checkedBoxes + 1);
        } else {
            const color = item.colorName;
            let index = selectedColors.findIndex(
                (element) => element.name === color
            );

            if (index !== -1) {
                selectedColors.splice(index, 1);
                setCheckedBoxes(checkedBoxes - 1);
            }
        }
    };

    useEffect(() => {
        if (
            formatTypes === '' ||
            sketchbookInfos === '' ||
            selectedElasticColor === '' ||
            selectedSketchFinish === '' ||
            checkedBoxes > 1 ||
            checkedBoxes === 0
        ) {
            setIsValidated(false);
        } else {
            setIsValidated(true);
        }
    }, [
        formatTypes,
        sketchbookInfos,
        selectedElasticColor,
        checkedBoxes,
        selectedSketchFinish,
    ]);

    function handleSelectedElasticColor(item, event) {
        setSelectedElasticColor(event);
    }

    function handleSelectedSketchFinish(event) {
        setSelectedSketchFinish(event.target.value);
    }

    function handleClientNote(event) {
        setClientNote(event.target.value);
    }

    function handleModalInfos() {
        displayModal === 'none'
            ? setDisplayModal('flex')
            : setDisplayModal('none');
    }

    function closeModal() {
        if (displayModal === 'none') setDisplayModal('flex');
        else {
            setDisplayModal('none');
        }
    }

    function handleNextStep() {
        if (currentStep <= 5) {
            setCurrentStep(currentStep + 1);
        }
    }
    function handlePreviousStep() {
        if (currentStep >= 2) {
            setCurrentStep(currentStep - 1);
        }
    }

    useEffect(() => {
        updateStepIndicator(currentStep);
        updateStepChoices(currentStep);
    }, [currentStep]);

    function updateStepIndicator(currentStep) {
        // retira a cor de ativo de todos pra garantir
        document.querySelectorAll('.stepTitle').forEach(function (step) {
            step.classList.remove('active-step');
        });

        // adiciona a cor de ativo no indicador do passo atual
        document
            .querySelector(`.title${currentStep}`)
            .classList.add('active-step');

        // mostra e esconde os botoes de avancar ou retroceder se estivar na primeira ou ultima pagina
        switch (currentStep) {
            case 1:
                // esconde o botao de voltar se estiver no primeiro passo
                document.querySelector('.btn.previous').classList.add('hide');
                break;
            case 2:
                // mostra novamente o botao de voltar neste passo
                document
                    .querySelector('.btn.previous')
                    .classList.remove('hide');
                break;
            case 5:
                // volta a mostrar o botao de avancar caso o usuario vá ao ultimo passo e volte
                document.querySelector('.btn.next').classList.remove('hide');
                break;
            case 6:
                // esconde o botao de proxima pagina se estiver no ultimo passo (pq ja tem o de adicionar ao carrinho)
                document.querySelector('.btn.next').classList.add('hide');
                break;
            default:
        }
    }

    function updateStepChoices(currentStep) {
        document.querySelectorAll('.steps').forEach(function (step) {
            // esconde todas as outras divs
            step.classList.add('hide');
        });

        // mostra somente a div atual
        document.querySelector(`.step${currentStep}`).classList.remove('hide');
    }

    return (
        <main id='MainSketchbook'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div className='modalContent'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa retangular</h3>
                        <img src={CarcaraRetangular} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado</h3>
                        <img src={CarcaraQuadrado} alt='' />
                    </div>
                </div>
            </div>

            <Header />

            <section id='CreateSketchbookSection'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo' />
                </div>

                <div className='textIntro'>
                    <h1>Monte seu Carcará</h1>
                    <h5>
                        Selecione as opções abaixo e monte seu cactus do seu
                        jeito
                    </h5>
                </div>

                <div id='steps-indicator'>
                    <div className='stepTitle title1 active-step'>
                        <h3>1: Tamanho</h3>
                    </div>
                    <div className='stepTitle title2'>
                        <h3>2: Papel do Miolo</h3>
                    </div>
                    <div className='stepTitle title3'>
                        <h3>3: Cor da Capa</h3>
                    </div>
                    <div className='stepTitle title4'>
                        <h3>4: Cor do Elástico</h3>
                    </div>
                    <div className='stepTitle title5'>
                        <h3>5: Acabamento</h3>
                    </div>
                    <div className='stepTitle title6'>
                        <h3>Resumo do Pedido</h3>
                    </div>
                </div>

                <div className='steps step1 full'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tamanho e Orientação</h2>
                        </div>
                    </div>
                    <fieldset>
                        <label htmlFor='paperWidth'>
                            Selecione o tamanho e orientação do Sketchbook
                        </label>

                        <select
                            onChange={handleSelectedSketchbook}
                            className='paperWidth'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Tamanho e orientação do Sketchbook
                            </option>

                            {values.formats.map((format, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {format.name}
                                    </option>
                                );
                            })}
                        </select>
                    </fieldset>
                </div>

                <div className='steps step2 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Papel do Miolo</h2>
                        </div>
                    </div>
                    <fieldset>
                        <label htmlFor='paper'>
                            Selecione o papel do miolo
                        </label>

                        <select
                            onChange={handleSelectedType}
                            className='paper'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Papel do miolo
                            </option>

                            {formatTypes.map((type, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {type.name} - R$ {type.value}
                                    </option>
                                );
                            })}
                        </select>

                        <p>
                            Veja mais sobre a gramatura e quantidade de páginas
                            clicando <Link to='/gramaturas'>aqui</Link>
                        </p>
                    </fieldset>
                </div>

                <div className='steps step3 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Cor da capa</h2>
                        </div>

                        <p>
                            Selecione <strong>uma</strong> cor. Arraste para o
                            lado para conferir todas as opções.{' '}
                            <button onClick={() => handleModalInfos()}>
                                Clique aqui para visualizar os modelos de capa
                            </button>
                        </p>
                    </div>

                    <div className='sliderColors'>
                        <Slider {...settings}>
                            {dataColors.map((item, index) =>
                                item.models.includes('carcara') &&
                                item.categories.includes('cover') ? (
                                    <div className='cardColor' key={index}>
                                        <label
                                            htmlFor={index}
                                            onClick={(event) =>
                                                changeColor(event)
                                            }
                                        />

                                        {item.image ? (
                                            <div
                                                key={item.id}
                                                className='colorBox'
                                            >
                                                <img
                                                    draggable='false'
                                                    src={item.image}
                                                    alt='cor'
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                key={item.id}
                                                style={{
                                                    backgroundColor:
                                                        item.colorCode,
                                                }}
                                                className='colorBox'
                                            >
                                                <p>{item.colorCode}</p>
                                            </div>
                                        )}

                                        <div className='colorName'>
                                            <p>{item.colorName}</p>

                                            <input
                                                type='checkbox'
                                                value={index}
                                                id={index}
                                                onChange={(event) =>
                                                    checkColor(item, event)
                                                }
                                                style={{
                                                    accentColor: item.colorCode,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </Slider>
                    </div>
                </div>

                <div className='steps step4 full hide'>
                    <section id='RadioSelectionColors'>
                        <div className='boxColor'>
                            <div className='textWrapper'>
                                <div className='textBackground'>
                                    <h2>Cor do elástico</h2>
                                </div>

                                <p>
                                    Selecione <strong>uma</strong> cor
                                </p>
                            </div>

                            <div className='elasticColorWrapper'>
                                {dataColors.map((item, index) =>
                                    item.models.includes('carcara') &&
                                    item.categories.includes('elastic') ? (
                                        <div
                                            className='colorWrapper'
                                            key={index}
                                        >
                                            {item.image ? (
                                                <div className='elasticColor'>
                                                    <img
                                                        src={item.image}
                                                        alt='cor do elástico'
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            item.colorCode,
                                                    }}
                                                    className='elasticColor'
                                                />
                                            )}

                                            <input
                                                type='radio'
                                                onClick={(event) =>
                                                    handleSelectedElasticColor(
                                                        event,
                                                        item,
                                                        index
                                                    )
                                                }
                                                name='selectedElasticColor'
                                                key={item.id}
                                                value={item.name}
                                                style={{
                                                    accentColor: item.colorCode,
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className='steps step5 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tipo de Acabamento</h2>
                        </div>
                    </div>
                    {/* Inserir aqui a imagem de mostra dos tipos de acabamento */}

                    <fieldset>
                        <label htmlFor='SketchFinish'>
                            Selecione o tipo de acabamento nas bordas
                        </label>

                        <select
                            onChange={(event) =>
                                handleSelectedSketchFinish(event)
                            }
                            className='SketchFinish'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Tipo de Acabamento
                            </option>
                            <option value='Reto'>Reto</option>
                            <option value='Arredondado'>Arredondado</option>
                        </select>
                    </fieldset>
                </div>

                <div className='additionalInfos steps step6 hide'>
                    <label htmlFor='additionalInfos'>
                        Informações adicionais <strong>(opcional)</strong>
                    </label>

                    <textarea
                        type='text'
                        name='additionalInfos'
                        id='additionalInfos'
                        onChange={handleClientNote}
                    />

                    {isValidated ? (
                        <>
                            <div className='productInfosWrapper'>
                                <h1>Seu sketchbook</h1>

                                <ul>
                                    <li>
                                        <strong>Tamanho: </strong>
                                        {selectedPaperWidth}
                                    </li>
                                    <li>
                                        <strong>Papel do miolo: </strong>
                                        {sketchbookInfos.name}
                                    </li>

                                    <li>
                                        <strong>Cor da capa: </strong>
                                        {selectedColors.map((color, index) => {
                                            return (
                                                <span key={index}>
                                                    {(index ? ' + ' : '') +
                                                        color.name}
                                                </span>
                                            );
                                        })}
                                    </li>

                                    <li>
                                        <strong>Cor do elástico: </strong>
                                        {selectedElasticColor.colorName}
                                    </li>
                                    <li>
                                        <strong>Tipo de Acabamento: </strong>
                                        {selectedSketchFinish}
                                    </li>
                                </ul>

                                <h3>
                                    Valor do sketchbook: R${' '}
                                    {sketchbookInfos.value}
                                </h3>

                                <button onClick={() => addToCart()}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>
                                Você deve selecionar{' '}
                                <strong>todas as opções</strong> antes de
                                finalizar seu sketchbook
                            </p>
                        </>
                    )}
                </div>

                <div id='btns'>
                    <button
                        className='btn previous hide'
                        onClick={(e) => handlePreviousStep()}
                    >
                        Etapa Anterior
                    </button>
                    <button
                        className='btn next'
                        onClick={(e) => handleNextStep()}
                    >
                        Próxima Etapa
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
