import { React } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
    const [quantity, setQuantity] = useState(0);

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
            }
        });
    }, [data]);

    function decreaseQuantity() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function increaseQuantity() {
        if (Number(dataProduct.stock) > quantity) {
            setQuantity(quantity + 1);
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
                                                        {(index ? ' + ' : '') +
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

                            <div className="btnWrapper" onClick={decreaseQuantity}>
                                <h3>-</h3>
                            </div>

                            <h2>{quantity}</h2>

                            <div className="btnWrapper" onClick={increaseQuantity}>
                                <h3>+</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </body>

            <Footer />
        </main>
    );
}
