import React, { useEffect, useState } from 'react';

import Header from '../../../components/header';
import Footer from '../../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function RegisterProduct() {
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [dataColors, setDataColors] = useState([]);

    const [sketchbookData, setSketchbookData] = useState({
        id: '',
        productName: '',
        description: '',
        model: '',
        paperWidth: '',
        paper: '',
        principalCoverColor: '',
        secondaryCoverColor: '',
        lineColor: '',
        elasticColor: '',
        spiralColor: '',
        size: {},
        value: 0,
        stock: '',
    });

    const [productSize, setProductSize] = useState({
        weight: '',
        width: '',
        length: '',
        height: '',
    });

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

    function handleSelectedSketchbook(event) {
        setSelectedModel(event.target.value);
        console.log(event.target.value);
    }

    function handleSelectedPaperWidth(event) {
        setSelectedPaperWidth(event.target.value);
        console.log(event.target.value);
    }

    function handleSelectedSpiralColor(event) {
        setSelectedSpiralColor(event.target.value);
        console.log(event.target.value);
    }

    function handleInputProductsChange(event) {
        const { name, value } = event.target;

        setSketchbookData({
            ...sketchbookData,
            [name]: value,
        });
    }

    function handleInputProductsSizeChange(event) {
        const { name, value } = event.target;

        setProductSize({
            ...productSize,
            [name]: value,
        });
    }

    function uploadImage(event) {
        const file = event.target.files[0];

        var storageRef = firebase.storage().ref();

        storageRef
            .child('files/' + file.name.trim())
            .put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => setImageUrl(url));
            });
    }

    function registerProduct() {
        const productData = {
            // id: id,
            productName: sketchbookData.productName,
            description: sketchbookData.description,
            model: selectedModel,
            paperWidth: selectedPaperWidth,
            paper: sketchbookData.paper,
            principalCoverColor: sketchbookData.principalCoverColor,
            secondaryCoverColor: sketchbookData.secondaryCoverColor,
            lineColor: sketchbookData.lineColor,
            elasticColor: sketchbookData.elasticColor,
            spiralColor: selectedSpiralColor,
            size: productSize,
            value: sketchbookData.value,
            stock: sketchbookData.stock,
            productImage: imageUrl,
        };

        console.log(productData);
    }

    return (
        <main id='registerProduct'>
            <Header />

            <section id='createSketchbook'>
                <div className='selectProductType'>
                    <h1>Cadastrar um produto</h1>

                    <select name='selectProductType' id='selectProductType'>
                        <option value='' selected='selected' disabled>
                            Selecione o tipo de produto que deseja cadastrar
                        </option>
                        <option value='Sketchbooks'>Sketchbooks</option>
                        <option value='Outros'>Outros</option>
                    </select>
                </div>

                <label htmlFor='imageUrl'>
                    Imagem do produto
                </label>
                <input
                    type='file'
                    name='imageUrl'
                    id='imageUrl'
                    accept='image/png, image/jpeg'
                    onChange={uploadImage}
                />

                <input
                    type='text'
                    name='productName'
                    id='productName'
                    placeholder='Nome do produto'
                    onChange={handleInputProductsChange}
                />
                <input
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Descrição do produto'
                    onChange={handleInputProductsChange}
                />

                <select
                    name='selectModel'
                    id='selectModel'
                    onChange={handleSelectedSketchbook}
                >
                    <option value='' selected='selected' disabled>
                        Modelo
                    </option>
                    <option value='Baião'>Baião</option>
                    <option value='Carcará'>Carcará</option>
                    <option value='Facheiro'>Facheiro</option>
                    <option value='Mandacaru'>Mandacaru</option>
                    <option value='Sertão'>Sertão</option>
                    <option value='Kindle 10ª Geração'>
                        Kindle 10ª Geração
                    </option>
                    <option value='Kindle Paperwhite'>Kindle Paperwhite</option>
                </select>

                <select
                    name='selectPaperWidth'
                    id='selectPaperWidth'
                    onChange={handleSelectedPaperWidth}
                >
                    <option value='' selected='selected' disabled>
                        Tamanho do papel
                    </option>
                    <option value='A3'>A3</option>
                    <option value='A4'>A4</option>
                    <option value='A5'>A5</option>
                    <option value='A6'>A6</option>
                    <option value='A7'>A7</option>
                    <option value='21X21'>21X21</option>
                    <option value='20X20'>20X20</option>
                    <option value='15X15'>15X15</option>
                    <option value='14X14'>14X14</option>
                    <option value='10X10'>10X10</option>
                </select>

                <input
                    type='text'
                    list='paperOption'
                    placeholder='Papel do miolo'
                    onChange={handleInputProductsChange}
                    name='paper'
                />
                <datalist id='paperOption'>
                    <option value='Papel Reciclado Liso'>
                        Papel Reciclado Liso
                    </option>
                    <option value='Papel Reciclado Pontilhado'>
                        Papel Reciclado Pontilhado
                    </option>
                    <option value='Papel Reciclado Quadriculado'>
                        Papel Reciclado Quadriculado
                    </option>
                    <option value='Papel Reciclado Pautado'>
                        Papel Reciclado Pautado
                    </option>
                    <option value='Papel Marfim Liso'>Papel Marfim Liso</option>
                    <option value='Papel Marfim Pontilhado'>
                        Papel Marfim Pontilhado
                    </option>
                    <option value='Papel Marfim Quadriculado'>
                        Papel Marfim Quadriculado
                    </option>
                    <option value='Papel Marfim Pautado'>
                        Papel Marfim Pautado
                    </option>
                    <option value='Papel Kraft'>Papel Kraft</option>
                    <option value='Papel Canson 140g'>Papel Canson 140g</option>
                    <option value='Papel Canson 200g'>Papel Canson 200g</option>
                    <option value='Papel Preto'>Papel Preto</option>
                    <option value='Papel Canson Aquarela'>
                        Papel Canson Aquarela
                    </option>
                    <option value='Papel Montval'>Papel Montval</option>
                </datalist>

                <input
                    type='text'
                    list='principalCoverColorOption'
                    placeholder='Cor principal'
                    onChange={handleInputProductsChange}
                    name='principalCoverColor'
                />
                <datalist id='principalCoverColorOption'>
                    {dataColors.map((color) => {
                        return color.categories.includes('cover') ? (
                            <option>{color.colorName}</option>
                        ) : null;
                    })}
                </datalist>

                <input
                    type='text'
                    list='secondaryCoverColorOption'
                    placeholder='Cor secundária (caso tenha)'
                    onChange={handleInputProductsChange}
                    name='secondaryCoverColor'
                />
                <datalist id='secondaryCoverColorOption'>
                    {dataColors.map((color) => {
                        return color.categories.includes('cover') ? (
                            <option>{color.colorName}</option>
                        ) : null;
                    })}
                </datalist>

                <input
                    type='text'
                    list='lineColorOptions'
                    placeholder='Cor da linha (caso tenha)'
                    onChange={handleInputProductsChange}
                    name='lineColor'
                />
                <datalist id='lineColorOptions'>
                    {dataColors.map((color) => {
                        return color.categories.includes('line') ? (
                            <option>{color.colorName}</option>
                        ) : null;
                    })}
                </datalist>

                <fieldset>
                    <label for='paper'>Cor do espiral (caso tenha)</label>

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

                <input
                    type='text'
                    list='elasticColorOptions'
                    placeholder='Cor do elástico (caso tenha)'
                    onChange={handleInputProductsChange}
                    name='elasticColor'
                />
                <datalist id='elasticColorOptions'>
                    {dataColors.map((color) => {
                        return color.categories.includes('elastic') ? (
                            <option>{color.colorName}</option>
                        ) : null;
                    })}
                </datalist>

                <input
                    id='weight'
                    name='weight'
                    type='number'
                    onChange={handleInputProductsSizeChange}
                    placeholder='Peso'
                />

                <input
                    id='width'
                    name='width'
                    type='number'
                    onChange={handleInputProductsSizeChange}
                    placeholder='Largura'
                />

                <input
                    id='length'
                    name='length'
                    type='number'
                    onChange={handleInputProductsSizeChange}
                    placeholder='Comprimento'
                />

                <input
                    id='height'
                    name='height'
                    type='number'
                    onChange={handleInputProductsSizeChange}
                    placeholder='Altura'
                />

                <input
                    id='value'
                    name='value'
                    type='number'
                    onChange={handleInputProductsChange}
                    placeholder='Valor'
                />

                <input
                    id='stock'
                    name='stock'
                    type='number'
                    onChange={handleInputProductsChange}
                    placeholder='Quantidade no estoque'
                />
            </section>

            <button onClick={registerProduct}></button>

            <form></form>

            <Footer />
        </main>
    );
}
