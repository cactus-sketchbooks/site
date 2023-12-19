import React, { useEffect, useState } from 'react';

import InputMask from 'react-input-mask';

import Header from '../../../components/header';
import Footer from '../../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function CreateColor() {
    const [colorData, setColorData] = useState({
        colorName: '',
        colorCode: '',
        image: '',
        models: [],
        categories: [],
    });
    const [newIlustresData, setNewIlustresData] = useState({
        aditionalPrice: 0,
        preSelectedLineColor: '',
        preSelectedElasticColor: '',
        preSelectedSpiralColor: '',
    });

    const [colors, setColors] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [isIlustres, setIsIlustres] = useState(false);
    const [displayIlustresData, setDisplayIlustresData] = useState('none');
    const [dataKeys, setDataKeys] = useState([]);
    const [selectItemToDelete, setSelectItemToDelete] = useState('');

    function insertNewColor() {
        const id = firebase.database().ref().child('colors').push().key;

        const data = {
            id: id,
            colorName: colorData.colorName,
            colorCode: colorData.colorCode,
            models: selectedModels,
            categories: selectedCategories,
            isIlustres: isIlustres,
            aditionalPrice: Number(newIlustresData.aditionalPrice),
            availableSizes: selectedSizes,
            preSelectedLineColor: newIlustresData.preSelectedLineColor,
            preSelectedElasticColor: newIlustresData.preSelectedElasticColor,
            preSelectedSpiralColor: newIlustresData.preSelectedSpiralColor,
            image: imageUrl,
        };

        firebase
            .database()
            .ref('colors/' + id)
            .set(data)
            .then((err) => console.log(err));

        setColorData({
            colorName: '',
            colorCode: '',
            image: '',
            models: [],
            categories: [],
            aditionalPrice: 0,
        });
        setNewIlustresData({
            aditionalPrice: 0,
            availableSizes: [],
            preSelectedLineColor: '',
            preSelectedElasticColor: '',
            preSelectedSpiralColor: '',
        });
        setSelectedSizes([]);
        setSelectedCategories([]);
        setSelectedModels([]);
        setImageUrl('');
        setIsIlustres(false);

        alert('Cor inserida com sucesso!');
        window.location.reload();
    }

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setColors(
                    temp.sort((a, b) => {
                        return a.title > b.title
                            ? 1
                            : b.title > a.title
                            ? -1
                            : 0;
                    })
                );
            } else {
                console.log('No data available');
            }
        });
    }, []);

    function handleColorRegisterChange(event) {
        const { name, value } = event.target;

        setColorData({
            ...colorData,
            [name]: value,
        });
    }

    const checkModel = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedModels([...selectedModels, event.target.value]);
        } else {
            let index = selectedModels.findIndex(
                (element) => element === event.target.value
            );

            if (index !== -1) {
                selectedModels.splice(index, 1);
            }
        }
    };

    const checkCategory = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedCategories([...selectedCategories, event.target.value]);
        } else {
            let index = selectedCategories.findIndex(
                (element) => element === event.target.value
            );

            if (index !== -1) {
                selectedCategories.splice(index, 1);
            }
        }
    };

    function uploadImage(event) {
        const file = event.target.files[0];

        var storageRef = firebase.storage().ref();

        storageRef
            .child('images/' + file.name.trim())
            .put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => setImageUrl(url));
            });
    }

    const checkSizes = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedSizes([...selectedSizes, event.target.value]);
        } else {
            let index = selectedSizes.findIndex(
                (element) => element === event.target.value
            );

            if (index !== -1) {
                selectedSizes.splice(index, 1);
            }
        }
    };

    function handleIlustresCoverChange(event) {
        if (event.target.value === 'sim') {
            setDisplayIlustresData('flex');
            setIsIlustres(true);
        }
        if (event.target.value === 'nao') {
            setDisplayIlustresData('none');
            setIsIlustres(false);

            //zera as infos da Capa ilustres
            setNewIlustresData({
                aditionalPrice: 0,
                preSelectedLineColor: '',
                preSelectedElasticColor: '',
                preSelectedSpiralColor: '',
            });

            //zera o input de preço
            document.querySelector('#ilustresPrice').value = '0';

            // desmarca todas as checkboxes de tamanho
            document
                .querySelectorAll('.availableSizes')
                .forEach(function (check) {
                    check.checked = false;
                });

            setSelectedSizes([]);
        }
    }

    function handleNewIlustresChange(event) {
        const { name, value } = event.target;
        setNewIlustresData({
            ...newIlustresData,
            [name]: value,
        });
    }

    function handleSelectItemToIncludeToIlustres(event) {
        const { name, value } = event.target;
        setNewIlustresData({
            ...newIlustresData,
            [name]: colors[value],
        });
    }

    function handleSelectItemToDelete(event) {
        setSelectItemToDelete(event.target.value);
    }

    function deleteItem() {
        firebase
            .database()
            .ref('colors/' + dataKeys[selectItemToDelete])
            .remove()
            .then(() => alert('Item removido com sucesso!'));
    }

    useEffect(() => {
        if (colors) {
            var keys = [];
            colors.map((item) => keys.push(item.id));
            setDataKeys(keys);
        }
    }, [colors]);

    return (
        <main>
            <Header />

            <section id='ColorSection'>
                <h1>Cadastro de cores</h1>

                <input
                    type='text'
                    id='colorName'
                    name='colorName'
                    onChange={handleColorRegisterChange}
                    placeholder='Nome da cor'
                />

                <div className='formatType'>
                    <InputMask
                        type='text'
                        id='colorCode'
                        name='colorCode'
                        mask='#******'
                        maskChar=''
                        onChange={handleColorRegisterChange}
                        placeholder='Código da cor'
                    />

                    <h2>Ou</h2>

                    <input
                        type='file'
                        onChange={uploadImage}
                        accept='image/png, image/jpeg'
                    />
                </div>

                <div className='checkboxSelector'>
                    <h3>Selecione a(s) categoria(s) da cor</h3>

                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedCategory'
                                id='cover'
                                value='cover'
                                onChange={(event) => checkCategory(event)}
                            />
                            <label for='cover'>Cor de capa</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedCategory'
                                id='line'
                                value='line'
                                onChange={(event) => checkCategory(event)}
                            />
                            <label for='line'>Cor de linha</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedCategory'
                                id='elastic'
                                value='elastic'
                                onChange={(event) => checkCategory(event)}
                            />
                            <label for='elastic'>Cor de elástico</label>
                        </div>
                    </div>
                </div>

                <div className='checkboxSelector'>
                    <h3>Selecione os modelos que terão essa cor disponível</h3>

                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='baiao'
                                value='baiao'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='baiao'>Baião</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='buriti'
                                value='buriti'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='buriti'>Buriti</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='carcara'
                                value='carcara'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='carcara'>Carcará</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='facheiro'
                                value='facheiro'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='facheiro'>Facheiro</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='mandacaru'
                                value='mandacaru'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='mandacaru'>Mandacaru</label>
                        </div>

                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedModel'
                                id='sertao'
                                value='sertao'
                                onChange={(event) => checkModel(event)}
                            />
                            <label for='sertao'>Sertão</label>
                        </div>
                    </div>
                </div>

                <div className='checkboxSelector'>
                    <h3>Capa ILUSTRES?</h3>
                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='radio'
                                name='selectedCoverAdd'
                                id='sim'
                                value='sim'
                                onChange={(event) =>
                                    handleIlustresCoverChange(event)
                                }
                            />
                            <label htmlFor='sim'>Sim</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='radio'
                                name='selectedCoverAdd'
                                id='nao'
                                value='nao'
                                onChange={(event) =>
                                    handleIlustresCoverChange(event)
                                }
                            />
                            <label htmlFor='nao'>Nao</label>
                        </div>
                    </div>
                </div>
                <div
                    id='ilustresData'
                    className='checkboxSelector'
                    style={{ display: displayIlustresData }}
                >
                    <h3>Preço Adicional</h3>
                    <input
                        type='number'
                        id='ilustresPrice'
                        name='aditionalPrice'
                        placeholder='Preço adicional da capa'
                        min='0'
                        onChange={handleNewIlustresChange}
                    />

                    <h3>Cor da Linha</h3>
                    <select
                        onChange={handleSelectItemToIncludeToIlustres}
                        name='preSelectedLineColor'
                    >
                        <option selected disabled>
                            Selecione a cor
                        </option>

                        {colors.map((item, index) =>
                            item.categories.includes('line') ? (
                                <option value={index} key={index}>
                                    {item.colorName}
                                </option>
                            ) : null
                        )}
                    </select>

                    <h3>Cor do Elástico</h3>
                    <select
                        onChange={handleSelectItemToIncludeToIlustres}
                        name='preSelectedElasticColor'
                    >
                        <option selected disabled>
                            Cor do Elástico
                        </option>

                        {colors.map((item, index) =>
                            item.categories.includes('elastic') ? (
                                <option value={index} key={index}>
                                    {item.colorName}
                                </option>
                            ) : null
                        )}
                    </select>

                    <h3>Cor da Espiral</h3>
                    <select
                        onChange={handleNewIlustresChange}
                        name='preSelectedSpiralColor'
                        defaultValue=''
                    >
                        <option value=''>Cor do Elástico</option>
                        <option value='Preto'>Preto</option>
                        <option value='Branco'>Branco</option>
                    </select>

                    <h3>Tamanhos Disponíveis</h3>
                    <h3>Mandacaru, Facheiro e Carcará</h3>
                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A3 - Paisagem (29x42 cm)'
                                value='A3 - Paisagem (29x42 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A3 - Paisagem (29x42 cm)'>
                                A3 - Paisagem (29x42 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A3 - Retrato (42x29 cm)'
                                value='A3 - Retrato (42x29 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A3 - Retrato (42x29 cm)'>
                                A3 - Retrato (42x29 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A4 - Paisagem (21x29 cm)'
                                value='A4 - Paisagem (21x29 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A4 - Paisagem (21x29 cm)'>
                                A4 - Paisagem (21x29 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A4 - Retrato (29x21 cm)'
                                value='A4 - Retrato (29x21 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A4 - Retrato (29x21 cm)'>
                                A4 - Retrato (29x21 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A5 - Retrato (21x15 cm)'
                                value='A5 - Retrato (21x15 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A5 - Retrato (21x15 cm)'>
                                A5 - Retrato (21x15 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A5 - Paisagem (15x21 cm)'
                                value='A5 - Paisagem (15x21 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A5 - Paisagem (15x21 cm)'>
                                A5 - Paisagem (15x21 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A6 - Retrato (15x10,5 cm)'
                                value='A6 - Retrato (15x10,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A6 - Retrato (15x10,5 cm)'>
                                A6 - Retrato (15x10,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A6 - Paisagem (10,5x15 cm)'
                                value='A6 - Paisagem (10,5x15 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A6 - Paisagem (10,5x15 cm)'>
                                A6 - Paisagem (10,5x15 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A7 - Paisagem (7,5x10,5 cm)'
                                value='A7 - Paisagem (7,5x10,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A7 - Paisagem (7,5x10,5 cm)'>
                                A7 - Paisagem (7,5x10,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A7 - Retrato (10,5x7,5 cm)'
                                value='A7 - Retrato (10,5x7,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A7 - Retrato (10,5x7,5 cm)'>
                                A7 - Retrato (10,5x7,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Colegial - Retrato (24x18 cm)'
                                value='Colegial - Retrato (24x18 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Colegial - Retrato (24x18 cm)'>
                                Colegial - Retrato (24x18 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Colegial - Paisagem (18x24 cm)'
                                value='Colegial - Paisagem (18x24 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Colegial - Paisagem (18x24 cm)'>
                                Colegial - Paisagem (18x24 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='21X21'
                                value='21X21'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='21X21'>21X21</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='15X15'
                                value='15X15'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='15X15'>15X15</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='10X10'
                                value='10X10'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='10X10'>10X10</label>
                        </div>
                    </div>
                    <h3>Buriti</h3>
                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle 8ª Geração (16x11,5 cm)'
                                value='Kindle 8ª Geração (16x11,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle 8ª Geração (16x11,5 cm)'>
                                Kindle 8ª Geração (16x11,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle 10ª Geração (16x11,5 cm)'
                                value='Kindle 10ª Geração (16x11,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle 10ª Geração (16x11,5 cm)'>
                                Kindle 10ª Geração (16x11,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle Paperwhite (17,5x12,5 cm)'
                                value='Kindle Paperwhite (17,5x12,5 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle Paperwhite (17,5x12,5 cm)'>
                                Kindle Paperwhite (17,5x12,5 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle 11ª Geração (16x11 cm)'
                                value='Kindle 11ª Geração (16x11 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle 11ª Geração (16x11 cm)'>
                                Kindle 11ª Geração (16x11 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle Oasis (16x14,1 cm)'
                                value='Kindle Oasis (16x14,1 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle Oasis (16x14,1 cm)'>
                                Kindle Oasis (16x14,1 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Kindle Scribe (19,6x22,9 cm)'
                                value='Kindle Scribe (19,6x22,9 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Kindle Scribe (19,6x22,9 cm)'>
                                Kindle Scribe (19,6x22,9 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='iPad/Tablet (Personalize o tamanho)'
                                value='iPad/Tablet (Personalize o tamanho)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='iPad/Tablet (Personalize o tamanho)'>
                                iPad/Tablet (Personalize o tamanho)
                            </label>
                        </div>
                    </div>
                    <h3>Sertão</h3>
                    <div className='checkboxWrapper'>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A4 - Retrato (20x28 cm)'
                                value='A4 - Retrato (20x28 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A4 - Retrato (20x28 cm)'>
                                A4 - Retrato (20x28 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A5 - Retrato (14x20 cm)'
                                value='A5 - Retrato (14x20 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A5 - Retrato (14x20 cm)'>
                                A5 - Retrato (14x20 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='A6 - Retrato (10x14 cm)'
                                value='A6 - Retrato (10x14 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='A6 - Retrato (10x14 cm)'>
                                A6 - Retrato (10x14 cm)
                            </label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='10X10'
                                value='10X10'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='10X10'>10X10</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='14X14'
                                value='14X14'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='14X14'>14X14</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='20X20'
                                value='20X20'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='20X20'>20X20</label>
                        </div>
                        <div className='checkbox'>
                            <input
                                type='checkbox'
                                name='selectedAvailableSize'
                                className='availableSizes'
                                id='Colegial (17x23 cm)'
                                value='Colegial (17x23 cm)'
                                onChange={(event) => checkSizes(event)}
                            />
                            <label htmlFor='Colegial (17x23 cm)'>
                                Colegial (17x23 cm)
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        insertNewColor();
                    }}
                >
                    Cadastrar cor
                </button>
            </section>

            <section id='deleteColorSection'>
                <fieldset>
                    <legend>
                        <h1>Excluir uma cor</h1>
                    </legend>

                    <select onChange={handleSelectItemToDelete}>
                        <option selected disabled>
                            Selecione a cor
                        </option>

                        {colors.map((item, index) => {
                            return (
                                <option value={index} key={index}>
                                    {item.colorName}
                                </option>
                            );
                        })}
                    </select>

                    <button
                        id='deleteButton'
                        onClick={() => {
                            deleteItem();
                        }}
                    >
                        Apagar
                    </button>
                </fieldset>
            </section>

            <Footer />
        </main>
    );
}
