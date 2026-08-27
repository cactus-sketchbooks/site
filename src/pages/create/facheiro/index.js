import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import logo from '../../../images/facheiro.png';
import Facheiro1Cor from '../../../images/capas/CAPA MODELO FACHEIRO UMA COR.png';
import Facheiro2Cores from '../../../images/capas/CAPA MODELO FACHEIRO DUAS CORES.png';
import FacheiroQuadrado1Cor from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO UMA COR.png';
import FacheiroQuadrado2Cores from '../../../images/capas/CAPA MODELO FACHEIRO QUADRADO DUAS CORES.png';
import TAMANHOS_E_ORIENTACOES from '../../../images/FACHEIRO_TAMANHOS_E_ORIENTACOES.jpg';
import PAPEIS_DO_MIOLO from '../../../images/PAPEIS_DO_MIOLO.jpg';
import COR_ESPIRAL from '../../../images/COR_ESPIRAL.jpg';
import ACABAMENTO from '../../../images/ACABAMENTO.jpg';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';
import initialValues from './data.js';

export default function Facheiro() {
    const [dataColors, setDataColors] = useState([]);
    const [formatTypes, setformatTypes] = useState([]);
    const [formatSize, setFormatSize] = useState({});
    const [formatId, setFormatId] = useState('');
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState(0);
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('');
    const [selectedSpiralColor, setSelectedSpiralColor] = useState('');
    const [selectedElasticColor, setSelectedElasticColor] = useState('');
    const [preSelectedSpiralColor, setPreSelectedSpiralColor] = useState('');
    const [preSelectedElasticColor, setPreSelectedElasticColor] = useState('');
    const [displaySpiralColorSelection, setDisplaySpiralColorSelection] =
        useState('flex');
    const [displayElasticColorSelection, setDisplayElasticColorSelection] =
        useState('flex');
    const [selectedSketchFinish, setSelectedSketchFinish] = useState('');
    const [clientNote, setClientNote] = useState('');
    const [sketchbookInfos, setSketchbookInfos] = useState('');
    const [totalValue, setTotalValue] = useState(0);
    const [displayModal, setDisplayModal] = useState('none');
    const [maxSlides, setMaxSlides] = useState(5);
    const [currentStep, setCurrentStep] = useState(1);

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);

    // Produtos a pronta entrega
    const [selectedStockProducts, setSelectedStockProducts] = useState([]);
    const [stockProducts, setStockProducts] = useState([]);

    useEffect(() => {
        const fetchStockProducts = async () => {
            try {
                const snapshot = await firebase
                    .database()
                    .ref('products')
                    .once('value');
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Transforma o objeto do Firebase num Array facilitando o .map()
                    const productsArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setStockProducts(productsArray);
                }
            } catch (error) {
                console.error('Erro ao buscar produtos adicionais:', error);
            }
        };

        fetchStockProducts();
    }, []);

    // Função para lidar com o clique no checkbox
    const toggleStockProduct = (product) => {
        setSelectedStockProducts((prevSelected) => {
            // Verifica se o produto já está selecionado
            const isAlreadySelected = prevSelected.some(
                (item) => item.id === product.id
            );

            if (isAlreadySelected) {
                // Se já estava, o cliente desmarcou (então removemos da lista)
                return prevSelected.filter((item) => item.id !== product.id);
            } else {
                // Se não estava, adicionamos na lista de selecionados
                return [...prevSelected, product];
            }
        });
    };

    const getFinalValue = () => {
        // Pega o valor base do papel/modelo selecionado
        const baseValue = parseFloat(totalValue || 0);

        // Soma os valores de todos os produtos a pronta entrega selecionados na etapa 7
        const additionalsValue = selectedStockProducts.reduce(
            (acc, product) => {
                return acc + parseFloat(product.value || 0);
            },
            0
        );

        return baseValue + additionalsValue;
    };

    useEffect(() => {
        const fetchModelsData = async () => {
            try {
                // busca os dados unificados direto do nó do modelo
                const snapshot = await firebase
                    .database()
                    .ref('models/facheiro')
                    .once('value');

                if (snapshot.exists()) {
                    const modelData = snapshot.val();

                    // Extrai os formatos e os papéis do modelo
                    const formatsObj = modelData.formats || {};
                    const innerPapersObj = modelData.innerPapers || {};

                    // Filtra apenas os papéis ativos
                    const activePapers = Object.values(innerPapersObj).filter(
                        (p) => p.active
                    );

                    // Mapeia os formatos diretamente do que está cadastrado no banco
                    const formatosAtualizados = Object.values(formatsObj).map(
                        (formato) => {
                            // Mapeia os papéis ativos que possuem preço de Bloco Cheio (prices) para este formato
                            const tiposDePapelMapeados = activePapers
                                .filter(
                                    (paper) =>
                                        paper.prices &&
                                        paper.prices[formato.name] !== undefined
                                )
                                .map((paper) => ({
                                    name: paper.name,
                                    value: paper.prices[formato.name], // Puxa o preço do bloco cheio
                                }));

                            // Retorna o formato estruturado com os dados reais do banco + a array types
                            return {
                                ...formato, // Já traz name, basePrice e o objeto size completo
                                types: tiposDePapelMapeados,
                            };
                        }
                    );

                    // Atualiza o estado da tela sem precisar do 'initialValues' fixo
                    setValues({
                        name: modelData.name || 'Facheiro',
                        formats: formatosAtualizados,
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar dados do Facheiro:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchModelsData();
    }, []);

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

    function handleSelectedSketchbook(event) {
        let position = event.target.value;

        setSelectedPaperWidth(values.formats[position].name);
        setformatTypes(values.formats[position].types);
        setFormatSize(values.formats[position].size);
        setFormatId(values.formats[position].id);

        // zera o selector de papeis se o cliente chegar a selecionar o papel, mas mudar de ideia e voltar e mudar o tamanho do sketchbook
        // forçando-o a escolher novamente o papel do miolo, garantindo que o preço e os papel escolhidos estarão corretos
        setSketchbookInfos('');
        document.querySelector('.paper').selectedIndex = 0;
        setTotalValue(0);
    }

    function handleSelectedType(event) {
        let position = event.target.value;
        setSketchbookInfos(formatTypes[position]);
        setTotalValue(formatTypes[position].value);

        // desmarca todas as checkboxes
        document
            .querySelectorAll('input[type=checkbox]')
            .forEach(function (check) {
                check.checked = false;
            });
        //"despinta" todas as checkboxes
        document.querySelectorAll('.coverColorLabel').forEach((label) => {
            label.style.backgroundColor = 'transparent';
        });
        // zera as capas selecionadas, para nao dar problema no calculo do preco se selecionar uma capa ILUSTRES
        setSelectedColors([]);
        setCheckedBoxes(0);
        // zera as cores de linha e elastico selecionadas, para caso seja selecionado uma ilustres e o cliente volte para mudar o papel, e
        // pelas linhas acima as capas sao zeradas, e se uma capa ilustre que tinha sido selecionada é zerada, suas cores (de linha e elastico) predefinidas tambem precisam ser zeradas
        zerarCoresPreSelecionadas();
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
        let listOfItems =
            temp !== null ? Object.keys(temp).map((key) => temp[key]) : [];

        const dataToSend = {
            model: 'Facheiro',
            id: formatId,
            paperWidth: selectedPaperWidth,
            paper: sketchbookInfos.name,
            value: getFinalValue(),
            spiralColor: selectedSpiralColor,
            elasticColor: selectedElasticColor,
            sketchFinish: selectedSketchFinish,
            coverColors: selectedColors,
            clientNote: clientNote,
            size: formatSize,
            selectedStockProducts: selectedStockProducts || [],
        };

        listOfItems.push(dataToSend);

        localStorage.setItem('products', JSON.stringify(listOfItems));
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

            if (item.isIlustres) {
                setTotalValue(sketchbookInfos.value + item.aditionalPrice);
                // define a cor do sketch e esconde o seletor de cor de linha se a pre definifa existir (se nao for uma string vazia)
                if (item.preSelectedSpiralColor) {
                    setDisplaySpiralColorSelection('none');
                    setSelectedSpiralColor(item.preSelectedSpiralColor);
                    setPreSelectedSpiralColor(item.preSelectedSpiralColor);
                }
                // define a cor do sketch e esconde o seletor de cor de elastico se a pre definifa existir (se nao for uma string vazia)
                if (item.preSelectedElasticColor) {
                    setDisplayElasticColorSelection('none');
                    setSelectedElasticColor(item.preSelectedElasticColor);
                    setPreSelectedElasticColor(item.preSelectedElasticColor);
                }

                // desmarca todos os radio buttons de cor de elastico e o seletor de cor da espiral
                document.querySelector('#spiralColorSelect').selectedIndex = 0;
                document
                    .querySelectorAll('input[name=selectedElasticColor]')
                    .forEach(function (check) {
                        check.checked = false;
                    });
            }
        } else {
            const color = item.colorName;
            let index = selectedColors.findIndex(
                (element) => element.name === color
            );

            if (index !== -1) {
                selectedColors.splice(index, 1);
                setCheckedBoxes(checkedBoxes - 1);
            }

            if (item.isIlustres) {
                setTotalValue(sketchbookInfos.value);
                zerarCoresPreSelecionadas();
            }
        }
    };

    function zerarCoresPreSelecionadas() {
        setSelectedSpiralColor('');
        setPreSelectedSpiralColor('');
        setSelectedElasticColor('');
        setPreSelectedElasticColor('');

        setDisplaySpiralColorSelection('flex');
        setDisplayElasticColorSelection('flex');

        // desmarca todos os radio buttons de cor de elastico e o seletor de cor da espiral
        document.querySelector('#spiralColorSelect').selectedIndex = 0;
        document
            .querySelectorAll('input[name=selectedElasticColor]')
            .forEach(function (check) {
                check.checked = false;
            });
    }

    useEffect(() => {
        if (
            formatTypes === '' ||
            sketchbookInfos === '' ||
            selectedSpiralColor === '' ||
            selectedElasticColor === '' ||
            selectedSketchFinish === '' ||
            checkedBoxes > 2 ||
            checkedBoxes === 0
        ) {
            setIsValidated(false);
        } else {
            setIsValidated(true);
        }
    }, [
        formatTypes,
        sketchbookInfos,
        selectedSpiralColor,
        selectedElasticColor,
        selectedSketchFinish,
        checkedBoxes,
    ]);

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

    function handleModalInfos() {
        displayModal === 'none'
            ? setDisplayModal('flex')
            : setDisplayModal('none');
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
    }, [currentStep]);

    function updateStepIndicator(currentStep) {
        // retira a cor de ativo de todos pra garantir
        document.querySelectorAll('.stepTitle').forEach(function (step) {
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
        document.querySelectorAll('.steps').forEach(function (step) {
            // esconde todas as outras divs
            step.classList.add('hide');
        });

        // mostra somente a div atual
        document.querySelector(`.step${currentStep}`).classList.remove('hide');

        // move a tela para cima para ficar melhor a percepcao do passo a passo
        if (currentStep !== 1) {
            window.scrollTo({
                top:
                    352 +
                    document.querySelector('.iframe-container').clientHeight,
                left: 0,
            });
        }
    }

    return (
        <main id='MainSketchbook'>
            <div
                style={{ display: displayModal }}
                role='dialog'
                className='divModal'
            >
                <div id='facheiroVersion' className='modalContent'>
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
            </div>

            <Header />

            <section id='CreateSketchbookSection'>
                <div
                    className='iframe-container'
                    style={{ marginBottom: '1rem' }}
                >
                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/ppkIPwJje4c'
                        title='YouTube video player'
                        frameborder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowfullscreen
                    ></iframe>
                </div>
                <div className='logoWrapper'>
                    <img src={logo} alt='logo' />
                </div>

                <div className='textIntro'>
                    <h1>Monte seu Facheiro</h1>
                    <h5>
                        Selecione as opções abaixo e monte seu cactus do seu
                        jeito
                    </h5>
                </div>

                <div id='steps-indicator'>
                    <div className='stepTitle title1 active-step'>
                        <h3>1: Tamanho</h3>
                    </div>
                    <div className='stepTitle title2'>
                        <h3>2: Papel do Miolo</h3>
                    </div>
                    <div className='stepTitle title3'>
                        <h3>3: Cor da Capa</h3>
                    </div>
                    <div className='stepTitle title4'>
                        <h3>4: Cor da Espiral</h3>
                    </div>
                    <div className='stepTitle title5'>
                        <h3>5: Cor do Elástico</h3>
                    </div>
                    <div className='stepTitle title6'>
                        <h3>6: Acabamento</h3>
                    </div>
                    <div className='stepTitle title7'>
                        <h3>7: Adicionais</h3>
                    </div>
                    <div className='stepTitle title8'>
                        <h3>Resumo do Pedido</h3>
                    </div>
                </div>

                <div className='steps step1 full '>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tamanho e Orientação</h2>
                        </div>
                        <img
                            src={TAMANHOS_E_ORIENTACOES}
                            alt='Demonstração dos tamanhos disponíveis, retangular do A4 ao A7 e quadrado sendo 10x10, 15x15 ou 21x21, e também das orientações, podendo ser retrato ou paisagem'
                        />
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

                            {values.formats?.map((format, index) => {
                                if (
                                    !format.types ||
                                    format.types.length === 0
                                ) {
                                    return null;
                                }
                                return (
                                    <option value={index} key={index}>
                                        {format.name}
                                    </option>
                                );
                            })}
                        </select>
                    </fieldset>
                </div>

                <div className='steps step2 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Papel do Miolo</h2>
                        </div>
                        <img
                            src={PAPEIS_DO_MIOLO}
                            alt='Imagem mostrando os diferentes tipos de papeis que podem ser selecionados no sketchbook'
                        />
                    </div>

                    <fieldset>
                        <label htmlFor='paper'>
                            Selecione o papel do miolo
                        </label>

                        <select
                            onChange={handleSelectedType}
                            className='paper'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Papel do miolo
                            </option>

                            {formatTypes.map((type, index) => {
                                return (
                                    <option value={index} key={index}>
                                        {type.name} - R$ {type.value}
                                    </option>
                                );
                            })}
                        </select>

                        <p>
                            Veja mais sobre a gramatura e quantidade de páginas
                            clicando <Link to='/gramaturas'>aqui</Link>
                        </p>
                    </fieldset>
                </div>

                <div className='steps step3 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Cor da capa</h2>
                        </div>

                        <p>
                            Selecione <strong>até duas</strong> cores. Arraste
                            para o lado para conferir todas as opções.{' '}
                            <button onClick={() => handleModalInfos()}>
                                Clique aqui para visualizar os modelos de capa
                            </button>
                        </p>
                        <p>
                            A <b>primeira</b> cor selecionada é referente à
                            parte maior (inferior) e a <b>segunda</b> é
                            referente à parte menor (superior). Não é possível
                            escolher dois tipos de tecido por capa, e se um
                            tecido for esolhido, ele <b>obrigatoriamente</b>{' '}
                            ficará na parte de baixo (maior).
                        </p>
                    </div>

                    <div className='sliderColors'>
                        <Slider {...settings}>
                            {/* Mostra todas as capas que nao sao ilustres, que sao deste modelo */}
                            {dataColors.map((item, index) =>
                                item.models?.includes('facheiro') &&
                                item.categories?.includes('cover') &&
                                !item.isIlustres ? (
                                    <div className='cardColor' key={index}>
                                        <label
                                            htmlFor={index}
                                            className='coverColorLabel'
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
                            {/* Mostra as capas ilustres ao final para deixar agrupadas, que sao deste modelo, e que estao disponiveis para o tamanho selecionado */}
                            {dataColors.map((item, index) =>
                                item.availableSizes && selectedPaperWidth ? (
                                    item.models?.includes('facheiro') &&
                                    item.categories?.includes('cover') &&
                                    item.availableSizes?.includes(
                                        selectedPaperWidth
                                    ) ? (
                                        <div className='cardColor' key={index}>
                                            <label
                                                htmlFor={index}
                                                className='coverColorLabel'
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
                                                <p>
                                                    <span
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    >
                                                        (+ R$
                                                        {item.aditionalPrice})
                                                    </span>{' '}
                                                    {item.colorName}
                                                </p>

                                                <input
                                                    type='checkbox'
                                                    value={index}
                                                    id={index}
                                                    onChange={(event) =>
                                                        checkColor(item, event)
                                                    }
                                                    style={{
                                                        accentColor:
                                                            item.colorCode,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                ) : null
                            )}
                        </Slider>
                    </div>
                </div>

                <div className='steps step4 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Cor do espiral</h2>
                        </div>
                        <img
                            src={COR_ESPIRAL}
                            alt='Imagem mostrando as cores da espiral, branco ou preto'
                        />
                        {preSelectedSpiralColor ? (
                            <p
                                style={{
                                    lineHeight: '2.5rem',
                                    marginTop: '2rem',
                                }}
                            >
                                A capa escolhida já possui a cor de espiral:
                                {'  '}
                                <span className='emphasisWarning'>
                                    {preSelectedSpiralColor}
                                </span>
                                {'  '}
                                pré-definida. Avance para a próxima etapa.
                            </p>
                        ) : null}
                    </div>

                    <fieldset style={{ display: displaySpiralColorSelection }}>
                        <label htmlFor='spiralColorSelect'>
                            Selecione a cor do espiral
                        </label>

                        <select
                            onChange={handleSelectedSpiralColor}
                            id='spiralColorSelect'
                            defaultValue='0'
                        >
                            <option value='0' disabled>
                                Cor do espiral
                            </option>
                            <option value='Preto'>Preto</option>
                            <option value='Branco'>Branco</option>
                        </select>
                    </fieldset>
                </div>

                <div className='steps step5 full hide'>
                    <section id='RadioSelectionColors'>
                        <div className='boxColor'>
                            <div className='textWrapper'>
                                <div className='textBackground'>
                                    <h2>Cor do elástico</h2>
                                </div>

                                {preSelectedElasticColor ? (
                                    <p
                                        style={{
                                            lineHeight: '2.5rem',
                                            marginTop: '2rem',
                                        }}
                                    >
                                        A capa escolhida já possui a cor do
                                        elástico:{'  '}
                                        <span className='emphasisWarning'>
                                            {preSelectedElasticColor.colorName}
                                        </span>
                                        {'  '}
                                        pré-definida. Avance para a próxima
                                        etapa.
                                    </p>
                                ) : (
                                    <p>
                                        Selecione <strong>uma</strong> cor
                                    </p>
                                )}
                            </div>

                            <div
                                className='elasticColorWrapper'
                                style={{
                                    display: displayElasticColorSelection,
                                }}
                            >
                                {dataColors.map((item, index) =>
                                    item.models?.includes('facheiro') &&
                                    item.categories?.includes('elastic') ? (
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

                <div className='steps step6 full hide'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Tipo de Acabamento</h2>
                        </div>
                        <img
                            src={ACABAMENTO}
                            alt='Demonstração do acabamento das bordas do sketchbook, podendo ser arredondado ou reto'
                        />
                    </div>

                    <fieldset>
                        <label htmlFor='paper'>
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

                <div className='steps step7 full hide adicionais-container'>
                    <div className='textWrapper'>
                        <div className='textBackground'>
                            <h2>Adicionais (Pronta Entrega)</h2>
                        </div>
                    </div>

                    <fieldset className='adicionais-fieldset'>
                        <label htmlFor='SketchFinish'>
                            Gostaria de adicionar um produto a pronta entrega ao
                            seu pedido final?
                            <div className='skipStockProducts'>
                                <Link
                                    to='#stockProductsSection'
                                    onClick={(e) => handleNextStep()}
                                >
                                    Não quero adicionais
                                </Link>
                            </div>
                        </label>

                        {stockProducts.length > 0 ? (
                            <div
                                className='produtos-grid'
                                id='stockProductsSection'
                            >
                                {stockProducts
                                    // Filtra para exibir apenas produtos com estoque disponível
                                    .filter(
                                        (product) => Number(product.stock) > 0
                                    )
                                    .map((product) => {
                                        // Verifica se este produto específico está selecionado
                                        const isSelected =
                                            selectedStockProducts.some(
                                                (item) => item.id === product.id
                                            );

                                        return (
                                            <div
                                                key={product.id}
                                                className={`produto-card ${
                                                    isSelected ? 'selected' : ''
                                                }`}
                                                onClick={() =>
                                                    toggleStockProduct(product)
                                                }
                                            >
                                                {/* Imagem do Produto */}
                                                {product.productImage ? (
                                                    <img
                                                        src={
                                                            product.productImage
                                                        }
                                                        alt={
                                                            product.productName
                                                        }
                                                        className='produto-img'
                                                    />
                                                ) : (
                                                    <div className='produto-img-placeholder' />
                                                )}

                                                {/* Informações do Produto */}
                                                <div className='produto-info'>
                                                    <span className='produto-titulo'>
                                                        {product.productName}
                                                    </span>

                                                    {product.description && (
                                                        <span className='produto-desc'>
                                                            {
                                                                product.description
                                                            }
                                                        </span>
                                                    )}

                                                    <span className='produto-preco'>
                                                        R${' '}
                                                        {parseFloat(
                                                            product.value || 0
                                                        ).toLocaleString(
                                                            'pt-BR',
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Botão de Adicionar / Removido */}
                                                <button
                                                    type='button'
                                                    className={`btn-add ${
                                                        isSelected
                                                            ? 'btn-remove'
                                                            : ''
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Evita disparar dois cliques
                                                        toggleStockProduct(
                                                            product
                                                        );
                                                    }}
                                                >
                                                    {isSelected ? '✓' : '+'}
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        ) : (
                            <p className='loading-text'>
                                Carregando produtos adicionais...
                            </p>
                        )}
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
                                        <strong>Tamanho do papel: </strong>
                                        {selectedPaperWidth}
                                    </li>
                                    <li>
                                        <strong>Papel do miolo: </strong>
                                        {sketchbookInfos.name}
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

                                    <li>
                                        <strong>Cor do espiral: </strong>
                                        {selectedSpiralColor}
                                    </li>
                                    <li>
                                        <strong>Cor do elástico: </strong>
                                        {selectedElasticColor.colorName}
                                    </li>
                                    <li>
                                        <strong>Tipo de Acabamento: </strong>
                                        {selectedSketchFinish}
                                    </li>

                                    {selectedStockProducts.length > 0 && (
                                        <li>
                                            <strong>
                                                Produtos a pronta entrega
                                                selecionado:{' '}
                                            </strong>

                                            <ul
                                                style={{
                                                    margin: '5px 0 0 15px',
                                                    padding: 0,
                                                }}
                                            >
                                                {selectedStockProducts.map(
                                                    (product) => (
                                                        <li key={product.id}>
                                                            {
                                                                product.productName
                                                            }{' '}
                                                            — R$ {product.value}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </li>
                                    )}
                                </ul>

                                <h3>
                                    Valor do sketchbook: R$ {getFinalValue()}
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
