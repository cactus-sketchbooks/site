import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import InputMask from 'react-input-mask';

import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import mandacaru from '../../images/mandacaru.png'
import baiao from '../../images/baiao.png'
import facheiro from '../../images/facheiro.png'
import sertao from '../../images/sertao.png'
import buriti from '../../images/buriti-kindle.png'
import carcara from '../../images/carcara.jpg'

import produto1 from '../../images/products1.png'
import produto2 from '../../images/products2.png'
import produto3 from '../../images/products3.png'
import produto4 from '../../images/products4.png'

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../FirebaseConfig.js'

export default function Cart() {

    const [data, setData] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccount, setDataAccount] = useState([]);
    const [dataExists, setDataExists] = useState(false);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [transportData, setTransportData] = useState([]);
    const [customerCep, setCustomerCep] = useState('');
    const [redirect, setRedirect] = useState(useHistory());
    const [paidForm, setPaidForm] = useState(false);
    const [transportDataVerify, setTransportDataVerify] = useState(false);
    const [displayCepSearch, setDisplayCepSearch] = useState('none');
    const [displayAddressForms, setDisplayAddressForms] = useState('none');
    const [selectedTransportData, setSelectedTransportData] = useState({});
    const [transportValue, setTransportValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [pickupSelect, setPickupSelect] = useState('');
    const [displayPopup, setDisplayPopup] = useState('none');
    const [displayPaymentOption, setDisplayPaymentOption] = useState('none');
    const [displayFinishButton, setDisplayFinishButton] = useState('none');
    const [purchasedProductData, setPurchasedProductData] = useState({})

    const [newDataReceiver, setNewDataReceiver] = useState({

        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverHouseNumber: '',
        receiverComplement: '',
        receiverDistrict: '',
        receiverCity: '',
        receiverCpf: '',
        receiverCep: '',

    })

    const images = [

        {
            name: 'Mandacaru',
            image: mandacaru,

        },
        {
            name: 'Buriti',
            image: buriti,

        },
        {
            name: 'Sertão',
            image: sertao,

        },
        {
            name: 'Baião',
            image: baiao,

        },
        {
            name: 'Facheiro',
            image: facheiro,

        },
        {
            name: 'Carcará',
            image: carcara,

        },

    ]

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

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))

        if (verify !== null) {

            var temp = Object.keys(verify).map((key) => verify[key])

            setData(temp)
            setDataExists(true)
            // setDisplayButtonClear('block')

            var total = 0

            temp.map((item) => {

                var value = (Number(item.value))
                total = value + total

                setTotalValue(total)
                setFinalValue(total)

            })

        } else {

            setDataExists(false)

        }


    }, [])

    function removeItemInCart(index) {

        var confirm = window.confirm('Tem certeza que deseja remover este item ?')

        if (confirm) {

            data.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(data))
            window.location.reload()

        }

    }

    function handleInputInfosChange(event) {

        const { name, value } = event.target

        setNewDataReceiver({

            ...newDataReceiver, [name]: value

        })

    }

    function handlePickupSelect(event) {

        const pickup = event.target.value

        setPickupSelect(pickup)

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

    function handleSelectPayment(event) {

        let payment = event.target.value

        setSelectedPayment(payment)

        if (payment === 'Pix') {

            setDisplayPopup('flex')
            setDisplayFinishButton('flex')

        } else {

            setDisplayPopup('none')

        }

    }

    useEffect(() => {

        let counter = 0

        newDataReceiver.receiverName != '' ? counter = counter + 1 : counter = counter
        newDataReceiver.receiverPhone != '' ? counter++ : counter = counter
        newDataReceiver.receiverAddress != '' ? counter++ : counter = counter
        newDataReceiver.receiverHouseNumber != '' ? counter++ : counter = counter
        newDataReceiver.receiverComplement != '' ? counter++ : counter = counter
        newDataReceiver.receiverDistrict != '' ? counter++ : counter = counter
        newDataReceiver.receiverCity != '' ? counter++ : counter = counter

        if (pickupSelect === 'Frete por transportadora') {

            newDataReceiver.receiverCpf != '' ? counter++ : counter = counter

        } else {

            newDataReceiver.receiverCep != '' ? counter++ : counter = counter

        }

        if ((counter == 8 && pickupSelect) || pickupSelect === 'Retirada física') {

            setDisplayPaymentOption('flex')

        } else {

            setDisplayPaymentOption('none')

        }

    }, [newDataReceiver, pickupSelect])

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
            console.log(data)
        }).catch(err => console.log(err))
    };

    function handleSelectedTransport(item, event) {

        setSelectedTransportData(event)
        console.log(event)

        setTransportValue(Number(event.custom_price))

        setFinalValue(totalValue + Number(event.custom_price))

    }

    let paypalRef = useRef();

    useEffect(() => {

        const script = document.createElement("script");
        // script.src = "https://www.paypal.com/sdk/js?client-id=AVdZOvhSTEekVtepWxObjC6L1Yrm8ng37lrDLna1AbkBBZej8x3KQEiLfZyUhOJ1aqtG0mnddL63lDQX&currency=BRL"
        script.src = "https://www.paypal.com/sdk/js?client-id=AZAsiBXlnYmk2HXDpGkZgYx7zWvFpak2iKq473EPHi9LrnM2lAbAHIzVaxns_-jmD34dYqpuTSaRFWy0&currency=BRL"
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);

        if (loaded) {

            if (selectedPayment === 'PayPal' || selectedPayment === 'Cartão') {

                setTimeout(() => {

                    window.paypal
                        .Buttons({

                            createOrder: (data, actions) => {

                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            // description: product.description,
                                            amount: {
                                                currency_code: "BRL",
                                                value: finalValue.toFixed(2)
                                            }
                                        }
                                    ]
                                })
                            },
                            onApprove: async (data, actions) => {

                                const order = await actions.order.capture();
                                sendOrder();
                                setPaidForm(true)

                            },

                        })
                        .render(paypalRef)
                }, 100)

            }

        }
    })

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    setDataUsers(temp)

                    temp.map((item) => {

                        if (item.email === userEmail) {
                            setDataAccount(item)
                        }

                    })

                } else
                    console.log("No data available");

            })

    }, []);

    function sendOrder() {

        if (userIsLogged) {

            if (selectedPayment !== '' && pickupSelect !== 'Retirada física') {

                const id = firebase.database().ref().child('posts').push().key
                const now = new Date()

                const dataToSend = {

                    id: id,
                    products: data,
                    pickupOption: pickupSelect,
                    payment: selectedPayment,
                    selectedTransport: selectedTransportData,
                    userEmail: dataAccount.email,
                    cepNumber: customerCep,
                    userName: newDataReceiver.receiverName ? newDataReceiver.receiverName : dataAccount.name,
                    phoneNumber: newDataReceiver.receiverPhone ? newDataReceiver.receiverPhone : dataAccount.phoneNumber,
                    address: newDataReceiver.receiverAddress ? newDataReceiver.receiverAddress : dataAccount.address,
                    houseNumber: newDataReceiver.receiverHouseNumber ? newDataReceiver.receiverHouseNumber : dataAccount.houseNumber,
                    complement: newDataReceiver.receiverComplement ? newDataReceiver.receiverComplement : dataAccount.complement,
                    district: newDataReceiver.receiverDistrict ? newDataReceiver.receiverDistrict : dataAccount.district,
                    city: newDataReceiver.receiverCity ? newDataReceiver.receiverCity : dataAccount.city,
                    cpf: newDataReceiver.receiverCpf ? newDataReceiver.receiverCpf : '',
                    cep: newDataReceiver.receiverCep ? newDataReceiver.receiverCep : '',
                    paymentProof: '',
                    adminNote: '',
                    requestStatus: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    totalValue: finalValue.toFixed(2),

                }

                firebase.database().ref('requests/' + id).set(dataToSend)
                    .then(() => {
                        setPurchasedProductData(dataToSend)
                    })

                firebase.database().ref('reportsSales/' + id).set(dataToSend)
                    .then(() => {
                        localStorage.setItem('products', '{}')
                        alert("Pedido finalizado com sucesso!")
                        window.location.reload()
                    })

                setPaidForm(true)

            } else {

                const id = firebase.database().ref().child('posts').push().key
                const now = new Date()

                const dataToSend = {

                    id: id,
                    products: data,
                    pickupOption: pickupSelect,
                    payment: selectedPayment,
                    userEmail: dataAccount.email,
                    userName: dataAccount.name,
                    phoneNumber: dataAccount.phoneNumber,
                    paymentProof: '',
                    adminNote: '',
                    requestStatus: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    totalValue: finalValue.toFixed(2),

                }

                firebase.database().ref('requests/' + id).set(dataToSend)
                    .then(() => {
                        setPurchasedProductData(dataToSend)
                    })

                firebase.database().ref('reportsSales/' + id).set(dataToSend)
                    .then(() => {
                        localStorage.setItem('products', '{}')
                        alert("Pedido finalizado com sucesso!")
                        window.location.reload()
                    })

                setPaidForm(true)

            }

        }

        else {

            var confirm = window.confirm("Você precisa ter uma conta para finalizar um pedido!")

            if (confirm)
                redirect.push("/cadastro")

        }

        return 0;

    }

    return (

        <div>

            <Header />

            <div id="cart">

                {data ? (

                    <section id="purchaseInfo">

                        <h2>Seu carrinho</h2>

                        <section className="productsInfo">

                            {data.map((product, index) => {

                                return (

                                    <div className="productDetails">

                                        {images.map((sketchbook) => (

                                            <div>

                                                {sketchbook.name === product.model ? (

                                                    <img src={sketchbook.image} alt="Modelo" />

                                                ) : (

                                                    ''

                                                )}

                                            </div>

                                        ))}

                                        <ul>

                                            <li><strong>Modelo:</strong> {product.model}</li>
                                            {product.kindleModel ? (

                                                <li><strong>Kindle:</strong> {product.kindleModel}</li>

                                            ) : ('')}

                                            {product.paperWidth ? (

                                                <li><strong>Tamanho:</strong> {product.paperWidth}</li>

                                            ) : ('')}

                                            {product.paper ? (

                                                <li><strong>Papel do miolo:</strong> {product.paper}</li>

                                            ) : ('')}

                                            <li id="coverColor">

                                                <strong>Cor da capa: </strong>
                                                {product.coverColors.map((color, index) => {

                                                    return (

                                                        <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                                    )

                                                })}

                                            </li>

                                            <li><strong>Cor do elástico:</strong> {product.elasticColor.colorName}</li>

                                            {product.lineColor ? (

                                                <li><strong>Cor da linha:</strong> {product.lineColor.colorName}</li>

                                            ) : ('')}

                                            {product.spiralColor ? (

                                                <li><strong>Cor do espiral:</strong> {product.spiralColor}</li>

                                            ) : ('')}

                                            {product.clientNote ? (

                                                <li><strong>Observações:</strong> {product.clientNote}</li>


                                            ) : (

                                                ''

                                            )}

                                        </ul>

                                        <div className="productsButtons">
                                            {/* <button>Adicionar observação</button> */}
                                            <h1>R$ {product.value.toFixed(2)}</h1>
                                            <button onClick={() => { removeItemInCart(index) }}>Excluir</button>
                                        </div>

                                    </div>

                                )

                            })}

                        </section>

                        <section className="checkout">

                            <div className="finishOrder">

                                <h2>Finalização do pedido</h2>

                                <select className="pickupSelect" onChange={handlePickupSelect} >

                                    <option disabled selected value=''>Selecione como deseja receber sua encomenda</option>
                                    <option value='Entrega a domicílio'>Entrega a domicílio (Para toda São Luís - MA)</option>
                                    <option value="Frete por transportadora" >Entrega por transportadora</option>
                                    <option value="Impresso módico ou Carta registrada" >Impresso módico ou Carta registrada</option>
                                    <option value="Retirada física" >Retirada física: Travessa da Lapa - 162 - Centro/Desterro</option>

                                </select>

                                <span>
                                    <strong>Observação: </strong>
                                    As entregas por carta registrada e registro módico são formas de envio mais baratas, porém, o envio não é atualizado a todo momento (apenas quando é postado, chegou na sua cidade, saiu para entrega). O envio é feito pelos Correios com um valor fixo de R$ 15,00 para as regiões <strong>Norte e Nordeste</strong>, e R$ 20,00 para as regiões <strong>Sul, Sudeste e Centro-Oeste</strong>.
                                </span>

                                <label style={{ display: displayCepSearch }} for="cepNumber">Insira o CEP abaixo</label>
                                <InputMask id="CepNumber" name='cepNumber' type='text' mask="99999-999" maskChar="" style={{ display: displayCepSearch }} onChange={handleInputCep} placeholder="CEP" />

                                <button style={{ display: displayCepSearch }} onClick={() => { calculaFrete() }}>Calcular frete</button>

                                <div className="transportInfos" style={{ display: displayCepSearch }}>

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

                                        {pickupSelect === 'Frete por transportadora' ? (

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

                                        ) : (

                                            <InputMask
                                                id="receiverCep"
                                                name='receiverCep'
                                                type='text'
                                                mask="99999-999"
                                                maskChar=""
                                                onChange={handleInputInfosChange}
                                                placeholder='CEP'
                                                value={newDataReceiver.receiverCep}
                                            />

                                        )}

                                    </div>

                                </div>

                                <select style={{ display: displayPaymentOption }} className="paymentSelect" onChange={handleSelectPayment} >

                                    <option selected disabled value=''>Selecione o tipo de pagamento</option>
                                    <option value="PayPal" >PayPal </option>
                                    <option value="Cartão" >Cartão </option>
                                    <option value="Pix" >Pix</option>

                                </select>

                                <div className="paypalButtons" ref={v => (paypalRef = v)} />

                                <div className="checkoutOptions">

                                    <a href="/">Continuar comprando...</a>
                                    <h3>Preço: R$ {finalValue.toFixed(2)}</h3>
                                    <button style={{ display: displayFinishButton }} onClick={sendOrder}>Concluir compra!</button>

                                </div>

                            </div>

                        </section>

                        <h2>Confira as artes de nossos clientes</h2>
                        <section className="ourClients">
                            <img src={produto1} alt="" />
                            <img src={produto2} alt="" />
                            <img src={produto3} alt="" />
                            <img src={produto4} alt="" />
                        </section>

                        <section className="ourServices">
                            <h1>Os cactus mais vendidos!</h1>

                            <div className="service-card">
                                <h3>mandacaru</h3>
                                <h4>Sketchbook costura copta</h4>
                                <img src={mandacaru} alt="Mandacaru" />
                            </div>

                            <div className="service-card">
                                <h3>baião</h3>
                                <h4>Sketchbook quadrado copta</h4>
                                <img src={baiao} alt="Baião" />
                            </div>

                            <div className="service-card">
                                <h3>facheiro</h3>
                                <h4>Sketchbook espiral</h4>
                                <img src={facheiro} alt="Facheiro" />
                            </div>

                        </section>
                    </section >

                )
                    : (
                        <section className="emptyCart">
                            <h3>Opa.. parece que seu carrinho está vazio! Bora fazer arte?</h3>
                            <a href="/">Bora!</a>
                        </section>
                    )}

            </div>

            <Footer />

        </div>
    )
}