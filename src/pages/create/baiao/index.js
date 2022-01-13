import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask';

import './style.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from '../../../images/cactopng2.png';

import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Baiao() {

    const [dataColors, setDataColors] = useState([])
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [selectedColors, setSelectedColors] = useState([])
    const [isValidated, setIsValidated] = useState(false)
    const [checkStatus, setCheckStatus] = useState(false)
    const [checkedBoxes, setCheckedBoxes] = useState(0)
    const [selectedPaperWidth, setSelectedPaperWidth] = useState('')
    const [selectedPaper, setSelectedPaper] = useState('')
    const [selectedLineColor, setSelectedLineColor] = useState('')
    const [selectedElasticColor, setSelectedElasticColor] = useState('')
    const [selectedPickup, setSelectedPickup] = useState('')
    const [transportData, setTransportData] = useState([]);
    const [customerCep, setCustomerCep] = useState('')
    const [redirect, setRedirect] = useState(useHistory());
    const [paidForm, setPaidForm] = useState(false)
    const [transportDataVerify, setTransportDataVerify] = useState(false)
    const [displayCepSearch, setDisplayCepSearch] = useState('none');
    const [displayTransport, setDisplayTransport] = useState('none');
    const [displayAddressForms, setDisplayAddressForms] = useState('none');
    const [selectedTransportData, setSelectedTransportData] = useState({});
    const [transportValue, setTransportValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [clientNote, setClientNote] = useState('');

    const [newDataReceiver, setNewDataReceiver] = useState({

        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverHouseNumber: '',
        receiverComplement: '',
        receiverDistrict: '',
        receiverCity: '',
        receiverCpf: '',

    })

    const settings = {

        className: "start",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,

    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);
        onAuthStateChanged()

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('colors/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataColors(temp)

            }

            else {

                console.log("No data available");

            }

        });

    }, []);

    function handleSelectedPaperWidth(event) {

        setSelectedPaperWidth(event.target.value)

    }

    function handleSelectedPaper(event) {

        setSelectedPaper(event.target.value)

    }

    function handleInputInfosChange(event) {

        const { name, value } = event.target

        setNewDataReceiver({

            ...newDataReceiver, [name]: value

        })

    }

    function handlePickupSelect(event) {

        const pickup = event.target.value

        setSelectedPickup(pickup)

        if (pickup === 'Frete por transportadora') {

            setDisplayCepSearch('flex');

        } else {

            setDisplayCepSearch('none');

        }

        if (pickup !== 'Retirada física') {

            setDisplayAddressForms('flex');

        } else {

            setDisplayAddressForms('none');
            setTransportDataVerify(true)

        }

    }

    function handleInputCep(event) {

        setCustomerCep(event.target.value)

    }

    const dataToSend = {
        "from": {
            "postal_code": "28909120"
        },
        "to": {
            "postal_code": customerCep
        },
        "package": {
            "height": 4,
            "width": 12,
            "length": 17,
            "weight": 0.3
        }
    }

    const calculaFrete = async () => {

        await fetch('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_BEARER_KEY} `,
                'User-Agent': 'Armazém teste higorb2000@gmail.com'
            },
            body: JSON.stringify(dataToSend)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setTransportData(data)
            setDisplayTransport('flex')
            console.log(data)
        }).catch(err => console.log(err))
    };

    function handleSelectedTransport(item, event) {

        setSelectedTransportData(event)
        console.log(event)

        setTransportValue(Number(event.custom_price))

        setFinalValue(totalValue + Number(event.custom_price))

    }


    function sendOrder() {

        if (userIsLogged) {

            // if (selectedPayment !== '' && pickupSelect !== '') {

            //     if (transportDataVerify === true) {

            const id = firebase.database().ref().child('posts').push().key
            const now = new Date()

            const dataToSend = {

                id: id,
                paperWidth: selectedPaperWidth,
                paper: selectedPaper,
                lineColor: selectedLineColor,
                elasticColor: selectedElasticColor,
                coverColors: selectedColors,
                pickupOption: selectedPickup,
                userName: newDataReceiver.receiverName,
                phoneNumber: newDataReceiver.receiverPhone,
                address: newDataReceiver.receiverAddress,
                houseNumber: newDataReceiver.receiverHouseNumber,
                complement: newDataReceiver.receiverComplement,
                district: newDataReceiver.receiverDistrict,
                city: newDataReceiver.receiverCity,
                cpf: newDataReceiver.receiverCpf,
                cepNumber: customerCep,
                clientNote: clientNote,

                // totalValue: finalValue.toFixed(2),
                // userName: newDataReceiver.receiverName,
                // phoneNumber: newDataReceiver.receiverPhone,
                // address: newDataReceiver.receiverAddress,
                // houseNumber: newDataReceiver.receiverHouseNumber,
                // complement: newDataReceiver.receiverComplement,
                // district: newDataReceiver.receiverDistrict,
                // city: newDataReceiver.receiverCity,
                // cpf: newDataReceiver.receiverCpf,
                // cepNumber: customerCep,
                // paymentType: selectedPayment,
                // clientNote: clientNote,
                // userEmail: dataAccount.email,
                // voucher: choosedVoucher,
                // pickupOption: pickupSelect,
                // paymentProof: '',
                // adminNote: '',
                // requestStatus: '',
                // selectedTransport: selectedTransportData.company.name,
                // dateToCompare: new Date().toDateString(),
                // date: `${now.getUTCDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`

            }

            firebase.database().ref('requests/' + id).set(dataToSend)
                .then(() => {
                    // setPurchasedProductData(dataToSend)
                })

            firebase.database().ref('reportsSales/' + id).set(dataToSend)
                .then(() => {
                    // setPurchasedProductData(dataToSend)
                    alert("Pedido finalizado com sucesso!.")
                })

            setPaidForm(true)

            //     } else alert('Você precisa preencher todos os campos!')

            // } else alert('Você precisa selecionar todos os campos!')

        }

        else {

            var confirm = window.confirm("Você precisa ter uma conta para finalizar um pedido!")

            if (confirm)
                redirect.push("/cadastro")

        }

        return 0;

    }

    const checkColor = (item, event) => {

        const isChecked = event.target.checked
        setCheckStatus(event.target.value)

        if (isChecked) {

            setSelectedColors([...selectedColors, {

                name: item.colorName,
                code: item.colorCode

            }])

            setCheckedBoxes(checkedBoxes + 1)

        } else {

            const color = item.colorName
            let index = selectedColors.findIndex((element) => element.name === color)

            if (index !== -1) {

                selectedColors.splice(index, 1)
                setCheckedBoxes(checkedBoxes - 1)

            }

        }

        console.log(selectedColors)

    }

    useEffect(() => {

        if (checkedBoxes > 2) {

            setIsValidated(false)

        } else {

            setIsValidated(true)

        }

        console.log('checkedBoxes', checkedBoxes)

    }, [checkedBoxes])

    function handleSelectedLineColor(item, event) {

        setSelectedLineColor(event)

    }

    function handleSelectedElasticColor(item, event) {

        setSelectedElasticColor(event)

    }

    function handleClientNote(event) {

        setClientNote(event.target.value)

    }

    return (

        <main>

            <Header />

            <section id="CreateSketchbookSection">

                <div className="logoWrapper">

                    <img src={logo} alt="logo" />

                </div>

                <div className="textIntro">

                    <h1>Monte seu Baião</h1>
                    <h5>Selecione as opções abaixo e monte seu cactus do seu jeito</h5>

                </div>

                <fieldset>

                    <label for="paperWidth">Selecione o tamanho do papel</label>

                    <select onChange={handleSelectedPaperWidth} className="paperWidth">

                        <option value="0" selected disabled>Tamanho do papel</option>
                        <option value="21x21">21x21</option>
                        <option value="15x15">15x15</option>
                        <option value="10x10">10x10</option>

                    </select>

                </fieldset>

                <fieldset>

                    <label for="paper">Selecione o papel do miolo</label>

                    <select onChange={handleSelectedPaper} className="paper">

                        <option value="0" selected disabled>Papel do miolo</option>
                        <option value="Pólen Bold 90g">Pólen Bold 90g</option>
                        <option value="Reciclado 120g">Reciclado 120g</option>
                        <option value="Kraft 140g">Kraft 140g</option>
                        <option value="Color preto 180g">Color preto 180g</option>
                        <option value="Canson 140g">Canson 140g</option>
                        <option value="Canson 200g">Canson 200g</option>
                        <option value="Canson Aquarela 300g">Canson Aquarela 300g</option>
                        <option value="Montval 300g">Montval 300g</option>

                    </select>

                </fieldset>

                

                <div className="textWrapper">

                    <div className="textBackground">

                        <h2>Cor da capa</h2>

                    </div>

                    <p>Selecione <strong>até duas</strong> cores</p>

                </div>

                <div className="sliderColors">

                    <Slider {...settings}>

                        {dataColors.map((item, index) => {

                            return (

                                <div className="cardColor">

                                    {item.image ? 
                                    
                                        (<div key={item.id} className="colorBox">

                                            <img src={item.image} alt="cor" />

                                        </div>)
                                    
                                    : 
                                    
                                        (<div key={item.id} style={{ backgroundColor: item.colorCode }} className="colorBox">

                                            <p>{item.colorCode}</p>

                                        </div>)
                                    
                                    }

                                    <div className="colorName">

                                        <p>{item.colorName}</p>

                                        <input
                                            type="checkbox"
                                            value={index}
                                            onChange={(event) => checkColor(item, event)}
                                        />

                                    </div>

                                </div>

                            )

                        })}

                    </Slider>

                </div>

                <section id="RadioSelectionColors">

                    <div className="boxColor">

                        <div className="textWrapper">

                            <div className="textBackground">

                                <h2>Cor da linha</h2>

                            </div>

                            <p>Selecione <strong>uma</strong> cor</p>

                        </div>

                        <div className="lineColorWrapper">

                            {dataColors.map((item, index) => {

                                return (

                                    <div className="colorWrapper">

                                    {item.image ? 
                                        
                                        (

                                            <div className="elasticColor">

                                                <img src={item.image} alt="cor do elástico" />

                                            </div>

                                        ) 
                                        
                                            : 
                                        
                                        (
                                        
                                            <div style={{ backgroundColor: item.colorCode }} className="elasticColor" />
                                            
                                        )
                                        
                                    }

                                        <input

                                            type="radio"
                                            onClick={(event) => handleSelectedLineColor(event, item, index)}
                                            name="selectedLineColor"
                                            key={item.id}
                                            value={item.name}
                                            className="checkbox"

                                        />

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    <div className="boxColor">

                        <div className="textWrapper">

                            <div className="textBackground">

                                <h2>Cor do elástico</h2>

                            </div>

                            <p>Selecione <strong>uma</strong> cor</p>

                        </div>

                        <div className="elasticColorWrapper">

                            {dataColors.map((item, index) => {

                                return (

                                    <div className="colorWrapper">

                                        {item.image ? 
                                        
                                            (

                                                <div className="elasticColor">

                                                    <img src={item.image} alt="cor do elástico" />

                                                </div>

                                            ) 
                                            
                                                : 
                                            
                                            (
                                            
                                                <div style={{ backgroundColor: item.colorCode }} className="elasticColor" />
                                                
                                            )
                                            
                                        }

                                        <input

                                            type="radio"
                                            onClick={(event) => handleSelectedElasticColor(event, item, index)}
                                            name="selectedElasticColor"
                                            key={item.id}
                                            value={item.name}

                                        />

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                </section>

                <div className="finishOrder">

                    <h2>Finalização do pedido</h2>

                    <select className="pickupSelect" onChange={handlePickupSelect} >

                        <option value=''>Selecione como deseja receber sua encomenda</option>
                        <option value='Entrega a domicílio'>Entrega a domicílio (Para toda São Luís - MA)</option>
                        <option value="Frete por transportadora" >Entrega por transportadora</option>
                        <option value="Impresso módico ou Carta registrada" >Impresso módico ou Carta registrada</option>
                        <option value="Retirada física" >Retirada física: Travessa da Lapa - 162 - Centro/Desterro (Próximo à sorveteria do Iguaíba)</option>

                    </select>

                    <span>
                        <strong>Observação: </strong>
                        As entregas por carta registrada e registro módico são formas de envio mais baratas, porém, o envio não é atualizado a todo momento (apenas quando é postado, chegou na sua cidade, saiu para entrega). O envio é feito pelos Correios com um valor fixo de R$ 15,00 para as regiões <strong>Norte e Nordeste</strong>, e R$ 20,00 para as regiões <strong>Sul, Sudeste e Centro-Oeste</strong>.
                    </span>

                    <label style={{ display: displayCepSearch }} for="cepNumber">Insira o CEP abaixo</label>
                    <InputMask id="CepNumber" name='cepNumber' type='text' mask="99999-999" maskChar="" style={{ display: displayCepSearch }} onChange={handleInputCep} placeholder="CEP" />

                    <button style={{ display: displayCepSearch }} onClick={() => { calculaFrete() }}>Calcular frete</button>

                    <div className="transportInfos" style={{ display: displayTransport }}>

                        <h1>Selecione a opção de envio abaixo</h1>

                        {transportData.map((item, index) => {

                            if (item.id === 1 || item.id === 2 || item.id === 3) {

                                if (!item.error) {

                                    return (

                                        <div className="optionsTransport">

                                            <div className="radioButton">

                                                <input onClick={(e) => handleSelectedTransport(e, item, index)} type="radio" name="selectedTransport" key={item.id} value={item.name} />

                                            </div>

                                            <div className="transportLogoWrapper">

                                                <img src={item.company.picture} alt={item.company.name} />

                                            </div>

                                            <div className="textTransportInfos">

                                                <span>{item.company.name} ({item.name})</span>
                                                <span><strong>R$ {item.custom_price}</strong></span>
                                                <span>Prazo de entrega: <strong>{item.custom_delivery_time} dias úteis</strong></span>

                                            </div>

                                        </div>

                                    )
                                }
                            }

                        })}

                    </div>

                    <div style={{ display: displayAddressForms }} className="transportDiv">

                        <h2>Insira os dados para entrega abaixo</h2>

                        <div className="userInfos">

                            <input name='receiverName' onChange={handleInputInfosChange} placeholder='Nome do destinatário' value={newDataReceiver.receiverName} />

                            {/* <input name='receiverPhone' onChange={handleInputInfosChange} placeholder='Telefone' value={newDataReceiver.receiverPhone} /> */}
                            <InputMask
                                id="receiverPhone"
                                name='receiverPhone'
                                type='text'
                                mask="(99) 99999-9999"
                                maskChar=""
                                onChange={handleInputInfosChange}
                                placeholder='Telefone'
                                value={newDataReceiver.receiverPhone}
                            />

                            <input name='receiverAddress' onChange={handleInputInfosChange} placeholder='Endereço de entrega' value={newDataReceiver.receiverAddress} />

                            <input name='receiverHouseNumber' onChange={handleInputInfosChange} placeholder='Número da residência' value={newDataReceiver.receiverHouseNumber} />

                            <input name='receiverComplement' onChange={handleInputInfosChange} placeholder='Complemento' value={newDataReceiver.receiverComplement} />

                            <input name='receiverDistrict' onChange={handleInputInfosChange} placeholder='Bairro' value={newDataReceiver.receiverDistrict} />

                            <input name='receiverCity' onChange={handleInputInfosChange} placeholder='Cidade' value={newDataReceiver.receiverCity} />

                            {/* <input name='receiverCpf' onChange={handleInputInfosChange} placeholder='CPF' value={newDataReceiver.receiverCpf} /> */}
                            <InputMask
                                id="receiverCpf"
                                name='receiverCpf'
                                type='text'
                                mask="999.999.999-99"
                                maskChar=""
                                onChange={handleInputInfosChange}
                                placeholder='CPF'
                                value={newDataReceiver.receiverCpf}
                            />

                        </div>

                    </div>

                    <label for="additionalInfos">Informações adicionais <strong>(opcional)</strong></label>

                    <textarea
                        type="text"
                        name="additionalInfos"
                        id="additionalInfos"
                        onChange={handleClientNote}
                    />

                    {isValidated ? (

                        <button onClick={() => sendOrder()}>Finalizar</button>

                    ) : (

                        <>

                            <button disabled>Finalizar</button>
                            <p>Você deve blabla</p>

                        </>

                    )}

                </div>

            </section>

            <Footer />

        </main>

    )

}