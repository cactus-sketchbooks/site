import React, { useEffect, useState } from 'react';

import Header from '../../../components/header';
import Footer from '../../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function RegisterProduct() {
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [dataColors, setDataColors] = useState([]);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedItemToDelete, setSelectedItemToDelete] = useState({});
    const [dataKeysAdm, setDataKeysAdm] = useState([]);

    const [changeSketchbookData, setChangeSketchbookData] = useState({
        id: '',
        productType: '',
        productName: '',
        description: '',
        model: '',
        paperWidth: '',
        paper: '',
        coverColors: ['', ''],
        lineColor: '',
        elasticColor: '',
        spiralColor: '',
        sketchFinish: '',
        size: {},
        value: 0,
        stock: '',
        productImage: '',
    });

    const [changeOtherProductData, setChangeOtherProductData] = useState({
        id: '',
        productType: '',
        productName: '',
        description: '',
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

    const [otherProductSize, setOtherProductSize] = useState({
        weight: 0,
        width: 0,
        length: 0,
        height: 0,
    });

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseConfig);
        }

        let firebaseRef = firebase.database().ref('products/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let temp = Object.keys(data).map((key) => data[key]);
                setData(temp);
            } else {
                console.log('No data available');
            }
        });
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

    useEffect(() => {
        if (data) {
            var keys = [];
            data.map((item) => keys.push(item.id));
            setDataKeysAdm(keys);
        }
    }, [data]);

    function handleSelectedSketchbook(event) {
        setSelectedModel(event.target.value);
    }

    function handleSelectedPaperWidth(event) {
        setSelectedPaperWidth(event.target.value);
    }

    function handleSelectedSpiralColor(event) {
        setSelectedSpiralColor(event.target.value);
    }

    function handleSelectedSketchFinish(event) {
        setSelectedSketchFinish(event.target.value);
    }

    function handleInputProductsChange(event) {
        const { name, value } = event.target;

        setChangeSketchbookData({
            ...changeSketchbookData,
            [name]: value,
        });
    }

    function handleInputOtherProductsChange(event) {
        const { name, value } = event.target;

        setChangeOtherProductData({
            ...changeOtherProductData,
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

    function handleInputOtherProductsSizeChange(event) {
        const { name, value } = event.target;

        setOtherProductSize({
            ...otherProductSize,
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

    function updateProduct() {
        const newProductData = {
            id: data[selectedItem].id,
            productType: data[selectedItem].productType,
            productName:
                changeSketchbookData.productName !== ''
                    ? changeSketchbookData.productName
                    : data[selectedItem].productName,
            description:
                changeSketchbookData.description !== ''
                    ? changeSketchbookData.description
                    : data[selectedItem].description,
            model:
                selectedModel !== '' ? selectedModel : data[selectedItem].model,
            paperWidth:
                selectedPaperWidth !== ''
                    ? selectedPaperWidth
                    : data[selectedItem].paperWidth,
            paper:
                changeSketchbookData.paper !== ''
                    ? changeSketchbookData.paper
                    : data[selectedItem].paper,
            coverColors: [
                changeSketchbookData.principalCoverColor
                    ? changeSketchbookData.principalCoverColor
                    : data[selectedItem].coverColors[0],
                changeSketchbookData.secondaryCoverColor
                    ? changeSketchbookData.secondaryCoverColor
                    : data[selectedItem].coverColors[1],
            ],
            lineColor:
                changeSketchbookData.lineColor !== ''
                    ? changeSketchbookData.lineColor
                    : data[selectedItem].lineColor,
            elasticColor:
                changeSketchbookData.elasticColor !== ''
                    ? changeSketchbookData.elasticColor
                    : data[selectedItem].elasticColor,
            spiralColor:
                selectedSpiralColor !== ''
                    ? selectedSpiralColor
                    : data[selectedItem].spiralColor,
            sketchFinish:
                selectedSketchFinish !== ''
                    ? selectedSketchFinish
                    : data[selectedItem].sketchFinish,
            size: {
                height:
                    productSize.height !== 0
                        ? productSize.height
                        : data[selectedItem].size.height,
                length:
                    productSize.length !== 0
                        ? productSize.length
                        : data[selectedItem].size.length,
                weight:
                    productSize.weight !== 0
                        ? productSize.weight
                        : data[selectedItem].size.weight,
                width:
                    productSize.width !== 0
                        ? productSize.width
                        : data[selectedItem].size.width,
            },
            value:
                changeSketchbookData.value !== ''
                    ? changeSketchbookData.value
                    : data[selectedItem].value,
            stock:
                changeSketchbookData.stock !== ''
                    ? changeSketchbookData.stock
                    : data[selectedItem].stock,
            productImage: imageUrl ? imageUrl : data[selectedItem].productImage,
        };

        firebase
            .database()
            .ref('products/' + dataKeysAdm[selectedItem])
            .update(newProductData)
            .then(() => alert('Item atualizado com sucesso!'));

            setTimeout(() => {window.location.reload()}, 200)
    }

    function updateOtherProducts() {
        const newProductData = {
            id: data[selectedItem].id,
            productType: data[selectedItem].productType,
            productName:
            changeOtherProductData.productName !== ''
                    ? changeOtherProductData.productName
                    : data[selectedItem].productName,
            description:
            changeOtherProductData.description !== ''
                    ? changeOtherProductData.description
                    : data[selectedItem].description,
            size: {
                height:
                otherProductSize.height !== 0
                        ? otherProductSize.height
                        : data[selectedItem].size.height,
                length:
                otherProductSize.length !== 0
                        ? otherProductSize.length
                        : data[selectedItem].size.length,
                weight:
                    otherProductSize.weight !== 0
                        ? otherProductSize.weight
                        : data[selectedItem].size.weight,
                width:
                    otherProductSize.width !== 0
                        ? otherProductSize.width
                        : data[selectedItem].size.width,
            },
            value:
            changeOtherProductData.value !== ''
                    ? changeOtherProductData.value
                    : data[selectedItem].value,
            stock:
            changeOtherProductData.stock !== ''
                    ? changeOtherProductData.stock
                    : data[selectedItem].stock,
            productImage: imageUrl ? imageUrl : data[selectedItem].productImage,
        };

        firebase
            .database()
            .ref('products/' + dataKeysAdm[selectedItem])
            .update(newProductData)
            .then(() => alert('Item atualizado com sucesso!'));

        setTimeout(() => {window.location.reload()}, 200)

    }

    function handleSelectedItem(event) {
        setSelectedItem(event.target.value);

        let productType = data[event.target.value].productType;
        setSelectedProductType(productType);

        if (productType === 'Sketchbook') {
            setChangeSketchbookData(data[event.target.value]);
        } else if (productType === 'Outros') {
            setChangeOtherProductData(data[event.target.value]);
        }

    }

    function handleSelectedItemToDelete(event) {
        setSelectedItemToDelete(event.target.value);
    }

    function deleteItem() {

        firebase.database()
            .ref('products/' + dataKeysAdm[selectedItemToDelete])
            .remove()
            .then(() => alert("Item removido com sucesso!"))

        setTimeout(() => {window.location.reload()}, 200)

    }

    if (selectedProductType === 'Sketchbook') {
        return (
            <main id='changeProduct'>
                <Header />

                <section id='optionSection'>
                    <div className='selectProduct'>
                        <h1>Editar um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={(e) => handleSelectedItem(e)}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </section>

                <section id='formSection'>
                    <form id='formSketchbook'>
                        <label htmlFor='imageUrl'>Imagem do produto</label>
                        <input
                            type='file'
                            id='imageUrl'
                            accept='image/png, image/jpeg'
                            onChange={uploadImage}
                        />

                        <label htmlFor='productName'>
                            Nome do produto - Atual:{' '}
                            {changeSketchbookData.productName}
                        </label>
                        <input
                            type='text'
                            name='productName'
                            id='productName'
                            placeholder='Nome do produto'
                            onChange={handleInputProductsChange}
                        />

                        <label htmlFor='description'>
                            Descrição do produto - Atual:{' '}
                            {changeSketchbookData.description}
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            placeholder='Descrição do produto'
                            onChange={handleInputProductsChange}
                        />

                        <label htmlFor='selectModel'>
                            Modelo do sketchbook - Atual:{' '}
                            {changeSketchbookData.model}
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
                            Tamanho do papel - Atual:{' '}
                            {changeSketchbookData.paperWidth}
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
                                Papel do miolo - Atual:{' '}
                                {changeSketchbookData.paper}
                            </label>
                            <input
                                type='text'
                                list='paperOption'
                                id='paperOptionId'
                                placeholder='Papel do miolo'
                                name='paper'
                                onChange={handleInputProductsChange}
                            />
                            <datalist id='paperOption'>
                                <option value='Papel Reciclado Liso 120g'>
                                    Papel Reciclado Liso 120g
                                </option>
                                <option value='Papel Reciclado Pontilhado 120g'>
                                    Papel Reciclado Pontilhado 120g
                                </option>
                                <option value='Papel Reciclado Quadriculado 120g'>
                                    Papel Reciclado Quadriculado 120g
                                </option>
                                <option value='Papel Reciclado Pautado 120g'>
                                    Papel Reciclado Pautado 120g
                                </option>
                                <option value='Papel Marfim Liso 120g'>
                                    Papel Marfim Liso 120g
                                </option>
                                <option value='Papel Marfim Pontilhado 120g'>
                                    Papel Marfim Pontilhado 120g
                                </option>
                                <option value='Papel Marfim Quadriculado 120g'>
                                    Papel Marfim Quadriculado 120g
                                </option>
                                <option value='Papel Marfim Pautado 120g'>
                                    Papel Marfim Pautado 120g
                                </option>
                                <option value='Papel Kraft 140g'>Papel Kraft 140g</option>
                                <option value='Papel Canson 140g'>
                                    Papel Canson 140g
                                </option>
                                <option value='Papel Canson 200g'>
                                    Papel Canson 200g
                                </option>
                                <option value='Papel Preto'>Papel Preto</option>
                                <option value='Papel Canson Aquarela 300g '>
                                    Papel Canson Aquarela 300g 
                                </option>
                                <option value='Papel Montval 300g'>
                                    Papel Montval 300g
                                </option>
                            </datalist>
                        </fieldset>

                        <fieldset>
                            <label htmlFor='sketchFinish'>
                                Tipo da borda - Atual:{' '}
                                {changeSketchbookData.sketchFinish}
                            </label>

                            <select
                                onChange={handleSelectedSketchFinish}
                                id='sketchFinish'
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
                                Cor de capa principal - Atual:{' '}
                                {changeSketchbookData.coverColors[0]}
                            </label>
                            <input
                                type='text'
                                list='principalCoverColorOption'
                                id='principalCoverColorOptionId'
                                placeholder='Cor principal'
                                name='principalCoverColor'
                                onChange={handleInputProductsChange}
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
                                Cor de capa secundária (caso tenha){' '}
                                {changeSketchbookData.coverColors[1]
                                    ? '- Atual: ' +
                                      changeSketchbookData.coverColors[1]
                                    : null}
                            </label>
                            <input
                                type='text'
                                list='secondaryCoverColorOption'
                                id='secondaryCoverColorOptionId'
                                placeholder='Cor secundária'
                                name='secondaryCoverColor'
                                onChange={handleInputProductsChange}
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
                                Cor da linha (caso tenha){' '}
                                {changeSketchbookData.lineColor
                                    ? '- Atual: ' +
                                      changeSketchbookData.lineColor
                                    : null}
                            </label>
                            <input
                                type='text'
                                list='lineColorOptions'
                                id='lineColorOptionsId'
                                placeholder='Cor da linha'
                                name='lineColor'
                                onChange={handleInputProductsChange}
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
                                Cor da espiral (caso tenha){' '}
                                {changeSketchbookData.spiralColor
                                    ? '- Atual: ' +
                                      changeSketchbookData.spiralColor
                                    : null}
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
                                Cor do elástico (caso tenha){' '}
                                {changeSketchbookData.elasticColor
                                    ? '- Atual: ' +
                                      changeSketchbookData.elasticColor
                                    : null}
                            </label>
                            <input
                                type='text'
                                list='elasticColorOptions'
                                id='elasticColorOptionsId'
                                placeholder='Cor do elástico (caso tenha)'
                                name='elasticColor'
                                onChange={handleInputProductsChange}
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
                            <label htmlFor='weight'>
                                Peso do produto (em kg) - Atual:{' '}
                                {changeSketchbookData.size.weight}
                            </label>
                            <input
                                id='weight'
                                name='weight'
                                type='number'
                                placeholder='Peso'
                                onChange={handleInputProductsSizeChange}
                            />

                            <div className='observations'>
                                <h3>Observações - Melhor Envio</h3>
                                <span>
                                    Caso o tamanho do produto informado seja
                                    decimal, o mesmo deve ser aproximado para um
                                    número inteiro (exemplo: 18,7 cm = 19 cm).
                                </span>

                                <span>
                                    Caso o produto seja enviado em uma
                                    embalagem, coloque as especificações de
                                    tamanho da embalagem.
                                </span>

                                <span>
                                    Para produtos maleáveis, insira as dimensões
                                    de acordo com o seu formato ao enviar
                                    (exemplo: ecobag dobrada).
                                </span>
                            </div>

                            <label htmlFor='width'>
                                Largura do produto (em cm) - Atual:{' '}
                                {changeSketchbookData.size.width}
                            </label>
                            <input
                                id='width'
                                name='width'
                                type='number'
                                placeholder='Largura'
                                onChange={handleInputProductsSizeChange}
                            />

                            <label htmlFor='length'>
                                Comprimento do produto (em cm) - Atual:{' '}
                                {changeSketchbookData.size.length}
                            </label>
                            <input
                                id='length'
                                name='length'
                                type='number'
                                placeholder='Comprimento'
                                onChange={handleInputProductsSizeChange}
                            />

                            <label htmlFor='height'>
                                Altura do produto (em cm) - Atual:{' '}
                                {changeSketchbookData.size.height}
                            </label>
                            <input
                                id='height'
                                name='height'
                                type='number'
                                placeholder='Altura'
                                onChange={handleInputProductsSizeChange}
                            />
                        </fieldset>

                        <label htmlFor='value'>
                            Preço do produto - Atual:{' '}
                            {changeSketchbookData.value}
                        </label>
                        <input
                            id='value'
                            name='value'
                            type='number'
                            placeholder='Preço'
                            onChange={handleInputProductsChange}
                        />

                        <label htmlFor='stock'>
                            Quantidade em estoque - Atual:{' '}
                            {changeSketchbookData.stock}
                        </label>
                        <input
                            id='stock'
                            name='stock'
                            type='number'
                            placeholder='Quantidade no estoque'
                            onChange={handleInputProductsChange}
                        />

                        <button type='button' onClick={updateProduct}>
                            Alterar produto
                        </button>
                    </form>
                </section>

                <section id='deleteSection'>
                    <div className='selectProduct'>
                        <h1>Excluir um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={handleSelectedItemToDelete}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                   <button type='button' onClick={() => { deleteItem() }}>Apagar</button>
                </section>
                <Footer />
            </main>
        );
    } else if (selectedProductType === 'Outros') {
        return (
            <main id='changeProduct'>
                <Header />

                <section id='optionSection'>
                    <div className='selectProduct'>
                        <h1>Editar um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={(e) => handleSelectedItem(e)}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </section>

                <section id='formSection'>
                    <form id='formOtherProducts'>
                        <label htmlFor='imageUrl'>Imagem do produto</label>
                        <input
                            type='file'
                            id='imageUrl'
                            accept='image/png, image/jpeg'
                            onChange={uploadImage}
                        />

                        <label htmlFor='productName'>Nome do produto - Atual: {changeOtherProductData.productName}</label>
                        <input
                            type='text'
                            name='productName'
                            id='productName'
                            placeholder='Nome do produto'
                            onChange={handleInputOtherProductsChange}
                        />

                        <label htmlFor='description'>
                            Descrição do produto
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            placeholder='Descrição do produto'
                            onChange={handleInputOtherProductsChange}
                        />

                        <fieldset>
                            <label htmlFor='weight'>
                                Peso do produto (em kg)
                            </label>
                            <input
                                id='weight'
                                name='weight'
                                type='number'
                                onChange={handleInputOtherProductsSizeChange}
                                placeholder='Peso'
                            />

                            <div className='observations'>
                                <h3>Observações - Melhor Envio</h3>
                                <span>
                                    Caso o tamanho do produto informado seja
                                    decimal, o mesmo deve ser aproximado para um
                                    número inteiro (exemplo: 18,7 cm = 19 cm).
                                </span>

                                <span>
                                    Caso o produto seja enviado em uma
                                    embalagem, coloque as especificações de
                                    tamanho da embalagem.
                                </span>

                                <span>
                                    Para produtos maleáveis, insira as dimensões
                                    de acordo com o seu formato ao enviar
                                    (exemplo: ecobag dobrada).
                                </span>
                            </div>

                            <label htmlFor='width'>
                                Largura do produto (em cm)
                            </label>
                            <input
                                id='width'
                                name='width'
                                type='number'
                                onChange={handleInputOtherProductsSizeChange}
                                placeholder='Largura'
                            />

                            <label htmlFor='length'>
                                Comprimento do produto (em cm)
                            </label>
                            <input
                                id='length'
                                name='length'
                                type='number'
                                onChange={handleInputOtherProductsSizeChange}
                                placeholder='Comprimento'
                            />

                            <label htmlFor='height'>
                                Altura do produto (em cm)
                            </label>
                            <input
                                id='height'
                                name='height'
                                type='number'
                                onChange={handleInputOtherProductsSizeChange}
                                placeholder='Altura'
                            />
                        </fieldset>

                        <label htmlFor='value'>Preço do produto</label>
                        <input
                            id='value'
                            name='value'
                            type='number'
                            onChange={handleInputOtherProductsChange}
                            placeholder='Preço'
                        />

                        <label htmlFor='stock'>Quantidade em estoque</label>
                        <input
                            id='stock'
                            name='stock'
                            type='number'
                            onChange={handleInputOtherProductsChange}
                            placeholder='Quantidade no estoque'
                        />

                        <button type='button' onClick={updateOtherProducts}>
                            Alterar produto
                        </button>
                    </form>
                </section>

                <section id='deleteSection'>
                    <div className='selectProduct'>
                        <h1>Excluir um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={handleSelectedItemToDelete}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                   <button type='button' onClick={() => { deleteItem() }}>Apagar</button>
                </section>
                <Footer />
            </main>
        );
    } else {
        return (
            <main id='changeProduct'>
                <Header />

                <section id='optionSection'>
                    <div className='selectProduct'>
                        <h1>Editar um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={(e) => handleSelectedItem(e)}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </section>

                <section id='deleteSection'>
                    <div className='selectProduct'>
                        <h1>Excluir um produto</h1>

                        <label htmlFor='selectProduct'>
                            Selecione o produto
                        </label>
                        <select
                            name='selectProduct'
                            id='selectProduct'
                            onChange={handleSelectedItemToDelete}
                        >
                            <option value='' selected='selected' disabled>Selecione o produto</option>
                            {data.map((product, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {product.productName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                   <button type='button' onClick={() => { deleteItem() }}>Apagar</button>
                </section>
                <Footer />
            </main>
        );
    }
}
