import { React } from 'react';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../../FirebaseConfig.js';

export default function Products() {
    const [data, setData] = useState([]);
    const [dataBackup, setDataBackup] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [displaySearchResult, setDisplaySearchResult] = useState('none');
    const [buttonType, setButtonType] = useState('search');

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
                setDataBackup(temp);
            } else {
                console.log('No data available');
            }
        });
    }, []);

    function searchItem() {
        let items = [];

        data.map((item) => {
            let title = item.productName.toLowerCase();
            let search = searchInput.toLowerCase();

            if (title.includes(search)) {
                items.push(item);
            }
        });

        setData(items);
        setDisplaySearchResult('flex');
    }

    function handleSearchInput() {

        if (searchInput !== '') {
            clearSearchItem();
            searchItem();
            setButtonType('clear');
        }
        
        else {
            setData(dataBackup);
        }
    }

    function handleSearch(event) {
        setSearchInput(event.target.value);

        if(event.target.value === '') {
            setButtonType('search');
        }
    }

    function clearSearchItem() {
        setDisplaySearchResult('none');
        setData(dataBackup);
        setSelectedProduct('');
        setButtonType('search');
    }

    return (
        <main id='registerProduct'>
            <Header />

            <body>

                <section id='searchSection'>

                    <h1>Nossos Produtos</h1>

                    <span>Atenção! Essa é uma seção de produtos pronta-entrega, se você deseja um Cactus personalizado do seu jeito basta acessar a <Link to="/">página inicial</Link> e montar um Cactus que mais combina com você!</span>

                    <h3>Pesquisar produto</h3>

                    <div className='search'>
                        <input
                            type='text'
                            placeholder='Procurar'
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="buttonSearch">

                        {buttonType === 'search' ? (
                            <button type="button" onClick={handleSearchInput}>Buscar</button>
                        ) : (
                            <button type="button" onClick={() => { clearSearchItem() }}>Limpar</button>
                        )}

                    </div>

                </section>

                <section id='productsSection'>
                        {data.map((product) => {
                            return (
                                <Link
                                    className='productWrapper'
                                    key={product.id}
                                    to={`/produto/${product.id}`}
                                >
                                    <div className='productImgWrapper'>
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className='productInfos'>
                                        <h2>{product.productName}</h2>
                                        <span>{product.description}</span>
                                        <h2>R$ {product.value}</h2>
                                    </div>
                                </Link>
                            );
                        })}
                </section>
            </body>

            <Footer />
        </main>
    );
}
