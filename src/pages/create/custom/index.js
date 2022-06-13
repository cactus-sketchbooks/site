import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/mandacaru2.jpg';
import Mandacaru2Cores from '../../../images/capas/CAPA MODELO MANDACARU DUAS CORES.png';
import Mandacaru1Cor from '../../../images/capas/CAPA MODELO MANDACARU UMA COR.png';
import Facheiro1Cor from '../../../images/capas/CAPA MODELO FACHEIRO UMA COR.png';
import Facheiro2Cores from '../../../images/capas/CAPA MODELO FACHEIRO DUAS CORES.png';
import FacheiroQuadrado1Cor from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO UMA COR.png';
import FacheiroQuadrado2Cores from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO DUAS CORES.png';
import Baiao1Cor from '../../../images/capas/Baiao1Cor.png';
import Baiao2Cores from '../../../images/capas/Baiao2Cores.png';
import CarcaraRetangular from '../../../images/capas/CarcaraRetangular.png';
import CarcaraQuadrado from '../../../images/capas/CarcaraQuadrado.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';
import PaperOption from '../../../components/paperOption';

// vetor com todas as informações dos modelos, preços, tamanhos e papeis disponíveis
import { models } from '../custom/modelsInfos';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function Custom() {
    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedSketchModel, setSelectedSketchModel] = useState('');
    const [values, setValues] = useState({ formats: [] });
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(0);
    const [maxCheckedBoxes, setmaxCheckedBoxes] = useState(2);
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [sketchbookBasePrice, setSketchbookBasePrice] = useState(0);
    const [sketchbookTotalPrice, setSketchbookTotalPrice] = useState(0);
    const [
        selectedDifferentPapersQuantity,
        setSelectedDifferentPapersQuantity,
    ] = useState(0);
    //esse armazena a quantidade total de blocos selecionados
    const [totalPaperBlocksQtd, setTotalPaperBlocksQtd] = useState(0);

    //esse aqui armazena quantos seletores de quantidade de blocos foram selecionados
    const [selectedPaperBlocksQtd, setSelectedPaperBlocksQtd] = useState(0);
    const [selectedPaperTypeQtd, setSelectedPaperTypeQtd] = useState(0);
    const [selectedLineColor, setSelectedLineColor] = useState('');
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [clientNote, setClientNote] = useState('');
    const [sketchPaperInfo, setSketchPaperInfo] = useState([
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        { nomePapel: '', precoUnitario: 0, quantidade: 0 },
    ]);
    const [sketchbookInfos, setSketchbookInfos] = useState([]);
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const [currentStep, setCurrentStep] = useState(1);
    const paginasPorBloco = 16;

    const settings = {
        className: 'start',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: maxSlides,
        swipeToSlide: true,
    };

    useEffect(() => {
        if (window.innerWidth < 820) {
            setMaxSlides(3);
        } else {
            setMaxSlides(5);
        }
    }, []);

    function handleSelectedSketchModel(event) {
        let position = event.target.value;
        setSelectedSketchModel(models[position].modelName);
        setValues(models[position]);

        if (models[position].modelName === 'Carcará') {
            setmaxCheckedBoxes(1);
        } else {
            setmaxCheckedBoxes(2);
        }

        document.querySelector('.paperWidth').selectedIndex = 0;
        zerarEscolhaDePapeis();

        setSelectedSpiralColor('');
        setSelectedLineColor('');

        document
            .querySelectorAll('input[type=checkbox]')
            .forEach(function (check) {
                if (check.checked === true) {
                    // conferir com o como passar a informacao do checkbox para a funcao checkColor para "despintar" marcação
                    check.checked = false;
                }
            });
        setSelectedColors([]);
        setCheckedBoxes(0);
    }

    function handleSelectedSketchbook(event) {
        let position = event.target.value;
        setSelectedPaperWidth(values.formats[position].name);
        setformatTypes(values.formats[position].types);
        setFormatSize(values.formats[position].size);
        setFormatId(values.formats[position].id);
        setSketchbookBasePrice(values.formats[position].basePrice);

        zerarEscolhaDePapeis();
        calculateTotalPrice();
    }

    function zerarEscolhaDePapeis() {
        // zera o selector de papeis se o cliente chegar a selecionar os papeis, mas mudar de ideia e voltar e mudar o tamanho do sketchbook
        // forçando-o a escolher novamente os papeis do miolo, garantindo que o preço e os papeis escolhidos estarão corretos
        setSelectedDifferentPapersQuantity(0);
        setSketchPaperInfo([
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
            { nomePapel: '', precoUnitario: 0, quantidade: 0 },
        ]);
        document.querySelector('.paperQtd').selectedIndex = 0;
    }

    function onAuthStateChanged(user) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) setUserIsLogged(true);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged();
    }, []);

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setDataColors(temp);
            } else {
                console.log('No data available');
            }
        });
    }, []);

    let history = useHistory();

    function addToCart() {
        const temp = JSON.parse(localStorage.getItem('products'));
        var listOfItems =
            temp !== null ? Object.keys(temp).map((key) => temp[key]) : [];

        const newItems = [];

        const dataToSend = {
            model: selectedSketchModel,
            id: formatId,
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos,
            value: sketchbookTotalPrice,
            lineColor: selectedLineColor,
            elasticColor: selectedElasticColor,
            spiralColor: selectedSpiralColor,
            sketchFinish: selectedSketchFinish,
            coverColors: selectedColors,
            clientNote: clientNote,
            size: formatSize,
        };

        newItems.push(dataToSend);

        // n lembro o porquê disso (inclusive, length tá escrito errado, então a condição não funciona)
        if (listOfItems.lenght > 0) {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        } else {
            newItems.map((item) => listOfItems.push(item));
            localStorage.setItem('products', JSON.stringify(listOfItems));
        }

        history.push('/Carrinho');
    }

    function changeColor(event) {
        let isChecked;

        setTimeout(() => {
            isChecked = event.target.control.checked;

            if (isChecked) {
                event.target.style.backgroundColor = '#000';
            } else {
                event.target.style.backgroundColor = 'transparent';
            }
        }, 80);
    }

    const checkColor = (item, event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedColors([
                ...selectedColors,
                {
                    name: item.colorName,
                    code: item.colorCode,
                },
            ]);

            setCheckedBoxes(checkedBoxes + 1);
        } else {
            const color = item.colorName;
            let index = selectedColors.findIndex(
                (element) => element.name === color
            );

            if (index !== -1) {
                selectedColors.splice(index, 1);
                setCheckedBoxes(checkedBoxes - 1);
            }
        }
    };

    function checkLineOrSpiralOk() {
        // checa se a selecao de cor da linha e da espiral estã de acordo com o modelo selecionado
        let condition = false;
        if (selectedSketchModel === 'Carcará') {
            if (selectedSpiralColor === '' && selectedLineColor === '') {
                condition = true;
            }
        } else if (selectedSketchModel === 'Facheiro') {
            if (selectedSpiralColor != '' && selectedLineColor === '') {
                condition = true;
            }
        } else {
            if (selectedSpiralColor === '' && selectedLineColor != '') {
                condition = true;
            }
        }
        return condition;
    }

    useEffect(() => {
        checkLineOrSpiralOk();
        if (
            formatTypes === '' ||
            selectedPaperTypeQtd < selectedDifferentPapersQuantity ||
            selectedPaperBlocksQtd < selectedDifferentPapersQuantity ||
            totalPaperBlocksQtd > 10 ||
            totalPaperBlocksQtd < 6 ||
            checkLineOrSpiralOk() === false ||
            selectedElasticColor === '' ||
            selectedSketchFinish === '' ||
            sketchbookTotalPrice === 0 ||
            checkedBoxes > maxCheckedBoxes ||
            checkedBoxes === 0
        ) {
            setIsValidated(false);
        } else {
            setIsValidated(true);
        }
    }, [
        formatTypes,
        sketchbookInfos,
        selectedPaperTypeQtd,
        selectedPaperBlocksQtd,
        totalPaperBlocksQtd,
        selectedLineColor,
        selectedSpiralColor,
        selectedElasticColor,
        selectedSketchFinish,
        sketchbookTotalPrice,
        checkedBoxes,
    ]);

    function handleSelectedDiiferentPapersQuatity(event) {
        //zera os elementos do array se o cliente mudar de ideia e diminuir a quantidade de papeis
        if (parseInt(event.target.value) < selectedDifferentPapersQuantity) {
            for (let index = parseInt(event.target.value); index < 4; index++) {
                setSketchPaperInfo((prev) => {
                    let newArr = [...prev];
                    newArr[index] = {
                        ...prev[index],
                        nomePapel: '',
                        precoUnitario: 0,
                        quantidade: 0,
                    };
                    return newArr;
                });
            }
        }
        setSelectedDifferentPapersQuantity(parseInt(event.target.value));
    }

    useEffect(() => {
        setSketchbookInfos(
            sketchPaperInfo.slice(0, selectedDifferentPapersQuantity)
        );
        calculateTotalPrice();
    }, [sketchPaperInfo, selectedPaperWidth, selectedDifferentPapersQuantity]);

    function handleSelectedLineColor(item, event) {
        setSelectedLineColor(event);
    }

    function handleSelectedSpiralColor(event) {
        setSelectedSpiralColor(event.target.value);
    }

    function handleSelectedElasticColor(item, event) {
        setSelectedElasticColor(event);
    }

    function handleSelectedSketchFinish(event) {
        setSelectedSketchFinish(event.target.value);
    }

    function handleClientNote(event) {
        setClientNote(event.target.value);
    }

    function calculateTotalPrice() {
        let totalPrice = sketchbookBasePrice;

        sketchbookInfos.forEach(function (papel) {
            totalPrice += papel.precoUnitario * papel.quantidade;
        });

        setSketchbookTotalPrice(totalPrice);
    }

    useEffect(() => {
        let paperQtd = 0;
        sketchbookInfos.map((papel) => {
            paperQtd += papel.quantidade;
        });
        setTotalPaperBlocksQtd(paperQtd);

        setSelectedPaperTypeQtd(
            sketchbookInfos.reduce((count, papel) => {
                if (papel.nomePapel !== '') {
                    count += 1;
                }
                return count;
            }, 0)
        );
        setSelectedPaperBlocksQtd(
            sketchbookInfos.reduce((count, papel) => {
                if (papel.quantidade !== 0) {
                    count += 1;
                }
                return count;
            }, 0)
        );
    }, [sketchbookInfos]);

    function handleModalInfos() {
        displayModal === 'none'
            ? setDisplayModal('flex')
            : setDisplayModal('none');

        document.querySelectorAll('.modalContent').forEach(function (modal) {
            modal.classList.add('hide');
        });
        if (selectedSketchModel !== '') {
            document
                .querySelector(`#${selectedSketchModel.toLowerCase()}Version`)
                .classList.remove('hide');
        } else {
            document.querySelector('#nullVersion').classList.remove('hide');
        }
    }

    function closeModal() {
        if (displayModal === 'none') setDisplayModal('flex');
        else {
            setDisplayModal('none');
        }
    }

    function handleNextStep() {
        if (currentStep <= 7) {
            setCurrentStep(currentStep + 1);
        }
    }
    function handlePreviousStep() {
        if (currentStep >= 2) {
            setCurrentStep(currentStep - 1);
        }
    }

    useEffect(() => {
        updateStepIndicator(currentStep);
        updateStepChoices(currentStep);
        calculateTotalPrice();
    }, [currentStep]);

    function updateStepIndicator(currentStep) {
        const stepsTitles = document.querySelectorAll('.stepTitle');

        // retira a cor de ativo de todos pra garantir
        stepsTitles.forEach(function (step) {
            step.classList.remove('active-step');
        });
        // adiciona a cor de ativo no indicador do passo atual
        document
            .querySelector(`.title${currentStep}`)
            .classList.add('active-step');

        // mostra e esconde os botoes de avancar ou retroceder se estivar na primeira ou ultima pagina
        switch (currentStep) {
            case 1:
                // esconde o botao de voltar se estiver no primeiro passo
                document.querySelector('.btn.previous').classList.add('hide');
                break;
            case 2:
                // mostra novamente o botao de voltar neste passo
                document
                    .querySelector('.btn.previous')
                    .classList.remove('hide');
                break;
            case 7:
                // volta a mostrar o botao de avancar caso o usuario vá ao ultimo passo e volte
                document.querySelector('.btn.next').classList.remove('hide');
                break;
            case 8:
                // esconde o botao de proxima pagina se estiver no ultimo passo (pq ja tem o de adicionar ao carrinho)
                document.querySelector('.btn.next').classList.add('hide');
                break;
            default:
        }
    }

    function updateStepChoices(currentStep) {
        const steps = document.querySelectorAll('.steps');
        steps.forEach(function (step) {
            // esconde todas as outras divs
            step.classList.add('hide');
        });

        document.querySelector(`.step${currentStep}`).classList.remove('hide');
    }

    return (
        <main id='MainSketchbook'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div id='mandacaruVersion' className='modalContent'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com uma cor</h3>
                        <img src={Mandacaru1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com duas cores</h3>
                        <img src={Mandacaru2Cores} alt='' />
                    </div>
                </div>
                <div id='facheiroVersion' className='modalContent hide'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com uma cor</h3>
                        <img src={Facheiro1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com duas cores</h3>
                        <img src={Facheiro2Cores} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado com uma cor</h3>
                        <img src={FacheiroQuadrado1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado com duas cores</h3>
                        <img src={FacheiroQuadrado2Cores} alt='' />
                    </div>
                </div>
                <div id='baiãoVersion' className='modalContent hide'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com uma cor</h3>
                        <img src={Baiao1Cor} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa com duas cores</h3>
                        <img src={Baiao2Cores} alt='' />
                    </div>
                </div>
                <div id='carcaráVersion' className='modalContent hide'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa retangular</h3>
                        <img src={CarcaraRetangular} alt='' />
                    </div>

                    <div className='sketchbookImgWrapper'>
                        <h3>Modelo de capa quadrado</h3>
                        <img src={CarcaraQuadrado} alt='' />
                    </div>
                </div>

                {/* caso a pessoa clique em abrir o modal sem ter selecionado um modelo de sketchbook */}
                <div id='nullVersion' className='modalContent hide'>
                    <span onClick={closeModal}>x</span>

                    <div className='sketchbookImgWrapper'>
                        <h3>
                            Selecione o primeiro o modelo do sketchbook para
                            mostar os modelos de capas de acordo com o
                            escolhido.
                        </h3>
                    </div>
                </div>
            </div>

            <Header />

            <section id='CreateSketchbookSection'>
                <div className='textIntro'>
                    <h1>Monte seu Sketchbook personalizado</h1>
                    <h5>
                        Selecione as opções abaixo e monte seu cactus do seu
                        jeito
                    </h5>
                </div>

                <div id='steps-indicator'>
                    <div className='stepTitle title1 active-step'>
                        <h3>1: Modelo</h3>
                    </div>
                    <div className='stepTitle title2'>
                        <h3>2: Tamanho</h3>
                    </div>
                    <div className='stepTitle title3'>
                        <h3>3: Papel do Miolo</h3>
                    </div>
                    <div className='stepTitle title4'>
                        <h3>4: Cor da Capa</h3>
                    </div>
                    <div className='stepTitle title5'>
                        <h3>5: Cor da Linha/Espiral</h3>
                    </div>
                    <div className='stepTitle title6'>
                        <h3>6: Cor do Elástico</h3>
                    </div>
                    <div className='stepTitle title7'>
                        <h3>7: Acabamento</h3>
                    </div>
                    <div className='stepTitle title8'>
                        <h3>Resumo do Pedido</h3>
                    </div>
                </div>
                <div className='steps step1 full '>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Modelo</h2>
                        </div>
                    </div>

                    <fieldset>
                        <label htmlFor='modelSelector'>
                            Selecione o modelo do Sketchbook
                        </label>

                        <select
                            onChange={handleSelectedSketchModel}
                            className='modelSelector'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Modelo do Sketchbook
                            </option>

                            {models.map((model, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {model.modelName}
                                    </option>
                                );
                            })}
                        </select>
                    </fieldset>
                </div>

                <div className='steps step2 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tamanho e Orientação</h2>
                        </div>
                    </div>

                    <fieldset>
                        <label htmlFor='paperWidth'>
                            Selecione o tamanho e orientação do papel
                        </label>

                        <select
                            onChange={handleSelectedSketchbook}
                            className='paperWidth'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Tamanho e orientação do papel
                            </option>

                            {values.formats.map((format, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {format.name} (+ R$ {format.basePrice})
                                    </option>
                                );
                            })}
                        </select>
                    </fieldset>
                </div>

                <div className='steps step3 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Papel do Miolo</h2>
                        </div>
                    </div>

                    <fieldset>
                        <label htmlFor='paperQtd'>
                            Selecione a quantidade de Papéis Diferentes no Miolo
                            do Sketchbook
                        </label>
                        <select
                            onChange={handleSelectedDiiferentPapersQuatity}
                            className='paperQtd'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Quantidade de Papéis Diferentes
                            </option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>

                        <p className='upperCaseText'>
                            Os Sketchbooks podem ser montados adicionando blocos
                            de
                            <b> 16 páginas</b>
                        </p>
                        <br />

                        <p>
                            Veja mais sobre a gramatura clicando{' '}
                            <Link to='/gramaturas'>aqui</Link>
                        </p>
                        <br />

                        {[...Array(selectedDifferentPapersQuantity)].map(
                            (_, i) => (
                                <PaperOption
                                    tipos={formatTypes}
                                    quantidade={paginasPorBloco}
                                    setSketchPaperInfo={setSketchPaperInfo}
                                    index={i}
                                    key={i}
                                />
                            )
                        )}

                        {/* so mostra os avisos se a pessoa escolher a quantidade de papeis diferentes, pra deixar o visual mais limpo */}
                        {selectedDifferentPapersQuantity === 0 ? (
                            ''
                        ) : (
                            <>
                                <p className='upperCaseText'>
                                    Os Sketchbooks devem ter ao final, no mínimo{' '}
                                    <b>6 blocos (96 páginas)</b> e no máximo{' '}
                                    <b>10 blocos (160 páginas)</b>
                                </p>

                                <h3 id='paperWarning'>
                                    Seu Sketchbook tem atualmente{' '}
                                    <b className='emphasisWarning'>
                                        {totalPaperBlocksQtd}
                                    </b>{' '}
                                    blocos.
                                </h3>

                                {totalPaperBlocksQtd > 10 ||
                                totalPaperBlocksQtd < 6 ? (
                                    <p
                                        style={{
                                            marginBottom: '0.6rem',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Ajuste a quantidade de blocos antes de
                                        avançar para a próxima etapa.
                                    </p>
                                ) : (
                                    ''
                                )}
                                {selectedPaperTypeQtd <
                                selectedDifferentPapersQuantity ? (
                                    <p
                                        style={{
                                            marginBottom: '0.6rem',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Você deve selecionar{' '}
                                        <strong>todas as opções</strong> de
                                        papéis antes de prosseguir
                                    </p>
                                ) : (
                                    ''
                                )}
                                {selectedPaperBlocksQtd <
                                selectedDifferentPapersQuantity ? (
                                    <p
                                        style={{
                                            marginBottom: '0.6rem',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Você deve selecionar{' '}
                                        <strong>todas as opções</strong> de
                                        quantidade de blocos antes de prosseguir
                                    </p>
                                ) : (
                                    ''
                                )}
                                {totalPaperBlocksQtd > 10 ||
                                totalPaperBlocksQtd < 6 ||
                                selectedPaperTypeQtd <
                                    selectedDifferentPapersQuantity ||
                                selectedPaperBlocksQtd <
                                    selectedDifferentPapersQuantity ? (
                                    ''
                                ) : (
                                    <p>Vamos continuar!</p>
                                )}
                            </>
                        )}
                    </fieldset>
                </div>

                <div className='steps step4 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Cor da capa</h2>
                        </div>
                        {selectedSketchModel === 'Carcará' ? (
                            <p>
                                Selecione <strong>uma</strong> cor. Arraste para
                                o lado para conferir todas as opções.{' '}
                                <button onClick={() => handleModalInfos()}>
                                    Clique aqui para visualizar os modelos de
                                    capa
                                </button>
                            </p>
                        ) : (
                            <>
                                <p>
                                    Selecione <strong>até duas</strong> cores.
                                    Arraste para o lado para conferir todas as
                                    opções.{' '}
                                    <button onClick={() => handleModalInfos()}>
                                        Clique aqui para visualizar os modelos
                                        de capa
                                    </button>
                                </p>
                                <p>
                                    A <b>primeira</b> cor selecionada é
                                    referente à parte maior (inferior) e a{' '}
                                    <b>segunda</b> é referente à parte menor
                                    (superior). Não é possível escolher dois
                                    tipos de tecido por capa, e se um tecido for
                                    esolhido, ele <b>obrigatoriamente</b> ficará
                                    na parte de baixo (maior).
                                </p>
                            </>
                        )}
                    </div>

                    <div className='sliderColors'>
                        <Slider {...settings}>
                            {dataColors.map((item, index) =>
                                item.models.includes(
                                    // transforma o nome do modelo escolhido para minusculo e sem acento para adequar a como foi criado no cadastro das cores
                                    selectedSketchModel
                                        .toLowerCase()
                                        .normalize('NFD')
                                        .replace(/[\u0300-\u036f]/g, '')
                                ) && item.categories.includes('cover') ? (
                                    <div className='cardColor' key={index}>
                                        <label
                                            htmlFor={index}
                                            onClick={(event) =>
                                                changeColor(event)
                                            }
                                        />

                                        {item.image ? (
                                            <div
                                                key={item.id}
                                                className='colorBox'
                                            >
                                                <img
                                                    draggable='false'
                                                    src={item.image}
                                                    alt='cor'
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                key={item.id}
                                                style={{
                                                    backgroundColor:
                                                        item.colorCode,
                                                }}
                                                className='colorBox'
                                            >
                                                <p>{item.colorCode}</p>
                                            </div>
                                        )}

                                        <div className='colorName'>
                                            <p>{item.colorName}</p>

                                            <input
                                                type='checkbox'
                                                value={index}
                                                id={index}
                                                onChange={(event) =>
                                                    checkColor(item, event)
                                                }
                                                style={{
                                                    accentColor: item.colorCode,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </Slider>
                    </div>
                </div>

                <div className='steps step5 full hide'>
                    {selectedSketchModel === 'Mandacaru' ||
                    selectedSketchModel === 'Baião' ? (
                        <section id='RadioSelectionLineColor'>
                            <div className='boxColor'>
                                <div className='textWrapper'>
                                    <div className='textBackground'>
                                        <h2>Cor da linha</h2>
                                    </div>

                                    <p>
                                        Selecione <strong>uma</strong> cor
                                    </p>
                                </div>

                                <div className='lineColorWrapper'>
                                    {dataColors.map((item, index) =>
                                        item.models.includes(
                                            selectedSketchModel
                                                .toLowerCase()
                                                .normalize('NFD')
                                                .replace(/[\u0300-\u036f]/g, '')
                                        ) &&
                                        item.categories.includes('line') ? (
                                            <div
                                                className='colorWrapper'
                                                key={index}
                                            >
                                                {item.image ? (
                                                    <div className='elasticColor'>
                                                        <img
                                                            src={item.image}
                                                            alt='cor do elástico'
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                item.colorCode,
                                                        }}
                                                        className='elasticColor'
                                                    />
                                                )}

                                                <input
                                                    type='radio'
                                                    onClick={(event) =>
                                                        handleSelectedLineColor(
                                                            event,
                                                            item,
                                                            index
                                                        )
                                                    }
                                                    name='selectedLineColor'
                                                    key={item.id}
                                                    value={item.name}
                                                    className='checkbox'
                                                    style={{
                                                        accentColor:
                                                            item.colorCode,
                                                    }}
                                                />
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </section>
                    ) : selectedSketchModel === 'Facheiro' ? (
                        <>
                            <div className='textWrapper'>
                                <div className='textBackground'>
                                    <h2>Cor do espiral</h2>
                                </div>
                            </div>

                            <fieldset>
                                <label htmlFor='paper'>
                                    Selecione a cor do espiral
                                </label>

                                <select
                                    onChange={handleSelectedSpiralColor}
                                    className='paper'
                                    defaultValue='0'
                                >
                                    <option value='0' disabled>
                                        Cor do espiral
                                    </option>
                                    <option value='Preto'>Preto</option>
                                    <option value='Branco'>Branco</option>
                                </select>
                            </fieldset>
                        </>
                    ) : (
                        <div className='textWrapper'>
                            <div className='textBackground'>
                                <h2>Cor da linha</h2>
                            </div>

                            <p>
                                O {selectedSketchModel} não permite escolha de
                                cor da linha, avance para a próxima etapa.
                            </p>
                        </div>
                    )}
                </div>

                <div className='steps step6 full hide'>
                    <section id='RadioSelectionColors'>
                        <div className='boxColor'>
                            <div className='textWrapper'>
                                <div className='textBackground'>
                                    <h2>Cor do elástico</h2>
                                </div>

                                <p>
                                    Selecione <strong>uma</strong> cor
                                </p>
                            </div>

                            <div className='elasticColorWrapper'>
                                {dataColors.map((item, index) =>
                                    item.models.includes(
                                        selectedSketchModel
                                            .toLowerCase()
                                            .normalize('NFD')
                                            .replace(/[\u0300-\u036f]/g, '')
                                    ) && item.categories.includes('elastic') ? (
                                        <div
                                            className='colorWrapper'
                                            key={index}
                                        >
                                            {item.image ? (
                                                <div className='elasticColor'>
                                                    <img
                                                        src={item.image}
                                                        alt='cor do elástico'
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            item.colorCode,
                                                    }}
                                                    className='elasticColor'
                                                />
                                            )}

                                            <input
                                                type='radio'
                                                onClick={(event) =>
                                                    handleSelectedElasticColor(
                                                        event,
                                                        item,
                                                        index
                                                    )
                                                }
                                                name='selectedElasticColor'
                                                key={item.id}
                                                value={item.name}
                                                style={{
                                                    accentColor: item.colorCode,
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <div className='steps step7 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tipo de Acabamento</h2>
                        </div>
                    </div>
                    {/* Inserir aqui a imagem de mostra dos tipos de acabamento */}

                    <fieldset>
                        <label htmlFor='SketchFinish'>
                            Selecione o tipo de acabamento nas bordas
                        </label>

                        <select
                            onChange={(event) =>
                                handleSelectedSketchFinish(event)
                            }
                            className='SketchFinish'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Tipo de Acabamento
                            </option>
                            <option value='Reto'>Reto</option>
                            <option value='Arredondado'>Arredondado</option>
                        </select>
                    </fieldset>
                </div>

                <div className='additionalInfos steps step8 hide'>
                    <label htmlFor='additionalInfos'>
                        Informações adicionais <strong>(opcional)</strong>
                    </label>

                    <textarea
                        type='text'
                        name='additionalInfos'
                        id='additionalInfos'
                        onChange={handleClientNote}
                    />

                    {isValidated ? (
                        <>
                            <div className='productInfosWrapper'>
                                <h1>Seu sketchbook</h1>

                                <ul>
                                    <li>
                                        <strong>Modelo: </strong>
                                        {selectedSketchModel}
                                    </li>
                                    <li>
                                        <strong>Tamanho do papel: </strong>
                                        {selectedPaperWidth}
                                    </li>
                                    <li>
                                        <strong>Papel do miolo: </strong>
                                        <br />
                                        <br />
                                        {sketchbookInfos.map((papel, index) => {
                                            return (
                                                <p key={index}>
                                                    {index + 1} -{' '}
                                                    <strong>
                                                        {papel.quantidade}
                                                    </strong>{' '}
                                                    bloco(s) de{' '}
                                                    <strong>
                                                        {papel.nomePapel}
                                                    </strong>
                                                </p>
                                            );
                                        })}
                                    </li>

                                    <li>
                                        <strong>Cor da capa: </strong>

                                        {selectedColors.length > 0 ? (
                                            selectedColors.length === 2 ? (
                                                <span>{`${selectedColors[0].name} (parte inferior) e ${selectedColors[1].name} (parte superior)`}</span>
                                            ) : (
                                                <span>
                                                    {selectedColors[0].name}
                                                </span>
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </li>

                                    {selectedLineColor ? (
                                        <li>
                                            <strong>Cor da linha: </strong>
                                            {selectedLineColor.colorName}
                                        </li>
                                    ) : null}

                                    {selectedSpiralColor ? (
                                        <li>
                                            <strong>Cor do espiral: </strong>
                                            {selectedSpiralColor}
                                        </li>
                                    ) : null}

                                    <li>
                                        <strong>Cor do elástico: </strong>
                                        {selectedElasticColor.colorName}
                                    </li>
                                    <li>
                                        <strong>Tipo de Acabamento: </strong>
                                        {selectedSketchFinish}
                                    </li>
                                </ul>

                                <h3>
                                    Valor do sketchbook: R${' '}
                                    {sketchbookTotalPrice.toFixed(2)}
                                </h3>

                                <button onClick={() => addToCart()}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>
                                Você deve selecionar{' '}
                                <strong>todas as opções</strong> antes de
                                finalizar seu sketchbook
                            </p>
                        </>
                    )}
                </div>

                <div id='btns'>
                    <button
                        className='btn previous hide'
                        onClick={(e) => handlePreviousStep()}
                    >
                        Etapa Anterior
                    </button>
                    <button
                        className='btn next'
                        onClick={(e) => handleNextStep()}
                    >
                        Próxima Etapa
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
