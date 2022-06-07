import React, { useEffect, useState } from 'react';

import Header from '../../../components/header';
import Footer from '../../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function RegisterProduct() {
    const [selectedProductType, setSelectedProductType] =
        useState('Sketchbook');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [selectedBorderType, setSelectedBorderType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [dataColors, setDataColors] = useState([]);

    const [sketchbookData, setSketchbookData] = useState({
        id: '',
        productName: '',
        description: '',
        model: '',
        paperWidth: '',
        paper: '',
        coverColors: ['', ''],
        lineColor: '',
        elasticColor: '',
        spiralColor: '',
        borderType: '',
        size: {},
        value: 0,
        stock: '',
        productImage: '',
    });

    const [productSize, setProductSize] = useState({
        weight: 0,
        width: 0,
        length: 0,
        height: 0,
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

    function handleSelectedProductType(event) {
        setSelectedProductType(event.target.value);
    }

    function handleSelectedSketchbook(event) {
        setSelectedModel(event.target.value);
    }

    function handleSelectedPaperWidth(event) {
        setSelectedPaperWidth(event.target.value);
    }

    function handleSelectedSpiralColor(event) {
        setSelectedSpiralColor(event.target.value);
    }

    function handleSelectedBorderType(event) {
        setSelectedBorderType(event.target.value);
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
            .child('productImages/' + file.name.trim())
            .put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => setImageUrl(url));
            });
    }

    function registerProduct() {
        const id = firebase.database().ref().child('products').push().key;

        const productData = {
            id: id,
            productName: sketchbookData.productName,
            description: sketchbookData.description,
            model: selectedModel,
            paperWidth: selectedPaperWidth,
            paper: sketchbookData.paper,
            coverColors: [
                sketchbookData.principalCoverColor ? sketchbookData.principalCoverColor : '',
                sketchbookData.secondaryCoverColor ? sketchbookData.secondaryCoverColor : ''
            ],
            lineColor: sketchbookData.lineColor,
            elasticColor: sketchbookData.elasticColor,
            spiralColor: selectedSpiralColor,
            borderType: selectedBorderType,
            size: productSize,
            value: sketchbookData.value,
            stock: sketchbookData.stock,
            productImage: imageUrl,
        };

        firebase
            .database()
            .ref('products/' + id)
            .set(productData)
            .then((err) => console.log(err));

        setSketchbookData({
            id: '',
            productName: '',
            description: '',
            model: '',
            paperWidth: '',
            paper: '',
            coverColors: [],
            lineColor: '',
            elasticColor: '',
            spiralColor: '',
            size: {},
            value: 0,
            stock: '',
            productImage: '',
        });

        alert('Item inserido com sucesso!');
        window.location.reload();
        
    }

    return (
        <main id='registerProduct'>
            <Header />

            <section id='optionSection'>
                <div className='selectProductType'>
                    <h1>Cadastrar um produto</h1>

                    <label htmlFor='selectProductType'>Tipo de produto</label>
                    <select
                        name='selectProductType'
                        id='selectProductType'
                        onChange={handleSelectedProductType}
                    >
                        <option value='Sketchbook'>Sketchbook</option>
                        <option value='Outros'>Outro</option>
                    </select>
                </div>
            </section>

            <section id='formSection'>
                {selectedProductType === 'Sketchbook' ? (
                    <form>
                        <label htmlFor='imageUrl'>Imagem do produto</label>
                        <input
                            type='file'
                            id='imageUrl'
                            accept='image/png, image/jpeg'
                            onChange={uploadImage}
                        />

                        <label htmlFor='productName'>Nome do produto</label>
                        <input
                            type='text'
                            name='productName'
                            id='productName'
                            placeholder='Nome do produto'
                            onChange={handleInputProductsChange}
                        />

                        <label htmlFor='description'>
                            Descrição do produto
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            placeholder='Descrição do produto'
                            onChange={handleInputProductsChange}
                        />

                        <label htmlFor='selectModel'>
                            Modelo do sketchbook
                        </label>
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
                            <option value='Kindle Paperwhite'>
                                Kindle Paperwhite
                            </option>
                        </select>

                        <label htmlFor='selectPaperWidth'>
                            Tamanho do papel
                        </label>
                        <select
                            name='selectPaperWidth'
                            id='selectPaperWidth'
                            onChange={handleSelectedPaperWidth}
                        >
                            <option value='' selected='selected' disabled>
                                Tamanho
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

                        <fieldset>
                            <label htmlFor='paperOptionId'>
                                Papel do miolo
                            </label>
                            <input
                                type='text'
                                list='paperOption'
                                id='paperOptionId'
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
                                <option value='Papel Marfim Liso'>
                                    Papel Marfim Liso
                                </option>
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
                                <option value='Papel Canson 140g'>
                                    Papel Canson 140g
                                </option>
                                <option value='Papel Canson 200g'>
                                    Papel Canson 200g
                                </option>
                                <option value='Papel Preto'>Papel Preto</option>
                                <option value='Papel Canson Aquarela'>
                                    Papel Canson Aquarela
                                </option>
                                <option value='Papel Montval'>
                                    Papel Montval
                                </option>
                            </datalist>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='borderType'>
                                Tipo da borda
                            </label>

                            <select
                                onChange={handleSelectedBorderType}
                                id='borderType'
                            >
                                <option value='' selected disabled>
                                    Tipo da borda
                                </option>
                                <option value='Quadrada'>Quadrada</option>
                                <option value='Arredondada'>Arredondada</option>
                            </select>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='principalCoverColorOptionId'>
                                Cor de capa principal
                            </label>
                            <input
                                type='text'
                                list='principalCoverColorOption'
                                id='principalCoverColorOptionId'
                                placeholder='Cor principal'
                                onChange={handleInputProductsChange}
                                name='principalCoverColor'
                            />
                            <datalist id='principalCoverColorOption'>
                                {dataColors.map((color) => {
                                    return color.categories.includes(
                                        'cover'
                                    ) ? (
                                        <option>{color.colorName}</option>
                                    ) : null;
                                })}
                            </datalist>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='secondaryCoverColorOptionId'>
                                Cor de capa secundária (caso tenha)
                            </label>
                            <input
                                type='text'
                                list='secondaryCoverColorOption'
                                id='secondaryCoverColorOptionId'
                                placeholder='Cor secundária'
                                onChange={handleInputProductsChange}
                                name='secondaryCoverColor'
                            />
                            <datalist id='secondaryCoverColorOption'>
                                {dataColors.map((color) => {
                                    return color.categories.includes(
                                        'cover'
                                    ) ? (
                                        <option>{color.colorName}</option>
                                    ) : null;
                                })}
                            </datalist>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='lineColorOptionsId'>
                                Cor da linha (caso tenha)
                            </label>
                            <input
                                type='text'
                                list='lineColorOptions'
                                id='lineColorOptionsId'
                                placeholder='Cor da linha'
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
                        </fieldset>

                        <fieldset>
                            <label htmlFor='spiralColor'>
                                Cor da espiral (caso tenha)
                            </label>

                            <select
                                onChange={handleSelectedSpiralColor}
                                id='spiralColor'
                            >
                                <option value='' selected disabled>
                                    Cor do espiral
                                </option>
                                <option value='Preto'>Preto</option>
                                <option value='Branco'>Branco</option>
                            </select>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='elasticColorOptionsId'>
                                Cor do elástico (caso tenha)
                            </label>
                            <input
                                type='text'
                                list='elasticColorOptions'
                                id='elasticColorOptionsId'
                                placeholder='Cor do elástico (caso tenha)'
                                onChange={handleInputProductsChange}
                                name='elasticColor'
                            />
                            <datalist id='elasticColorOptions'>
                                {dataColors.map((color) => {
                                    return color.categories.includes(
                                        'elastic'
                                    ) ? (
                                        <option>{color.colorName}</option>
                                    ) : null;
                                })}
                            </datalist>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='weight'>Peso do produto</label>
                            <input
                                id='weight'
                                name='weight'
                                type='number'
                                onChange={handleInputProductsSizeChange}
                                placeholder='Peso'
                            />

                            <label htmlFor='width'>Largura do produto</label>
                            <input
                                id='width'
                                name='width'
                                type='number'
                                onChange={handleInputProductsSizeChange}
                                placeholder='Largura'
                            />

                            <label htmlFor='length'>
                                Comprimento do produto
                            </label>
                            <input
                                id='length'
                                name='length'
                                type='number'
                                onChange={handleInputProductsSizeChange}
                                placeholder='Comprimento'
                            />

                            <label htmlFor='height'>Altura do produto</label>
                            <input
                                id='height'
                                name='height'
                                type='number'
                                onChange={handleInputProductsSizeChange}
                                placeholder='Altura'
                            />
                        </fieldset>

                        <label htmlFor='value'>Preço do produto</label>
                        <input
                            id='value'
                            name='value'
                            type='number'
                            onChange={handleInputProductsChange}
                            placeholder='Preço'
                        />

                        <label htmlFor='stock'>Quantidade em estoque</label>
                        <input
                            id='stock'
                            name='stock'
                            type='number'
                            onChange={handleInputProductsChange}
                            placeholder='Quantidade no estoque'
                        />

                        <button type='button' onClick={registerProduct}>
                            Cadastrar produto
                        </button>
                    </form>
                ) : (
                    <h1>Olá</h1>
                )}
            </section>

            <Footer />
        </main>
    );
}
