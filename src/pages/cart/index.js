import React from 'react';
import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';


function Cart() {
    return (
        <div>
            <Header />
            <section id="cart-body">
                <h1>Cart</h1>
            </section >
            <Footer />
        </div>
    )
} export default Cart;