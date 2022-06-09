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
import PaperOption from '../../../components/paperOption';

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
    const [sketchbookBasePrice, setSketchbookBasePrice] = useState(0);
    const [sketchbookTotalPrice, setSketchbookTotalPrice] = useState(0);
    const [
        selectedDifferentPapersQuantity,
        setSelectedDifferentPapersQuantity,
    ] = useState(0);
    //esse armazena a quantidade total de blocos selecionados
    const [totalPaperBlocksQtd, setTotalPaperBlocksQtd] = useState(0);

    //esse aqui armazena quantos seletores de quantidade de blocos foram selecionados
    const [selectedPaperBlocksQtd, setSelectedPaperBlocksQtd] = useState(0);
    const [selectedPaperTypeQtd, setSelectedPaperTypeQtd] = useState(0);
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [sketchPaperInfo, setSketchPaperInfo] = useState([
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
    ]);
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState([]);
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const [clicked, setClicked] = useState(5);
    const paginasPorBloco = 16;

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
                basePrice: 60,
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
                        value: 8,
                    },
                    // conferir
                    // {
                    //     name: 'Papel Marfim Liso',
                    //     value: 102,
                    // },
                    {
                        name: 'Papel Kraft',
                        value: 9,
                    },

                    {
                        name: 'Papel Preto',
                        value: 8,
                    },
                ],
            },
            {
                name: 'A4 - Paisagem',
                id: 302,
                basePrice: 40,
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
                        value: 4,
                    },
                    // conferir se esta disponivel
                    // {
                    //     name: 'Papel Marfim Liso',
                    //     value: 67,
                    // },
                    {
                        name: 'Papel Kraft',
                        value: 5,
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
                ],
            },
            {
                name: 'A5 - Paisagem',
                id: 303,
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
                id: 304,
                basePrice: 20,
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
                name: 'A7 - Paisagem',
                id: 305,
                basePrice: 10,
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
                        value: 0.5,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 0.5,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 0.5,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 1.5,
                    },
                    {
                        name: 'Papel Preto',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 2.5,
                    },
                    {
                        name: 'Papel Montval',
                        value: 2.5,
                    },
                ],
            },
            {
                name: '21X21',
                id: 306,
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
                    // conferir preço e se esta disponivel
                    // {
                    //     name: 'Papel Montval',
                    //     value: 122,
                    // },
                ],
            },
            {
                name: '15X15',
                id: 306,
                basePrice: 30,
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
                        name: 'Papel Marfim Pontado',
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
                id: 308,
                basePrice: 20,
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
                        name: 'Papel Marfim Quadriculado',
                        value: 1,
                    },
                    {
                        name: 'Papel Marfim Pontilhado',
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
                name: 'A3 - Retrato',
                id: 309,
                basePrice: 60,
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
                        value: 8,
                    },
                    // conferir
                    // {
                    //
                    //     name: 'Papel Marfim Liso',
                    //     value: 102,
                    // },
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
                    // Conferir se esta disponivel
                    // {
                    //     name: 'Papel Montval',
                    //     value: 230,
                    // },
                ],
            },
            {
                name: 'A4 - Retrato',
                id: 310,
                basePrice: 40,
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
                        value: 4,
                    },
                    {
                        name: 'Papel Marfim Liso',
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
                    // conferir preço e se esta disponivel
                    // {
                    //     name: 'Papel Montval',
                    //     value: 122,
                    // },
                ],
            },
            {
                name: 'A5 - Retrato',
                id: 311,
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
                id: 312,
                basePrice: 20,
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
                name: 'A7 - Retrato',
                id: 313,
                basePrice: 10,
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
                        value: 0.5,
                    },
                    {
                        name: 'Papel Marfim Liso',
                        value: 0.5,
                    },
                    {
                        name: 'Papel Kraft',
                        value: 0.5,
                    },
                    {
                        name: 'Papel Canson 140g',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson 200g',
                        value: 1.5,
                    },
                    {
                        name: 'Papel Preto',
                        value: 1,
                    },
                    {
                        name: 'Papel Canson Aquarela',
                        value: 2.5,
                    },
                    {
                        name: 'Papel Montval',
                        value: 2.5,
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

        // zera o selector de papeis se o cliente chegar a selecionar os papeis, mas mudar de ideia e voltar e mudar o tamanho do sketchbook
        // forçando-o a escolher novamente os papeis do miolo, garantindo que o preço e os papeis escolhidos estarão corretos
        setSelectedDifferentPapersQuantity(0);
        setSketchPaperInfo([
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        ]);
        document.querySelector('.DiffPaperQtdSelector').selectedIndex = 0;

        calculateTotalPrice();
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
            paper: sketchbookInfos,
            value: sketchbookTotalPrice,
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
        //gambiarra para atualizar o preço
        // [] adicionar o calculate no useEffect do currentStep (quando adicionado)
        calculateTotalPrice();
        if (
            formatTypes === '' ||
            selectedPaperTypeQtd < selectedDifferentPapersQuantity ||
            selectedPaperBlocksQtd < selectedDifferentPapersQuantity ||
            totalPaperBlocksQtd > 10 ||
            totalPaperBlocksQtd < 6 ||
            selectedElasticColor === '' ||
            selectedSketchFinish === '' ||
            sketchbookTotalPrice === 0 ||
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
        selectedPaperTypeQtd,
        selectedPaperBlocksQtd,
        totalPaperBlocksQtd,
        selectedElasticColor,
        checkedBoxes,
        selectedSketchFinish,
        sketchbookTotalPrice,
    ]);

    function handleSelectedDiiferentPapersQuatity(event) {
        //zera os elementos do array se o cliente mudar de ideia e diminuir a quantidade de papeis
        if (parseInt(event.target.value) < selectedDifferentPapersQuantity) {
            for (let index = parseInt(event.target.value); index < 4; index++) {
                setSketchPaperInfo((prev) => {
                    let newArr = [...prev];
                    newArr[index] = {
                        ...prev[index],
                        nomePapel: '',
                        precoUnitario: 0,
                        quantidade: 0,
                    };
                    return newArr;
                });
            }
        }
        setSelectedDifferentPapersQuantity(parseInt(event.target.value));
    }

    // tambem adicionar o currentStep ao controle do useEffect
    useEffect(() => {
        setSketchbookInfos(
            sketchPaperInfo.slice(0, selectedDifferentPapersQuantity)
        );
        calculateTotalPrice();
    }, [sketchPaperInfo, selectedPaperWidth, selectedDifferentPapersQuantity]);

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
        let totalPrice = sketchbookBasePrice;

        sketchbookInfos.forEach(function (papel) {
            totalPrice += papel.precoUnitario * papel.quantidade;
        });

        setSketchbookTotalPrice(totalPrice);
    }
    useEffect(() => {
        console.log('preco mudou ' + sketchbookTotalPrice);
    }, [sketchbookTotalPrice]);

    useEffect(() => {
        console.log(sketchbookInfos);
        let paperQtd = 0;
        sketchbookInfos.map((papel) => {
            paperQtd += papel.quantidade;
        });
        setTotalPaperBlocksQtd(paperQtd);

        setSelectedPaperTypeQtd(
            sketchbookInfos.reduce((count, papel) => {
                if (papel.nomePapel !== '') {
                    count += 1;
                }
                return count;
            }, 0)
        );
        setSelectedPaperBlocksQtd(
            sketchbookInfos.reduce((count, papel) => {
                if (papel.quantidade !== 0) {
                    count += 1;
                }
                return count;
            }, 0)
        );
    }, [sketchbookInfos]);

    useEffect(() => {
        console.log('qtd de papeis selecionados ' + selectedPaperTypeQtd);
    }, [selectedPaperTypeQtd]);

    useEffect(() => {
        console.log('qtd de blocos selecionados ' + selectedPaperBlocksQtd);
    }, [selectedPaperBlocksQtd]);

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
                                    {format.name} (+ R$ {format.basePrice})
                                </option>
                            );
                        })}
                    </select>
                </fieldset>

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Papel do Miolo</h2>
                    </div>
                </div>
                <fieldset>
                    <label htmlFor='paperQtd'>
                        Selecione a quantidade de Papéis Diferentes no Miolo do
                        Sketchbook
                    </label>
                    <select
                        id='paperQtd'
                        onChange={handleSelectedDiiferentPapersQuatity}
                        className='DiffPaperQtdSelector'
                        defaultValue='0'
                    >
                        <option value='0' disabled>
                            Quantidade de Papéis Diferentes
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>

                    <p>
                        Os Sketchbooks podem ser montados adicionando blocos de
                        <b> 16 páginas</b>
                    </p>
                    <br />

                    <p>
                        Veja mais sobre a gramatura e quantidade de páginas
                        clicando <Link to='/gramaturas'>aqui</Link>
                    </p>
                    <br />

                    {[...Array(selectedDifferentPapersQuantity)].map((_, i) => (
                        <PaperOption
                            tipos={formatTypes}
                            quantidade={paginasPorBloco}
                            setSketchPaperInfo={setSketchPaperInfo}
                            index={i}
                            key={i}
                        />
                    ))}

                    {/* so mostra os avisos se a pessoa escolher a quantidade de papeis diferentes, pra deixar o visual mais limpo */}
                    {selectedDifferentPapersQuantity === 0 ? (
                        ''
                    ) : (
                        <>
                            <p>
                                Os Sketchbooks devem ter ao final, no mínimo
                                <b> 6 blocos (96 páginas)</b> e no máximo
                                <b> 10 blocos (160 páginas)</b>
                            </p>
                            <br />

                            <h3 id='paperWarning'>
                                Seu Sketchbook tem atualmente{' '}
                                <b>{totalPaperBlocksQtd}</b> blocos.
                            </h3>

                            {totalPaperBlocksQtd > 10 ||
                            totalPaperBlocksQtd < 6 ? (
                                <p>
                                    Ajuste a quantidade de blocos antes de
                                    avançar para a próxima etapa.
                                </p>
                            ) : (
                                ''
                            )}
                            {selectedPaperTypeQtd <
                            selectedDifferentPapersQuantity ? (
                                <p>
                                    Você deve selecionar{' '}
                                    <strong>todas as opções</strong> de papéis
                                    antes de prosseguir
                                </p>
                            ) : (
                                ''
                            )}
                            {selectedPaperBlocksQtd <
                            selectedDifferentPapersQuantity ? (
                                <p>
                                    Você deve selecionar{' '}
                                    <strong>todas as opções</strong> de
                                    quantidade de blocos antes de prosseguir
                                </p>
                            ) : (
                                ''
                            )}
                            {totalPaperBlocksQtd > 10 ||
                            totalPaperBlocksQtd < 6 ||
                            selectedPaperTypeQtd <
                                selectedDifferentPapersQuantity ||
                            selectedPaperBlocksQtd <
                                selectedDifferentPapersQuantity ? (
                                ''
                            ) : (
                                <p>Vamos continuar!</p>
                            )}
                        </>
                    )}
                </fieldset>

                <div className='textWrapper'>
                    <div className='textBackground'>
                        <h2>Cor da capa</h2>
                    </div>

                    <p>
                        Selecione <strong>uma</strong> cor. Arraste para o lado
                        para conferir todas as opções.{' '}
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
                                    <div className='colorWrapper' key={index}>
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
                    <label htmlFor='SketchFinish'>
                        Selecione o tipo de acabamento nas bordas
                    </label>

                    <select
                        onChange={(event) => handleSelectedSketchFinish(event)}
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

                <div className='additionalInfos'>
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
                                        <strong>Papel do miolo: </strong> <br />
                                        <br />
                                        {sketchbookInfos.map((papel, index) => {
                                            return (
                                                <p key={index}>
                                                    {index + 1} -{' '}
                                                    <strong>
                                                        {papel.quantidade}
                                                    </strong>{' '}
                                                    bloco(s) de{' '}
                                                    <strong>
                                                        {papel.nomePapel}
                                                    </strong>
                                                </p>
                                            );
                                        })}
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
                                    {sketchbookTotalPrice.toFixed(2)}
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
