import React from 'react';

import './style.scss';

import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import 'firebase/auth';

export default function Grammage() {
    return (
        <main id='mainGrammage'>
            <Header />

            <body>
                <h1>Miolos</h1>

                <div className='grammageInfos'>
                    <ul>
                        <h2>Papel Marfim 120g/m²</h2>
                        <li>
                            <p>Levemente amarelado</p>
                            <p>Mais conforto visual para anotar e desenhar</p>
                            <p>Leve textura</p>
                            <p>Gramatura um pouco alta</p>
                            <p>
                                Ideal para lápis grafite, de cor, giz pastel, seco e oleoso.
                            </p>
                            <p>Para anotações e sketchs</p>
                        </li>

                        <h2>Papel Reciclado 120g/m²</h2>
                        <li>
                            <p>Papel 100% de origem reciclável</p>
                            <p>Gramatura alta</p>
                            <p>Para desenhos e anotações</p>
                            <p>Acinzentado</p>
                        </li>

                        <h2>Papel Canson 140g/m²</h2>
                        <li>
                            <p>Textura levemente granulada</p>
                            <p>Naturalmente branco</p>
                            <p>Colado na massa</p>
                            <p>Livre de ácido</p>
                            <p>Para diversas técnicas de desenho</p>
                            <p>
                                Para técnicas secas e úmidas (desde que utilize
                                pouca água)
                            </p>
                        </li>

                        <h2>Papel Kraft 140g 140g/m²</h2>
                        <li>
                            <p>Levemente texturizado</p>
                            <p>Ideal para técnicas secas</p>
                            <p>
                                Para trabalhos com lápis branco, marcadores,
                                lápis de cor, giz pastel seco e oleoso
                            </p>
                        </li>

                        <h2>Papel Color Preto 180g/m²</h2>
                        <li>
                            <p>Liso</p>
                            <p>Ideal para técnicas secas e úmidas</p>
                            <p>
                                Para trabalhos com lápis branco, marcadores,
                                lápis de cor, giz pastel seco e oleoso,
                                canetinhas e metálicos
                            </p>
                        </li>

                        <h2>Papel Canson 200g/m²</h2>
                        <li>
                            <p>
                                Papel colado na massa
                            </p>
                            <p>Possui leve textura</p>
                            <p>Livre de ácido (não amarela com o tempo)</p>
                            <p>
                            Ideal para técnicas secas e úmidas (usado pouca água)
                            </p>
                            <p>
                            Para trabalhos com lápis grafite, marcadores (pode marcar o verso), lápis de cor, giz pastel seco e oleoso, aquarela e guache
                            </p>
                        </li>

                        <h2>Papel Canson 300g/m²</h2>
                        <li>
                            <p>
                                Papel com dupla face (sendo uma texturizada e
                                outra lisa)
                            </p>
                            <p>Naturalmente branco</p>
                            <p>Para várias técnicas de desenho</p>
                            <p>
                                Indicado para técnicas aguadas como aquarela,
                                guache, e acrílica
                            </p>
                            <p>
                                Para técnicas secas também como giz pastel seco,
                                oleoso, lápis grafite e de cor
                            </p>
                        </li>

                        <h2>Papel Montival 300g/m²</h2>
                        <li>
                            <p>Papel semi-profissional</p>
                            <p>Ideal para técnicas aguadas</p>
                            <p>Textura granulada</p>
                            <p>Gramatura alta</p>
                            <p>Colado na massa</p>
                            <p>Para várias técnicas de desenho</p>
                            <p>
                                Indicado para técnicas aguadas como aquarela,
                                guache e acrílica
                            </p>
                            <p>
                                Para técnicas secas também como giz pastel seco,
                                oleoso, lápis grafite e de cor
                            </p>
                        </li>

                        <h2>Strathmore Bristol 270g/m</h2>
                        <li>
                            <p>Alta qualidade</p>
                            <p>Gramatura alta que garante acabamento as suas artes
Papel branco natural</p>
                            <p>Textura Lisa</p>
                            <p>Para desenhos mecânicos </p>
                            <p>Indicado para o uso com marcadores, aerógrafos, caneta e nanquim</p>
                            <p>Livre de ácidos (não amarela com o tempo)</p>
                        </li>

                        <h2>Hahnemühle Expression 300g/m</h2>
                        <li>
                            <p>Textura fina</p>
                            <p>Colado na superfície, não possui gelatina e outros derivados de animais </p>
                            <p>Absorção mais lenta que permite trabalhar bem a tinta sem que absorva rápido</p>
                            <p>Máscaras líquidas e fitas saem mais fácil com este papel e não deixa resíduo tão facilmente </p>
                            <p>Livre de ácido (não amarela com o tempo)</p>
                            <p>Resistente à luz e envelhecimento </p>
                            <p>
                            Feito com máquina plana, água pura e naturalmente resistente contra fungos e bactérias
                            </p>
                            <p>
                            Indicado para trabalhos de técnicas aguadas como aquarela e guache
                            </p>
                        </li>
                    </ul>
                </div>

                <h1>Gramatura e quantidade de páginas</h1>

                <div className='grammageInfos'>
                    <h2>Mandacaru</h2>
                    <span>A4, A5, A6 e A7</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (48 págs)</h4>
                        </li>
                    </ul>

                    <span>A3</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                    </ul>
                </div>

                <div className='grammageInfos'>
                    <h2>Baião</h2>
                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (48 págs)</h4>
                        </li>
                    </ul>
                </div>

                <div className='grammageInfos'>
                    <h2>Facheiro</h2>
                    <span>A4, A5 e A6</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (48 págs)</h4>
                        </li>
                    </ul>

                    <span>A3</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                    </ul>

                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (112 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (112 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (80 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (48 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (48 págs)</h4>
                        </li>
                    </ul>
                </div>

                <div className='grammageInfos'>
                    <h2>Carcará</h2>
                    <span>A4, A5, A6 e A7</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (116 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (52 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (52 págs)</h4>
                        </li>
                    </ul>

                    <span>A3</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Somente liso</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (116 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (52 págs)</h4>
                        </li>
                    </ul>

                    <span>21X21cm, 15X15cm, 10X10cm</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (116 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (116 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g e 200g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 180g (84 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson Aquarela 300g (52 págs)</h4>
                        </li>
                        <li>
                            <h4>Montval 300g (52 págs)</h4>
                        </li>
                    </ul>
                </div>

                <div className='grammageInfos'>
                    <h2>Sertão</h2>
                    <span>A4, A5, 10X10cm e 14X14cm</span>

                    <ul>
                        <li>
                            <h4>Reciclado 120g (60 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Marfim 120g (60 págs)</h4>
                            <p>Liso, pontilhado, quadriculado ou pautado</p>
                        </li>

                        <li>
                            <h4>Kraft 140g (40 págs)</h4>
                        </li>
                        <li>
                            <h4>Canson 140g (40 págs)</h4>
                        </li>
                        <li>
                            <h4>Preto 120g (40 págs)</h4>
                        </li>
                    </ul>
                </div>

                <div className='grammageInfos'>
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
    );
}
