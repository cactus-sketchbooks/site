import { React } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../../FirebaseConfig.js';

export default function Products() {
    const [data, setData] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [path, setPath] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [finalValue, setFinalValue] = useState(0);
    const [visibilityPlusButton, setvisibilityPlusButton] = useState('visible');
    const [visibilityMinusButton, setvisibilityMinusButton] =
        useState('visible');
    const [visibilityFinishBuy, setvisibilityFinishBuy] = useState('visible');

    const idProduct = useParams().idProduct;

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
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
        setPath(idProduct);
    }, [idProduct]);

    useEffect(() => {
        data.map((product) => {
            if (product.id === path) {
                setDataProduct(product);
                console.log(product);
                setFinalValue(Number(product.value));
            }
        });
    }, [data]);

    useEffect(() => {
        setFinalValue(Number(dataProduct.value) * quantity);

        if (quantity === dataProduct.stock) {
            setvisibilityPlusButton('hidden');
            setvisibilityMinusButton('visible');
            setvisibilityFinishBuy('visible');
        } else if (quantity > 0 && quantity <= dataProduct.stock) {
            setvisibilityPlusButton('visible');
            setvisibilityMinusButton('visible');
            setvisibilityFinishBuy('visible');
        } else if (quantity === 0) {
            setvisibilityPlusButton('visible');
            setvisibilityMinusButton('hidden');
            setvisibilityFinishBuy('hidden');
        }
    }, [quantity]);

    function decreaseQuantity() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setvisibilityMinusButton('visible');
        } else {
            setvisibilityMinusButton('hidden');
        }
    }

    function increaseQuantity() {
        if (Number(dataProduct.stock) > quantity) {
            setQuantity(quantity + 1);
            setvisibilityPlusButton('visible');
        } else {
            setvisibilityPlusButton('hidden');
            setTimeout(() => {
                alert('Limite de produtos atingido');
            }, 100);
        }
    }

    let history = useHistory();

    function addToCart() {
        const temp = JSON.parse(localStorage.getItem('products'));
        var listOfItems =
            temp !== null ? Object.keys(temp).map((key) => temp[key]) : [];

        const newItems = [];

        if (dataProduct.productType === 'Sketchbook') {
            const dataToSend = {
                id: dataProduct.id,
                productType: dataProduct.productType,
                productName: dataProduct.productName,
                description: dataProduct.description,
                model: dataProduct.model,
                paperWidth: dataProduct.paperWidth,
                paper: dataProduct.paper,
                coverColors: dataProduct.coverColors,
                lineColor: dataProduct.lineColor ? dataProduct.lineColor : '',
                elasticColor: dataProduct.elasticColor
                    ? dataProduct.elasticColor
                    : '',
                spiralColor: dataProduct.spiralColor
                    ? dataProduct.spiralColor
                    : '',
                sketchFinish: dataProduct.sketchFinish,
                size: {
                        height: Number(dataProduct.size.height),
                        length: Number(dataProduct.size.length),
                        weight: Number(dataProduct.size.weight),
                        width: Number(dataProduct.size.width)
                    },
                value: finalValue,
                quantity: quantity,
                productImage: dataProduct.productImage,
            };

            newItems.push(dataToSend);

            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
            // } else {
            //     newItems.map((item) => listOfItems.push(item));
            //     localStorage.setItem('products', JSON.stringify(listOfItems));
            // }

            history.push('/Carrinho');
        }
    }

    return (
        <main id='product'>
            <Header />

            <body>
                <section id='selectedProductSection'>
                    <div className='productImageWrapper'>
                        <img
                            src={dataProduct.productImage}
                            alt='Imagem do produto'
                        />
                    </div>

                    <div className='productInfosWrapper'>
                        <h1>{dataProduct.productName}</h1>
                        <span>{dataProduct.description}</span>

                        <div className='productSpecifications'>
                            <h2>Especificações</h2>

                            <ul>
                                <li>
                                    <b>Modelo: </b>
                                    <span>{dataProduct.model}</span>
                                </li>

                                <li>
                                    <b>Tamanho do papel: </b>
                                    <span>{dataProduct.paperWidth}</span>
                                </li>

                                <li>
                                    <b>Papel do miolo: </b>
                                    <span>{dataProduct.paper}</span>
                                </li>

                                {dataProduct.coverColors ? (
                                    <li>
                                        <b>Cor da capa: </b>
                                        {dataProduct.coverColors.map(
                                            (coverColor, index) => {
                                                return (
                                                    <span key={index}>
                                                        {(index && coverColor !== '' ? ' + ' : '') +
                                                            coverColor}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </li>
                                ) : (
                                    ''
                                )}

                                {dataProduct.lineColor &&
                                dataProduct.lineColor !== '' ? (
                                    <li>
                                        <b>Cor da linha: </b>
                                        <span>{dataProduct.lineColor}</span>
                                    </li>
                                ) : (
                                    ''
                                )}

                                {dataProduct.elasticColor &&
                                dataProduct.elasticColor !== '' ? (
                                    <li>
                                        <b>Cor do elástico: </b>
                                        <span>{dataProduct.elasticColor}</span>
                                    </li>
                                ) : (
                                    ''
                                )}

                                {dataProduct.spiralColor &&
                                dataProduct.spiralColor !== '' ? (
                                    <li>
                                        <b>Cor da espiral: </b>
                                        <span>{dataProduct.spiralColor}</span>
                                    </li>
                                ) : (
                                    ''
                                )}
                            </ul>
                        </div>

                        <div className='productButtons'>
                            <div
                                style={{ visibility: visibilityMinusButton }}
                                className='btnWrapper'
                                onClick={decreaseQuantity}
                            >
                                <h3>-</h3>
                            </div>

                            <h2>{quantity}</h2>

                            <div
                                style={{ visibility: visibilityPlusButton }}
                                className='btnWrapper'
                                onClick={increaseQuantity}
                            >
                                <h3>+</h3>
                            </div>
                        </div>

                        <div
                            style={{ visibility: visibilityFinishBuy }}
                            className='finishBuy'
                        >
                            <h3>Valor: R$ {finalValue.toFixed(2)}</h3>
                            <button type='button' onClick={() => addToCart()}>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                </section>
            </body>

            <Footer />
        </main>
    );
}
