import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/carcara2.jpg';
import CarcaraRetangular from '../../../images/capas/CarcaraRetangular.png';
import CarcaraQuadrado from '../../../images/capas/CarcaraQuadrado.png';
import TAMANHOS_E_ORIENTACOES from '../../../images/CARCARA_TAMANHOS_E_ORIENTACOES.jpg';
import PAPEIS_DO_MIOLO from '../../../images/PAPEIS_DO_MIOLO.jpg';
import ACABAMENTO from '../../../images/ACABAMENTO.jpg';

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
    const [preSelectedElasticColor, setPreSelectedElasticColor] = useState('');
    const [displayElasticColorSelection, setDisplayElasticColorSelection] =
        useState('flex');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [totalValue, setTotalValue] = useState(0);
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
                name: 'A3 - Paisagem (29x42 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 102,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 102,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 107,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 144,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 250,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 250,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 254,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 268,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 254,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 302,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 302,
                    },
                ],
            },
            {
                name: 'A3 - Retrato (29x42 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 102,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 102,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 107,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas) (84 páginas)',
                        value: 157,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
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
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 250,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 250,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 254,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 268,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 254,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 302,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 302,
                    },
                ],
            },
            {
                name: 'A4 - Paisagem (21x29 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 138,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                ],
            },
            {
                name: 'A4 - Retrato (29x21 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 82,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 228,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 252,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 138,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 282,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 288,
                    },
                ],
            },
            {
                name: 'A5 - Paisagem (15x21 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 44,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 50,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 57,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 54,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 124,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 182,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 85,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 152,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 202,
                    },
                ],
            },
            {
                name: 'A5 - Retrato (21x15 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Reciclado Pautado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Quadriculado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Pautado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 44,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 50,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 57,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 54,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 124,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 182,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 85,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 152,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 202,
                    },
                ],
            },
            {
                name: 'A6 - Paisagem (10,5x15 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Pautado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Pautado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 32,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 38,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 42,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 39,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 52,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 54,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 56,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 53,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 86,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 90,
                    },
                ],
            },
            {
                name: 'A6 - Retrato (15x10,5 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Pautado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Pautado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 32,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 38,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 42,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 39,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 52,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 54,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 56,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 53,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 86,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 90,
                    },
                ],
            },
            {
                name: 'A7 - Paisagem (7,5x10,5 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 20,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 22,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 19,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 24,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 24,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 42,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 35,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 32,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 29,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 50,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 40,
                    },
                ],
            },
            {
                name: 'A7 - Retrato (10,5x7,5 cm)',
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 18,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 20,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 22,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 19,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 24,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 24,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 42,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 35,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 28,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 32,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 29,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 30,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 50,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 40,
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 82,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas) (84 páginas)',
                        value: 90,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 228,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 252,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 138,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 282,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 288,
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Quadriculado 120g (116 páginas)',
                        value: 40,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',	
                        value: 40,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 44,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 50,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 57,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 54,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 124,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 182,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 78,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 85,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 82,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 98,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 152,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 202,
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
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Reciclado Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Quadriculado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Marfim Pontilhado 120g (116 páginas)',
                        value: 28,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 32,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 38,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 42,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 39,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 48,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 80,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 48,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 52,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 54,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 56,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 53,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 58,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 86,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 90,
                    },
                ],
            },
            {
                name: 'Colegial - Paisagem (18x24 cm)',
                id: 314,
                size: {
                    width: 24,
                    length: 18,
                    // height: 2.5,
                    height: 3,
                    weight: 0.7,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 138,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                ],
            },
            {
                name: 'Colegial - Retrato (24x18 cm)',
                id: 314,
                size: {
                    width: 18,
                    length: 24,
                    // height: 2.5,
                    height: 3,
                    weight: 0.7,
                },
                types: [
                    {
                        name: 'Papel Reciclado Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Marfim Liso 120g (116 páginas)',
                        value: 67,
                    },
                    {
                        name: 'Papel Kraft 140g (116 páginas)',
                        value: 72,
                    },
                    {
                        name: 'Papel Canson 140g (84 páginas)',
                        value: 82,
                    },
                    {
                        name: 'Papel Canson 200g (84 páginas)',
                        value: 92,
                    },
                    {
                        name: 'Papel Preto 180g (84 páginas)',
                        value: 85,
                    },
                    {
                        name: 'Papel Canson Aquarela 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Montval 300g (52 páginas)',
                        value: 122,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas)',
                        value: 228,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas)',
                        value: 252,
                    },
                    {
                        name: 'Marfim 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Reciclado 120g (116 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Kraft 140g (116 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Canson 140g (84 págs) + Papel Vegetal',
                        value: 138,
                    },
                    {
                        name: 'Canson 200g (84 págs) + Papel Vegetal',
                        value: 148,
                    },
                    {
                        name: 'Preto 180g (84 págs) + Papel Vegetal',
                        value: 142,
                    },
                    {
                        name: 'Canson Aquarela 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Montval 300g (52 págs) + Papel Vegetal',
                        value: 158,
                    },
                    {
                        name: 'Papel Strathmore Bristol 270g (84 páginas) + Papel Vegetal',
                        value: 282,
                    },
                    {
                        name: 'Papel Hahnemühle Expression 300g (52 páginas) + Papel Vegetal',
                        value: 288,
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
        setTotalValue(0);
    }

    function handleSelectedType(event) {
        let position = event.target.value;
        setSketchbookInfos(formatTypes[position]);
        setTotalValue(formatTypes[position].value);

        // desmarca todas as checkboxes
        document
            .querySelectorAll('input[type=checkbox]')
            .forEach(function (check) {
                check.checked = false;
            });
        //"despinta" todas as checkboxes
        document.querySelectorAll('.coverColorLabel').forEach((label) => {
            label.style.backgroundColor = 'transparent';
        });
        // zera as capas selecionadas, para nao dar problema no calculo do preco se selecionar uma capa ILUSTRES
        setSelectedColors([]);
        setCheckedBoxes(0);

        // zera as cores de linha e elastico selecionadas, para caso seja selecionado uma ilustres e o cliente volte para mudar o papel, e
        // pelas linhas acima as capas sao zeradas, e se uma capa ilustre que tinha sido selecionada é zerada, suas cores (de linha e elastico) predefinidas tambem precisam ser zeradas
        zerarCoresPreSelecionadas();
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
            value: totalValue,
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

            if (item.isIlustres) {
                setTotalValue(sketchbookInfos.value + item.aditionalPrice);
                // define a cor do elastico do sketch e esconde o seletor de cor de elastico se a pre definifa existir (se nao for uma string vazia)
                if (item.preSelectedElasticColor) {
                    setDisplayElasticColorSelection('none');
                    setSelectedElasticColor(item.preSelectedElasticColor);
                    setPreSelectedElasticColor(item.preSelectedElasticColor);
                }

                // desmarca todos os radio buttons de cor de elastico
                document
                    .querySelectorAll('input[name=selectedElasticColor]')
                    .forEach(function (check) {
                        check.checked = false;
                    });
            }
        } else {
            const color = item.colorName;
            let index = selectedColors.findIndex(
                (element) => element.name === color
            );

            if (index !== -1) {
                selectedColors.splice(index, 1);
                setCheckedBoxes(checkedBoxes - 1);
            }

            if (item.isIlustres) {
                setTotalValue(sketchbookInfos.value);
                zerarCoresPreSelecionadas();
            }
        }
    };

    function zerarCoresPreSelecionadas() {
        setSelectedElasticColor('');
        setPreSelectedElasticColor('');

        setDisplayElasticColorSelection('flex');

        // desmarca todos os radio buttons de cor de elastico
        document
            .querySelectorAll('input[name=selectedElasticColor]')
            .forEach(function (check) {
                check.checked = false;
            });
    }

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

        // move a tela para cima para ficar melhor a percepcao do passo a passo
        if (currentStep !== 1) {
            window.scrollTo({
                top:
                    352 +
                    document.querySelector('.iframe-container').clientHeight,
                left: 0,
            });
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
                <div
                    className='iframe-container'
                    style={{ marginBottom: '1rem' }}
                >
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/ERJvsq3oCfU'
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                    ></iframe>
                </div>
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
                        <img
                            src={TAMANHOS_E_ORIENTACOES}
                            alt='Demonstração dos tamanhos disponíveis, retangular do A4 ao A7 e quadrado sendo 10x10, 15x15 ou 21x21, e também das orientações, podendo ser retrato ou paisagem'
                        />
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
                        <img
                            src={PAPEIS_DO_MIOLO}
                            alt='Imagem mostrando os diferentes tipos de papeis que podem ser selecionados no sketchbook'
                        />
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
                            {/* Mostra todas as capas que nao sao ilustres, que sao deste modelo */}
                            {dataColors.map((item, index) =>
                                item.models.includes('carcara') &&
                                item.categories.includes('cover') &&
                                !item.isIlustres ? (
                                    <div className='cardColor' key={index}>
                                        <label
                                            htmlFor={index}
                                            className='coverColorLabel'
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
                            {/* Mostra as capas ilustres ao final para deixar agrupadas, que sao deste modelo, e que estao disponiveis para o tamanho selecionado */}
                            {dataColors.map((item, index) =>
                                item.availableSizes && selectedPaperWidth ? (
                                    item.models.includes('carcara') &&
                                    item.categories.includes('cover') &&
                                    item.availableSizes.includes(
                                        selectedPaperWidth
                                    ) ? (
                                        <div className='cardColor' key={index}>
                                            <label
                                                htmlFor={index}
                                                className='coverColorLabel'
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
                                                <p>
                                                    <span
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    >
                                                        (+ R$
                                                        {item.aditionalPrice})
                                                    </span>{' '}
                                                    {item.colorName}
                                                </p>

                                                <input
                                                    type='checkbox'
                                                    value={index}
                                                    id={index}
                                                    onChange={(event) =>
                                                        checkColor(item, event)
                                                    }
                                                    style={{
                                                        accentColor:
                                                            item.colorCode,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : null
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

                                {preSelectedElasticColor ? (
                                    <p style={{ lineHeight: '2.5rem' }}>
                                        A capa escolhida já possui a cor do
                                        elástico:{'  '}
                                        <span className='emphasisWarning'>
                                            {preSelectedElasticColor.colorName}
                                        </span>
                                        {'  '}
                                        pré-definida. Avance para a próxima
                                        etapa.
                                    </p>
                                ) : (
                                    <p>
                                        Selecione <strong>uma</strong> cor
                                    </p>
                                )}
                            </div>

                            <div
                                className='elasticColorWrapper'
                                style={{
                                    display: displayElasticColorSelection,
                                }}
                            >
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
                        <img
                            src={ACABAMENTO}
                            alt='Demonstração do acabamento das bordas do sketchbook, podendo ser arredondado ou reto'
                        />
                    </div>

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

                                <h3>Valor do sketchbook: R$ {totalValue}</h3>

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
