import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';

import './style.scss';

// import firebase from 'firebase/app';
// import 'firebase/auth';

function Admin() {

    return (

        <div>

            <Header />

                <section id="SectionAdmin">

                    <ul>

                        <Link to="listaDeUsuarios">Lista de clientes</Link>
                        <Link to="">Cadastrar/Alterar produtos</Link>
                        <Link to=""> Pedidos em andamento</Link>
                        <Link to="">Alterar conteúdo</Link>
                        
                    </ul>

                </section >

            <Footer />

        </div>

    )

} export default Admin;