import React from 'react';

import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import logo from '../../images/cactopng2.png';
import sapo from '../../images/sapofoto.png';
import garota from '../../images/garota.jpg';
import olhos from '../../images/olhos.jpg';

import mandacaru from '../../images/mandacaru.png'
import baiao from '../../images/baiao.png'
import facheiro from '../../images/facheiro.png'
import sertao from '../../images/sertao.png'
import kindle from '../../images/buriti-kindle.png'
import carcara from '../../images/carcara.jpg'

export default function Cart() {

    const products = [
        {
            id: 1,
            model: 'carcara',
            paperWidth: 'A4',
            paper: 'papel 1',
            cover: 'duas cores',
            cover_color: 'azul, verde'
        },
        {
            id: 2,
            model: 'mandacaru',
            paperWidth: 'A4',
            paper: 'papel 5',
            cover: 'kraft',
            cover_color: 'azul'
        },
        // {
        //     id: 3,
        //     model: 'buriti',
        //     paperWidth: 'A3',
        //     size: 'A4',
        //     type: 'kindle 3a geracao'
        // }
    ]

    const purchaseInfo = [
        {
            id: 1,
            name: 'iago campista batista adventista',
            address: 'rua bla bla  bla',
            codigo: 1257,
            payment: 'pix',
            discountCupom: '',
            freight: 'pac'
        }
    ]

    return (

        <div>

            <Header />

            <div id="cart">
                {products 
                ? (
                    <section id="purchaseInfo">
                        {/* <section  className="buyerInfo">
                            {purchaseInfo.map(purchase => (
                                <ul>
                                    <li>Código da compra: {purchase.codigo}</li>
                                    <li>Endereço de entrega: {purchase.address}</li>
                                    <li>Pagamento: {purchase.payment}</li>
                                    <li>Cupom: {purchase.discountCupom}</li>
                                    <li>Frete: {purchase.freight}</li>
                                </ul>
                            ))}     
                        </section> */}

                        <h2>Seu carrinho</h2>
                        <section className="productsInfo">
                            {products.map(product => (
                                <div>
                                    <img src={mandacaru} alt="aa"/>

                                    <ul>
                                        <li><strong>Modelo:</strong> {product.model}</li>
                                        <li><strong>Tamanho:</strong> {product.paperWidth}</li>
                                        <li><strong>Papel do miolo:</strong> {product.paper}</li>
                                        <li><strong>Capa:</strong> {product.cover}</li>
                                        <li><strong>Cores da capa:</strong> {product.cover_color}</li>
                                    </ul>

                                    <div className="productsButtons">
                                        <button>Adicionar observação</button>
                                        <button>Excluir</button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="checkout">
                            <a href="/">Continuar comprando...</a>
                            <h3>Preço: R$ 60,00</h3>
                            <button>Concluir compra!</button>
                        </section>
                        
                        <h2>Confira as artes de nossos clientes</h2>
                        <section className="ourClients">
                            <p>**Alguma coisa mostrando os produtos deles**</p>
                        </section>

                        <section className="ourServices">
                            <h1>Os cactus mais vendidos!</h1>

                            <div className="service-card">
                                <h3>mandacaru</h3>
                                <h4>Sketchbook costura copta</h4>
                                <img src={mandacaru} alt="Mandacaru" />
                            </div>

                            <div className="service-card">
                                <h3>baião</h3>
                                <h4>Sketchbook quadrado copta</h4>
                                <img src={baiao} alt="Baião" />
                            </div>

                            <div className="service-card">
                                <h3>facheiro</h3>
                                <h4>Sketchbook espiral</h4>
                                <img src={facheiro} alt="Facheiro" />
                            </div>

                        </section>
                    </section >

                ) 
                : (    
                    <section className="emptyCart">
                        <h3>Opa.. parece que seu carrinho está vazio! Bora fazer arte?</h3>
                        <a href="/">Bora!</a>
                    </section>
                )}

            </div>
            
            <Footer />

        </div>
    )
}