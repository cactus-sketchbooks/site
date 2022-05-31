import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/facheiro.png';
import Facheiro1Cor from '../../../images/capas/CAPA MODELO FACHEIRO UMA COR.png';
import Facheiro2Cores from '../../../images/capas/CAPA MODELO FACHEIRO DUAS CORES.png';
import FacheiroQuadrado1Cor from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO UMA COR.png';
import FacheiroQuadrado2Cores from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO DUAS CORES.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';

const PaperOption = ({ tipos, quantidade, setSketchPaperInfo, index }) => {
    return (
        <>
            <label for='paperSelector'>
                Selecione o Papel do Miolo {index + 1}
            </label>
            <select
                name='paperSelector'
                onChange={(e) =>
                    setSketchPaperInfo((prev) => {
                        let newArr = [...prev];
                        newArr[index] = {
                            ...prev[index],
                            nomePapel: tipos[e.target.value].name,
                            precoUnitario: tipos[e.target.value].value,
                        };
                        return newArr;
                    })
                }
            >
                <option value='' selected disabled>
                    ({index + 1}) - Papel do miolo
                </option>
                {tipos.map((type, index) => {
                    return (
                        <option value={index} key={index}>
                            {type.name} - R$ {type.value}
                        </option>
                    );
                })}
            </select>

            <label for='paperQuantity'>
                Selecione a quantidade de blocos do Papel do Miolo {index + 1}
            </label>
            <select
                name='paperQuantity'
                onChange={(e) =>
                    setSketchPaperInfo((prev) => {
                        let newArr = [...prev];
                        newArr[index] = {
                            ...prev[index],
                            quantidade: e.target.value,
                        };
                        return newArr;
                    })
                }
            >
                <option value='' selected disabled>
                    Quantidade de Blocos{' '}
                </option>
                {[...Array(10)].map((_, i) => (
                    <option value={quantidade * (i + 1)}>{`${i + 1} - ${
                        quantidade * (i + 1)
                    } páginas`}</option>
                ))}
            </select>
            <br />
            <br />
        </>
    );
};

export default function Facheiro() {
    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(0);
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [sketchbookBasePrice, setSketchbookBasePrice] = useState(0);
    const [sketchbookTotalPrice, setSketchbookTotalPrice] = useState(0);
    const [
        selectedDifferentPapersQuantity,
        setSelectedDifferentPapersQuantity,
    ] = useState(0);
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [sketchPaperInfo, setSketchPaperInfo] = useState([
        { nomePapel: '', precoUnitario: '', quantidade: '' },
        { nomePapel: '', precoUnitario: '', quantidade: '' },
        { nomePapel: '', precoUnitario: '', quantidade: '' },
        { nomePapel: '', precoUnitario: '', quantidade: '' },
    ]);
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const paginasPorBloco = 16;

    const settings = {
        className: 'start',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: maxSlides,
        swipeToSlide: true,
    };

    const values = {
        name: 'Facheiro',
        formats: [
            {
                name: 'A3 - Paisagem',
                id: 401,
                basePrice: 60,
                size: {
                    width: 29.7,
                    length: 42,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 8,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 9,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 14,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 20,
                    },
                    {
                        name: 'Papel Preto',
                        value: 8,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 36,
                    },
                    {
                        name: 'Papel Montval',
                        value: 225,
                    },
                ],
            },

            {
                name: 'A4 - Paisagem',
                id: 402,
                basePrice: 40,
                size: {
                    width: 21,
                    length: 29,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 4,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 5,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 7,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 10,
                    },
                    {
                        name: 'Papel Preto',
                        value: 8,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 18,
                    },
                    {
                        name: 'Papel Montval',
                        value: 122,
                    },
                ],
            },
            {
                name: 'A5 - Paisagem',
                id: 403,
                basePrice: 30,
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
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 5,
                    },
                    {
                        name: 'Papel Preto',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 9,
                    },
                    {
                        name: 'Papel Montval',
                        value: 9,
                    },
                ],
            },
            {
                name: 'A6 - Paisagem',
                id: 404,
                basePrice: 20,
                size: {
                    width: 10.5,
                    length: 15,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 3,
                    },
                    {
                        name: 'Papel Preto',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 5,
                    },
                    {
                        name: 'Papel Montval',
                        value: 5,
                    },
                ],
            },
            {
                name: '21X21',
                id: 405,
                basePrice: 40,
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
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 4,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 5,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 7,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 10,
                    },
                    {
                        name: 'Papel Preto',
                        value: 8,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 18,
                    },
                    {
                        name: 'Papel Montval',
                        value: 122,
                    },
                ],
            },
            {
                name: '15X15',
                id: 406,
                basePrice: 30,
                size: {
                    width: 15,
                    length: 15,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 5,
                    },
                    {
                        name: 'Papel Preto',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 9,
                    },
                    {
                        name: 'Papel Montval',
                        value: 9,
                    },
                ],
            },
            {
                name: '10X10',
                id: 407,
                basePrice: 20,
                size: {
                    width: 10,
                    length: 10,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 3,
                    },
                    {
                        name: 'Papel Preto',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 5,
                    },
                    {
                        name: 'Papel Montval',
                        value: 5,
                    },
                ],
            },
            {
                name: 'A4 - Retrato',
                id: 408,
                basePrice: 40,
                size: {
                    width: 21,
                    length: 29,
                    height: 3,
                    // height: 2.5,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 4,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 5,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 7,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 10,
                    },
                    {
                        name: 'Papel Preto',
                        value: 8,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 18,
                    },
                    {
                        name: 'Papel Montval',
                        value: 122,
                    },
                ],
            },
            {
                name: 'A5 - Retrato',
                id: 409,
                basePrice: 30,
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
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 2,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 2,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 5,
                    },
                    {
                        name: 'Papel Preto',
                        value: 4,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 9,
                    },
                    {
                        name: 'Papel Montval',
                        value: 9,
                    },
                ],
            },
            {
                name: 'A6 - Retrato',
                id: 410,
                basePrice: 20,
                size: {
                    width: 10.5,
                    length: 15,
                    // height: 2.5,
                    height: 3,
                    weight: 0.5,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Reciclado Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pautado',
                        value: 1,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 3,
                    },
                    {
                        name: 'Papel Preto',
                        value: 2,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 5,
                    },
                    {
                        name: 'Papel Montval',
                        value: 5,
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
        setSketchbookBasePrice(values.formats[position].basePrice);
        calculateTotalPrice();
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
            model: 'Facheiro',
            id: formatId,
            paperWidth: selectedPaperWidth,
            sketchPaperInfo: sketchPaperInfo,
            spiralColor: selectedSpiralColor,
            elasticColor: selectedElasticColor,
            sketchFinish: selectedSketchFinish,
            coverColors: selectedColors,
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
        //gambiarra para atualizar o preço
        calculateTotalPrice();
        if (
            formatTypes === '' ||
            selectedSpiralColor === '' ||
            selectedElasticColor === '' ||
            selectedSketchFinish === '' ||
            sketchbookTotalPrice === 0 ||
            checkedBoxes > 2 ||
            checkedBoxes === 0
        ) {
            setIsValidated(false);
        } else {
            setIsValidated(true);
        }
    }, [
        formatTypes,
        sketchPaperInfo,
        selectedSpiralColor,
        selectedElasticColor,
        selectedSketchFinish,
        sketchbookTotalPrice,
        checkedBoxes,
    ]);

    function handleSelectedDiiferentPapersQuatity(event) {
        setSelectedDifferentPapersQuantity(parseInt(event.target.value));
    }
    useEffect(() => {
        console.log(sketchPaperInfo);
        calculateTotalPrice();
    }, [sketchPaperInfo]);

    function handleSelectedSpiralColor(event) {
        setSelectedSpiralColor(event.target.value);
    }

    function handleSelectedElasticColor(item, event) {
        setSelectedElasticColor(event);
    }

    function handleSelectedSketchFinish(event) {
        setSelectedSketchFinish(event.target.value);
    }

    function handleClientNote(event) {
        setClientNote(event.target.value);
    }

    function calculateTotalPrice() {
        let totalPrice = 0;
        totalPrice = sketchbookBasePrice;
        setSketchbookTotalPrice(totalPrice);
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

    return (
        <main id='MainSketchbook'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div id='facheiroVersion' className='modalContent'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com uma cor</h3>
                        <img src={Facheiro1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com duas cores</h3>
                        <img src={Facheiro2Cores} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado com uma cor</h3>
                        <img src={FacheiroQuadrado1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado com duas cores</h3>
                        <img src={FacheiroQuadrado2Cores} alt='' />
                    </div>
                </div>
            </div>

            <Header />

            <section id='CreateSketchbookSection'>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo' />
                </div>

                <div className='textIntro'>
                    <h1>Monte seu Facheiro</h1>
                    <h5>
                        Selecione as opções abaixo e monte seu cactus do seu
                        jeito
                    </h5>
                </div>

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Tamanho e Orientação</h2>
                    </div>
                </div>
                <fieldset>
                    <label for='paperWidth'>Selecione o tamanho do papel</label>

                    <select
                        onChange={handleSelectedSketchbook}
                        className='paperWidth'
                    >
                        <option value='' selected disabled>
                            Tamanho do papel
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

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Papel do Miolo</h2>
                    </div>
                    <p>
                        Nossos Skecths podem ser montados com até 4 tipos de
                        papéis diferentes no miolo.
                    </p>
                </div>

                <fieldset>
                    <label for='paper'>
                        Selecione a quantidade de Papeis Diferentes no Miolo do
                        Sketch
                    </label>
                    <select
                        onChange={handleSelectedDiiferentPapersQuatity}
                        className='paper'
                    >
                        <option value='' selected disabled>
                            Quantidade de Papeis Diferentes
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <p>
                        Os Sketchs podem ser montados adicionando blocos de
                        <b> 16 páginas</b>
                    </p>
                    <br />
                    <p>
                        Os Sketchs devem ter no mínimo
                        <b> 6 blocos (96 páginas)</b> e no máximo
                        <b> 10 blocos (160 páginas)</b>
                    </p>
                    <br />
                    <br />
                    <p>
                        Veja mais sobre a gramatura e quantidade de páginas
                        clicando <Link to='/gramaturas'>aqui</Link>
                    </p>
                    <br />

                    {/* aqui teste do novo renderizador de selects de papeis */}
                    {[...Array(selectedDifferentPapersQuantity)].map((_, i) => (
                        <PaperOption
                            tipos={formatTypes}
                            quantidade={paginasPorBloco}
                            setSketchPaperInfo={setSketchPaperInfo}
                            index={i}
                        />
                    ))}
                </fieldset>

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Cor da capa</h2>
                    </div>

                    <p>
                        Selecione <strong>até duas</strong> cores. Arraste para
                        o lado para conferir todas as opções.{' '}
                        <button onClick={() => handleModalInfos()}>
                            Clique aqui para visualizar os modelos de capa
                        </button>
                    </p>
                    <p>
                        A <b>primeira</b> cor selecionada é referente à parte
                        maior (inferior) e a <b>segunda</b> é referente à parte
                        menor (superior). Não é possível escolher dois tipos de
                        tecido por capa, e se um tecido for esolhido, ele{' '}
                        <b>obrigatoriamente</b> ficará na parte de baixo
                        (maior).
                    </p>
                </div>

                <div className='sliderColors'>
                    <Slider {...settings}>
                        {dataColors.map((item, index) =>
                            item.models.includes('facheiro') &&
                            item.categories.includes('cover') ? (
                                <div className='cardColor'>
                                    <label
                                        for={index}
                                        onClick={(event) => changeColor(event)}
                                    />

                                    {item.image ? (
                                        <div key={item.id} className='colorBox'>
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
                                                backgroundColor: item.colorCode,
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

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Cor do espiral</h2>
                    </div>
                </div>

                <fieldset>
                    <label for='paper'>Selecione a cor do espiral</label>

                    <select
                        onChange={handleSelectedSpiralColor}
                        className='paper'
                    >
                        <option value='' selected disabled>
                            Cor do espiral
                        </option>
                        <option value='Preto'>Preto</option>
                        <option value='Branco'>Branco</option>
                    </select>
                </fieldset>

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
                                item.models.includes('buriti') &&
                                item.categories.includes('elastic') ? (
                                    <div className='colorWrapper'>
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

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Tipo de Acabamento</h2>
                    </div>
                </div>
                {/* Inserir aqui a imagem de mostra dos tipos de acabamento */}

                <fieldset>
                    <label for='paper'>
                        Selecione o tipo de acabamento nas bordas
                    </label>

                    <select
                        onChange={(event) => handleSelectedSketchFinish(event)}
                        className='SketchFinish'
                    >
                        <option value='' selected disabled>
                            Tipo de Acabamento
                        </option>
                        <option value='Reto'>Reto</option>
                        <option value='Arredondado'>Arredondado</option>
                    </select>
                </fieldset>

                <div className='additionalInfos'>
                    <label for='additionalInfos'>
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
                                        <strong>Tamanho do papel: </strong>
                                        {selectedPaperWidth}
                                    </li>
                                    <li>
                                        <strong>Papel do miolo: </strong>
                                        {sketchbookInfos.name}
                                    </li>

                                    <li>
                                        <strong>Cor da capa: </strong>

                                        {selectedColors.length > 0 ? (
                                            selectedColors.length === 2 ? (
                                                <span>{`${selectedColors[0].name} (parte inferior) e ${selectedColors[1].name} (parte superior)`}</span>
                                            ) : (
                                                <span>
                                                    {selectedColors[0].name}
                                                </span>
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </li>

                                    <li>
                                        <strong>Cor do espiral: </strong>
                                        {selectedSpiralColor}
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
                                    {sketchbookTotalPrice}
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
            </section>

            <Footer />
        </main>
    );
}
