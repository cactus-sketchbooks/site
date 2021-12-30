import React from 'react'
import './style.scss'

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

export default function Buriti() {

    function handleSelectedModel(event) {

        console.log(event.target.value)

    }

    function handleSelectedPaper(event) {

        console.log(event.target.value)

    }

    function handleSelectedCover(event) {

        console.log(event.target.value)

    }

    function handleSelectedElasticColor(event) {

        console.log(event.target.value)

    }

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

                    <select onChange={handleSelectedModel} className="paperFormat">

                        <option value="0" selected disabled>Formato do sketchbook</option>
                        <option value="10ª geração">10ª geração</option>
                        <option value="Parperwhite">Parperwhite</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="cover-color">Selecione a cor do tecido da capa da capa</label>

                    <select className="cover">

                        <option value="0" selected disabled>Cor da Capa</option>
                        

                    </select>

                </fieldset>

                <fieldset>

                    <label for="elastic-color">Selecione a cor do elástico</label>

                    <select className="elastic color">

                        <option value="0" selected disabled>Cor do elástico</option>

                    </select>

                </fieldset>

                <button>Finalizar</button>

            </section>

            <Footer />

        </main>

    )

}