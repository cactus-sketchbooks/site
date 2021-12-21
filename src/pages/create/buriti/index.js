import React from 'react'
import './style.scss'

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

export default function Carcara() {

    return (

        <main>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="textIntro">

                    <h1>Monte seu Buriti</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperFormat">Selecione o modelo do Kindle</label>

                    <select className="paperFormat">

                        <option value="0" selected disabled>Formato do sketchbook</option>
                        <option value="10ª geração">10ª geração</option>
                        <option value="Parperwhite">Parperwhite</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="cover-color">Selecione a cor da capa da capa</label>

                    <select className="cover">

                        <option value="0" selected disabled>Modelo da Capa</option>
                        <option value="1 Cor">1 Cor</option>
                        <option value="2 Cores">2 Cores</option>
                        <option value="Cor + Kraft">Cor + Kraft</option>
                        <option value="Kraft">Kraft</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="elastic-color">Selecione a cor do elástico</label>

                    <select className="elastic color">

                        <option value="0" selected disabled>Cor do elástico</option>
                        <option value="Branco">Branco</option>
                        <option value="Preto">Preto</option>

                    </select>

                </fieldset>

            </section>

            <Footer />

        </main>

    )

}