import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


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
        {
            id: 3,
            model: 'buriti',
            paperWidth: 'A3',
            size: 'A4',
            type: 'kindle 3a geracao'
        }
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

                <section id="purchaseInfo">
                    <h3>Informação sobre a compra</h3>
                    <div className="buyerInfo">
                        {purchaseInfo.map(purchase => (
                            <ul>
                                <li>Código da compra: {purchase.codigo}</li>
                                <li>Endereço de entrega: {purchase.address}</li>
                                <li>Pagamento: {purchase.payment}</li>
                                <li>Cupom: {purchase.discountCupom}</li>
                                <li>Frete: {purchase.freight}</li>
                            </ul>
                        ))}     
                    </div>

                    <h3>Itens selecionados</h3>
                    <div className="productsInfo">
                        {products.map(product => (
                            <ul>
                                Imagem do produto
                                <li>Modelo: {product.model}</li>
                                <li>Tamanho: {product.paperWidth}</li>
                                <li>Papel do miolo: {product.paper}</li>
                                <li>Capa: {product.cover}</li>
                                <li>Cores da capa: {product.cover_color}</li>
                            </ul>
                        ))}
                    </div>

                    <div className="checkout">
                        <h3>Preço: R$ 60,00</h3>
                        <button>Concluir compra!</button>
                        <a href="/">Continuar comprando...</a>
                    </div>


                    <div className="emptyCart">
                        <h3>Opa.. parece que seu carrinho está vazio! Bora fazer arte?</h3>
                        <a href="/">Bora!</a>
                    </div>

                </section >
            </div>
            
            <Footer />

        </div>
    )
}