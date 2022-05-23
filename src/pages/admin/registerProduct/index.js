import React, { useEffect, useState } from 'react';

import InputMask from 'react-input-mask';

import Header from '../../../components/header';
import Footer from '../../../components/footer';

import './style.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function RegisterProduct() {
    const [sketchbookData, setSketchbookData] = useState({
        id: '',
        model: '',
        paperWidth: '',
        paper: '',
        coverColors: [],
        lineColor: '',
        elasticColor: '',
        spiralColor: '',
        size: [],
        value: '',
        stock: '',
    });

    return (
        <main id='registerProduct'>
            <Header />

            <section id='createSketchbook'>
                <div className='selectProductType'>
                    <h1>Cadastrar um produto</h1>

                    <select name='selectProductType' id='selectProductType'>
                        <option value='' selected='selected' disabled>
                            Selecione o tipo de produto que deseja cadastrar
                        </option>
                        <option value='Sketchbooks'>Sketchbooks</option>
                        <option value='Outros'>Outros</option>
                    </select>
                </div>

                <select name='selectModel' id='selectModel'>
                    <option value='' selected='selected' disabled>
                        Modelo
                    </option>
                    <option value='Baião'>Baião</option>
                    <option value='Carcará'>Carcará</option>
                    <option value='Facheiro'>Facheiro</option>
                    <option value='Mandacaru'>Mandacaru</option>
                    <option value='Sertão'>Sertão</option>
                    <option value='Kindle 10ª Geração'>Kindle 10ª Geração</option>
                    <option value='Kindle Paperwhite'>Kindle Paperwhite</option>
                </select>

                <select name='selectPaperWidth' id='selectPaperWidth'>
                    <option value='' selected='selected' disabled>
                        Tamanho do papel
                    </option>
                    <option value='A3'>A3</option>
                    <option value='A4'>A4</option>
                    <option value='A5'>A5</option>
                    <option value='A6'>A6</option>
                    <option value='A7'>A7</option>
                    <option value='21X21'>21X21</option>
                    <option value='15X15'>15X15</option>
                    <option value='14X14'>14X14</option>
                    <option value='10X10'>10X10</option>
                </select>
            </section>

            <form></form>

            <Footer />
        </main>
    );
}
