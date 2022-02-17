import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'

import './style.scss'

import logo from '../../images/cactopng2.png';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../FirebaseConfig.js'

export default function Grammage() {

    return (

        <main id="mainGrammage">

            <Header />

            <body>

                <h1>Gramatura e quantidade de páginas</h1>

                <div className="grammageInfos">

                    <h2>Mandacaru</h2>
                    <span>A4, A5, A6 e A7</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>
                        <li><h4>Montval 300g (48 págs)</h4></li>

                    </ul>

                    <span>A3</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>

                    </ul>

                </div>

                <div className="grammageInfos">

                    <h2>Baião</h2>
                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>
                        <li><h4>Montval 300g (48 págs)</h4></li>

                    </ul>

                </div>

                <div className="grammageInfos">

                    <h2>Facheiro</h2>
                    <span>A4, A5 e A6</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>
                        <li><h4>Montval 300g (48 págs)</h4></li>

                    </ul>

                    <span>A3</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>

                    </ul>

                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (112 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (80 págs)</h4></li>
                        <li><h4>Preto 180g (80 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (48 págs)</h4></li>
                        <li><h4>Montval 300g (48 págs)</h4></li>

                    </ul>

                </div>

                <div className="grammageInfos">

                    <h2>Carcará</h2>
                    <span>A4, A5, A6 e A7</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (116 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (84 págs)</h4></li>
                        <li><h4>Preto 180g (84 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (52 págs)</h4></li>
                        <li><h4>Montval 300g (52 págs)</h4></li>

                    </ul>

                    <span>A3</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li><h4>Kraft 140g (116 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (84 págs)</h4></li>
                        <li><h4>Preto 180g (84 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (52 págs)</h4></li>

                    </ul>

                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (116 págs)</h4></li>
                        <li><h4>Canson 140g e 200g (84 págs)</h4></li>
                        <li><h4>Preto 180g (84 págs)</h4></li>
                        <li><h4>Canson Aquarela 300g (52 págs)</h4></li>
                        <li><h4>Montval 300g (52 págs)</h4></li>

                    </ul>

                </div>

                <div className="grammageInfos">

                    <h2>Sertão</h2>
                    <span>A4, A5, 10X10cm e 14X14cm</span>

                    <ul>

                        <li>
                            <h4>Reciclado 120g (60 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Pólen 90g (60 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li><h4>Kraft 140g (40 págs)</h4></li>
                        <li><h4>Canson 140g (40 págs)</h4></li>
                        <li><h4>Preto 120g (40 págs)</h4></li>

                    </ul>

                </div>

                <div className="grammageInfos">

                    <h2>Buriti</h2>
                    <span>10ª Geração e Paperwhite</span>

                    <ul>

                        <li>
                            <h4>10ª Geração</h4>
                            <p>12x17cm (externa) e 11,5x16cm (interna)</p>
                        </li>

                        <li>
                            <h4>Paperwhite</h4>
                            <p>12,5x18cm (externa) e 12x17,5cm (interna)</p>
                        </li>

                    </ul>

                </div>

            </body>

            <Footer />

        </main>

    )

}