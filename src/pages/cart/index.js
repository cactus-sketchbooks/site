import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

import './style.scss';
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';

import mandacaru from '../../images/mandacaru.png';
import baiao from '../../images/baiao.png';
import facheiro from '../../images/facheiro.png';
import sertao from '../../images/sertao.png';
import buriti from '../../images/buriti-kindle.png';
import carcara from '../../images/carcara.jpg';

import produto1 from '../../images/products1.png';
import produto2 from '../../images/products2.png';
import produto3 from '../../images/products3.png';
import produto4 from '../../images/products4.png';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../FirebaseConfig.js';

export default function Cart() {
    const [data, setData] = useState([]);
    const [dataProduct, setDataProduct] = useState({});
    const [dataAccount, setDataAccount] = useState([]);
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [userVoucher, setUserVoucher] = useState('');
    const [aplliedVoucher, setAplliedVoucher] = useState('None');
    const [aplliedDiscount, setAplliedDiscount] = useState(0);
    const [transportData, setTransportData] = useState([]);
    const [customerCep, setCustomerCep] = useState('');
    const [redirect, setRedirect] = useState(useHistory());
    const [paidForm, setPaidForm] = useState(false);
    const [displayDiscountValues, setDisplayDiscountValues] = useState('none');
    const [displayCepSearch, setDisplayCepSearch] = useState('none');
    const [displayAddressForms, setDisplayAddressForms] = useState('none');
    const [selectedTransportData, setSelectedTransportData] = useState({});
    const [transportValue, setTransportValue] = useState(0);
    const [economicTransportValue, setEconomicTransportValue] = useState(0);
    const [productsSum, setProductsSum] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [pickupSelect, setPickupSelect] = useState('0');
    const [displayPopup, setDisplayPopup] = useState('none');
    const [displayPaymentOption, setDisplayPaymentOption] = useState('none');
    const [displayFinishButton, setDisplayFinishButton] = useState('none');
    const [purchasedProductData, setPurchasedProductData] = useState({});
    const [selectedState, setSelectedState] = useState({});

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
    });

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
    ];

    const states = [
        { uf: 'AC', value: 15 },
        { uf: 'AL', value: 15 },
        { uf: 'AP', value: 15 },
        { uf: 'AM', value: 15 },
        { uf: 'BA', value: 15 },
        { uf: 'CE', value: 15 },
        { uf: 'DF', value: 20 },
        { uf: 'ES', value: 20 },
        { uf: 'GO', value: 20 },
        { uf: 'MA', value: 15 },
        { uf: 'MS', value: 20 },
        { uf: 'MT', value: 20 },
        { uf: 'MG', value: 20 },
        { uf: 'PA', value: 15 },
        { uf: 'PB', value: 15 },
        { uf: 'PR', value: 20 },
        { uf: 'PE', value: 15 },
        { uf: 'PI', value: 15 },
        { uf: 'RJ', value: 20 },
        { uf: 'RN', value: 15 },
        { uf: 'RS', value: 20 },
        { uf: 'RO', value: 15 },
        { uf: 'RR', value: 15 },
        { uf: 'SC', value: 20 },
        { uf: 'SP', value: 20 },
        { uf: 'SE', value: 15 },
        { uf: 'TO', value: 15 },
    ];

    //verifica se o usuário tá logado
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

    //pega as informações dos produtos no localstorage
    useEffect(async () => {
        const verify = await JSON.parse(localStorage.getItem('products'));

        //se existe produto no localstorage
        if (verify !== null) {
            var temp = Object.keys(verify).map((key) => verify[key]);

            setData(temp);
            let aux = [];

            var total = 0;

            temp.map((item) => {
                var value = Number(item.value);
                total = value + total;

                //cria um objeto com as informações de tamanho e peso dos produtos
                const productInfos = {
                    id: item.id,
                    width: item.size.width,
                    height: item.size.height,
                    length: item.size.length,
                    weight: item.size.weight,
                    insurance_value: item.value,
                    quantity: 1,
                };

                aux.push(productInfos); //passa as informações do produto no map para o array
                setProductsSum(total); // valor total antes do desconto ser aplicado
                setTotalValue(total); //valor total dos produtos (este sera modificado caso haja desconto)
                setFinalValue(total); //valor total (produtos + frete, etc)
            });

            setDataProduct(aux);
        }
    }, []);

    // pega os cupons disponiveis
    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('vouchers/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setAvailableVouchers(
                    temp.sort((a, b) => {
                        return a.title > b.title
                            ? 1
                            : b.title > a.title
                            ? -1
                            : 0;
                    })
                );
            } else {
                console.log('No data available');
            }
        });
    }, []);

    //remove o produto do carrinho
    function removeItemInCart(index) {
        var confirm = window.confirm(
            'Tem certeza que deseja remover este item ?'
        );

        if (confirm) {
            data.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(data));
            window.location.reload();
        }
    }

    //função para receber o cupom digitado
    function handleUserVoucher(event) {
        setUserVoucher(event.target.value);
    }

    //funcão que confere a validade e aplica o cupom de desconto
    function redeemVoucher() {
        let isVoucherOk = false;

        //Pega a data de hoje e formata para o mesmo formato da data do cupom cadastrado
        let dataAtual = new Date().toISOString().slice(0, 10);
        const StateSelector = document.querySelector('.StateSelect');
        const pickupSelector = document.querySelector('.pickupSelect');

        availableVouchers.map((item) => {
            if (userVoucher === item.voucherCode) {
                //checa se a data de hoje está entre as datas de inicio e fim de validade do cupom, se nenhum cupom ja foi aplicado, e se o valor
                // do pedido é maior que o minimo permitido pelo cupom
                if (
                    dataAtual <= item.endDate &&
                    dataAtual >= item.beginDate &&
                    aplliedVoucher === 'None' &&
                    totalValue >= item.minOrderValue
                ) {
                    isVoucherOk = true;

                    setTotalValue(
                        totalValue - totalValue * (item.discountPercent / 100)
                    );
                    setAplliedVoucher(userVoucher);
                    setAplliedDiscount(
                        totalValue * (item.discountPercent / 100)
                    );
                    setDisplayDiscountValues('flex');

                    window.alert('Cupom inserido com sucesso!');
                }
            }
        });

        if (isVoucherOk === false) {
            window.alert(
                'O cupom inserido é inválido ou não está mais disponível'
            );
        }
    }

    //função para receber os dados nos inputs de informações (endereço, cidade, estado, etc)
    function handleInputInfosChange(event) {
        const { name, value } = event.target;

        setNewDataReceiver({
            ...newDataReceiver,
            [name]: value,
        });
    }

    //função para selecionar o tipo de entrega
    function handlePickupSelect(event) {
        const pickup = event.target.value;

        setPickupSelect(pickup);

        //mudança dos display de flex e none dependendo da opção de entrega para pegar os dados necessários
        if (pickup === 'Frete por transportadora') {
            setDisplayCepSearch('flex');
            setFinalValue(totalValue + transportValue);
        } else if (pickup === 'Impresso módico ou Carta registrada') {
            setDisplayCepSearch('none');
            setFinalValue(totalValue + economicTransportValue);
        } else {
            setDisplayCepSearch('none');

            setFinalValue(totalValue);

            // if (transportValue !== 0 || economicTransportValue !== 0) {
            //     setFinalValue(totalValue);
            // }
        }

        if (
            pickup === 'Retirada física' ||
            pickup === 'Entrega por aplicativo'
        ) {
            setDisplayAddressForms('none');
        } else {
            setDisplayAddressForms('flex');
        }
    }

    //função para selecionar o tipo de pagamento
    function handleSelectPayment(event) {
        let payment = event.target.value;

        setSelectedPayment(payment);

        //mudança do display do popup dependendo do pagamento
        if (payment === 'Pix') {
            setDisplayPopup('flex');
            setDisplayFinishButton('flex');
        } else {
            setDisplayPopup('none');
            setDisplayFinishButton('none');
        }
    }

    function closePopup() {
        setDisplayPopup('none');
    }

    //validação para verificar se tudo foi preenchido corretamente
    useEffect(() => {
        let counter = 0;

        newDataReceiver.receiverName !== ''
            ? (counter = counter + 1)
            : (counter = counter);
        newDataReceiver.receiverPhone !== '' ? counter++ : (counter = counter);
        newDataReceiver.receiverAddress !== ''
            ? counter++
            : (counter = counter);
        newDataReceiver.receiverHouseNumber !== ''
            ? counter++
            : (counter = counter);
        newDataReceiver.receiverComplement !== ''
            ? counter++
            : (counter = counter);
        newDataReceiver.receiverDistrict !== ''
            ? counter++
            : (counter = counter);
        newDataReceiver.receiverCity !== '' ? counter++ : (counter = counter);
        selectedState !== '' ? counter++ : (counter = counter);

        if (pickupSelect === 'Frete por transportadora') {
            newDataReceiver.receiverCpf !== ''
                ? counter++
                : (counter = counter);
        } else {
            newDataReceiver.receiverCep !== ''
                ? counter++
                : (counter = counter);
        }

        if (
            (counter === 9 && pickupSelect) ||
            pickupSelect === 'Retirada física' ||
            pickupSelect === 'Entrega por aplicativo'
        ) {
            setDisplayPaymentOption('flex');
        } else {
            setDisplayPaymentOption('none');
        }
    }, [newDataReceiver, pickupSelect]);

    //função para pegar o cep para calculo de frete
    function handleInputCep(event) {
        setCustomerCep(event.target.value);
    }

    //informações necessárias para a api do melhor envio
    const dataToSend = {
        from: {
            postal_code: '65010330',
        },
        to: {
            postal_code: customerCep,
        },
        products: dataProduct,
        services: '1,2',
    };

    //api do melhor envio para calculo de frete
    const calculaFrete = async () => {
        await fetch('https://melhorenvio.com.br/api/v2/me/shipment/calculate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY} `,
                'User-Agent': 'Cactus Sketchbooks cactussketchs@gmail.com',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTransportData(data);
            })
            .catch((err) => console.log(err));
    };

    //seleciona a transportadora escolhida
    function handleSelectedTransport(item, event) {
        setSelectedTransportData(event);

        setTransportValue(Number(event.custom_price));

        setFinalValue(totalValue + Number(event.custom_price));
    }

    //escolhe o estado. dependendo do estado o frete por impresso modico e carta tem valor de 15 ou 20
    function handleSelectedState(event) {
        setSelectedState(states[event.target.value]);
        setEconomicTransportValue(states[event.target.value].value); //valor do frete (15 ou 20)
        setFinalValue(totalValue + states[event.target.value].value);
    }

    let paypalRef = useRef();

    //api de pagamento do paypal
    useEffect(() => {
        const script = document.createElement('script');
        // script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_DEVELOPMENT_ID}`
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_PRODUCTION_ID}`; //produção
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);

        if (loaded) {
            if (selectedPayment === 'PayPal' || selectedPayment === 'Cartão') {
                setTimeout(() => {
                    window.paypal
                        .Buttons({
                            onClick: function () {
                                sendOrderPaypal();
                            },

                            createOrder: (data, actions, err) => {
                                return actions.order.create({
                                    intent: 'CAPTURE',
                                    purchase_units: [
                                        {
                                            description: 'Sketchbook',
                                            amount: {
                                                currency_code: 'BRL',
                                                value: finalValue.toFixed(2),
                                            },
                                        },
                                    ],
                                });
                            },
                            onApprove: async (data, actions) => {
                                const order = await actions.order.capture(); //apesar de não estar sendo usado, NÃO REMOVA
                                // sendOrder();
                                // setPaidForm(true)
                                // window.scrollTo(0, 0);
                                redirect.push('/meusPedidos');
                            },
                            onError: (err) => {
                                if (err) {
                                    window.alert(
                                        'Ocorreu um erro com o seu pagamento. Tente novamente'
                                    );
                                    console.log('Erro: ' + err);
                                }
                            },
                        })
                        .render(paypalRef);
                }, 100);
            }
        }
    });

    //pega as informações de email e compara com o email do banco de dados, se for igual, pega as informações dele
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');

        firebase
            .database()
            .ref('users/')
            .get('/users')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);

                    temp.map((item) => {
                        if (item.email === userEmail) {
                            setDataAccount(item);
                        }
                    });
                } else console.log('No data available');
            });
    }, []);

    //função para enviar o pedido
    function sendOrder() {
        if (userIsLogged) {
            if (selectedPayment !== '' && pickupSelect !== 'Retirada física') {
                const id = firebase.database().ref().child('posts').push().key; //cria uma id para o pedido
                const now = new Date(); //data atual

                //informações da compra
                const dataToSend = {
                    id: id,
                    products: data,
                    pickupOption: pickupSelect,
                    payment: selectedPayment,
                    selectedTransport: selectedTransportData,
                    userEmail: dataAccount.email,
                    cepNumber: customerCep,
                    userName: newDataReceiver.receiverName
                        ? newDataReceiver.receiverName
                        : dataAccount.name,
                    phoneNumber: newDataReceiver.receiverPhone
                        ? newDataReceiver.receiverPhone
                        : dataAccount.phoneNumber,
                    address: newDataReceiver.receiverAddress
                        ? newDataReceiver.receiverAddress
                        : dataAccount.address,
                    houseNumber: newDataReceiver.receiverHouseNumber
                        ? newDataReceiver.receiverHouseNumber
                        : dataAccount.houseNumber,
                    complement: newDataReceiver.receiverComplement
                        ? newDataReceiver.receiverComplement
                        : dataAccount.complement,
                    district: newDataReceiver.receiverDistrict
                        ? newDataReceiver.receiverDistrict
                        : dataAccount.district,
                    city: newDataReceiver.receiverCity
                        ? newDataReceiver.receiverCity
                        : dataAccount.city,
                    state: selectedState ? selectedState : '',
                    cpf: newDataReceiver.receiverCpf
                        ? newDataReceiver.receiverCpf
                        : '',
                    cep: newDataReceiver.receiverCep
                        ? newDataReceiver.receiverCep
                        : '',
                    economicTransportValue: economicTransportValue
                        ? economicTransportValue
                        : '',
                    paymentProof: '',
                    adminNote: '',
                    aplliedVoucher: aplliedVoucher,
                    requestStatus: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${
                        now.getMonth() + 1
                    }/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    timestamp: now.getTime(),
                    totalValue: finalValue.toFixed(2),
                };

                //são dois locais onde os pedidos são salvos: para cactus e usuarios.

                //envia para a cactus
                firebase
                    .database()
                    .ref('requests/' + id)
                    .set(dataToSend)
                    .then(() => {
                        setPurchasedProductData(dataToSend);
                    });

                //envia para o usuário
                firebase
                    .database()
                    .ref('reportsSales/' + id)
                    .set(dataToSend)
                    .then(() => {
                        localStorage.setItem('products', '{}');
                        alert('Pedido finalizado com sucesso!');
                    });

                setPaidForm(true);
                window.scrollTo(0, 0);
            } else {
                const id = firebase.database().ref().child('posts').push().key;
                const now = new Date();

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
                    aplliedVoucher: aplliedVoucher,
                    requestStatus: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${
                        now.getMonth() + 1
                    }/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    timestamp: now.getTime(),
                    totalValue: finalValue.toFixed(2),
                };

                firebase
                    .database()
                    .ref('requests/' + id)
                    .set(dataToSend)
                    .then(() => {
                        setPurchasedProductData(dataToSend);
                    });

                firebase
                    .database()
                    .ref('reportsSales/' + id)
                    .set(dataToSend)
                    .then(() => {
                        localStorage.setItem('products', '{}');
                        alert('Pedido finalizado com sucesso!');
                    });

                setPaidForm(true); //muda para tela de pagamento.
                window.scrollTo(0, 0);
            }
        } else {
            var confirm = window.confirm(
                'Você precisa ter uma conta para finalizar um pedido!'
            );

            if (confirm) redirect.push('/cadastro');
        }

        return 0;
    }

    //envia o pedido ao clicar no botão do paypal. como a compra é feita em uma nova aba (pelo celular), o pedido é enviado antes da pessoa pagar (na hora em que clica o botão)
    function sendOrderPaypal() {
        if (userIsLogged) {
            if (pickupSelect === 'Retirada física') {
                const id = firebase.database().ref().child('posts').push().key;
                const now = new Date();

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
                    date: `${now.getUTCDate()}/${
                        now.getMonth() + 1
                    }/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    timestamp: now.getTime(),
                    totalValue: finalValue.toFixed(2),
                    isPaypal: true,
                };

                firebase
                    .database()
                    .ref('requests/' + id)
                    .set(dataToSend);

                firebase
                    .database()
                    .ref('reportsSales/' + id)
                    .set(dataToSend);
                setTimeout(() => {
                    localStorage.setItem('products', '{}');
                }, 5000);
            } else {
                const id = firebase.database().ref().child('posts').push().key;
                const now = new Date();

                const dataToSend = {
                    id: id,
                    products: data,
                    pickupOption: pickupSelect,
                    payment: selectedPayment,
                    selectedTransport: selectedTransportData,
                    userEmail: dataAccount.email,
                    cepNumber: customerCep,
                    userName: newDataReceiver.receiverName
                        ? newDataReceiver.receiverName
                        : dataAccount.name,
                    phoneNumber: newDataReceiver.receiverPhone
                        ? newDataReceiver.receiverPhone
                        : dataAccount.phoneNumber,
                    address: newDataReceiver.receiverAddress
                        ? newDataReceiver.receiverAddress
                        : dataAccount.address,
                    houseNumber: newDataReceiver.receiverHouseNumber
                        ? newDataReceiver.receiverHouseNumber
                        : dataAccount.houseNumber,
                    complement: newDataReceiver.receiverComplement
                        ? newDataReceiver.receiverComplement
                        : dataAccount.complement,
                    district: newDataReceiver.receiverDistrict
                        ? newDataReceiver.receiverDistrict
                        : dataAccount.district,
                    city: newDataReceiver.receiverCity
                        ? newDataReceiver.receiverCity
                        : dataAccount.city,
                    state: selectedState ? selectedState : '',
                    cpf: newDataReceiver.receiverCpf
                        ? newDataReceiver.receiverCpf
                        : '',
                    cep: newDataReceiver.receiverCep
                        ? newDataReceiver.receiverCep
                        : '',
                    economicTransportValue: economicTransportValue
                        ? economicTransportValue
                        : '',
                    paymentProof: '',
                    adminNote: '',
                    requestStatus: '',
                    dateToCompare: new Date().toDateString(),
                    date: `${now.getUTCDate()}/${
                        now.getMonth() + 1
                    }/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                    timestamp: now.getTime(),
                    totalValue: finalValue.toFixed(2),
                    isPaypal: true,
                };

                firebase
                    .database()
                    .ref('requests/' + id)
                    .set(dataToSend);

                firebase
                    .database()
                    .ref('reportsSales/' + id)
                    .set(dataToSend);
                setTimeout(() => {
                    localStorage.setItem('products', '{}');
                }, 5000);
            }
        } else {
            var confirm = window.confirm(
                'Você precisa ter uma conta para finalizar um pedido!'
            );

            if (confirm) redirect.push('/cadastro');
        }

        return 0;
    }

    //se o usuário ainda não finalizou a compra. Porém, deixou de ser utilizado(para pagamentos no paypal) , ao paidForm ser igual a true, n muda nada, mas é redirecionado para os pedidos no perfil ao invés de mudar a tela no carrinho
    if (!paidForm) {
        return (
            <main id='mainCartPage'>
                <div
                    style={{ display: displayPopup }}
                    className='cartPopupWrapper'
                >
                    <div className='cartPopupContent'>
                        <h3>
                            Ao finalizar o pedido, realize um Pix para a chave
                            indicada
                            <br />
                        </h3>
                        <h4>
                            Após isso, envie seu comprovante através da seção
                            "meus produtos" em seu perfil.
                        </h4>

                        <button onClick={() => closePopup()}>Confirmar</button>
                    </div>
                </div>

                <Header />

                <div id='cart'>
                    {data.length !== 0 ? (
                        <section id='purchaseInfo'>
                            <h2>Seu carrinho</h2>

                            <section className='productsInfo'>
                                {data.map((product, index) => {
                                    return product.productType &&
                                        product.productType === 'Outros' ? (
                                        <div
                                            className='productDetails'
                                            key={index}
                                        >
                                            <div>
                                                <img
                                                    src={product.productImage}
                                                    alt='Imagem'
                                                />
                                            </div>

                                            <ul>
                                                <li>{product.productName}</li>
                                            </ul>

                                            <div className='productsButtons'>
                                                {product.value > 0 ? (
                                                    <h1>
                                                        R${' '}
                                                        {product.value.toFixed(
                                                            2
                                                        )}
                                                    </h1>
                                                ) : (
                                                    <h1
                                                        style={{
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        Finalize o pedido e
                                                        aguarde nosso retorno
                                                        com o valor de seu
                                                        produto
                                                    </h1>
                                                )}

                                                {product.quantity ? (
                                                    <h4>
                                                        Quantidade:{' '}
                                                        {product.quantity}
                                                    </h4>
                                                ) : (
                                                    <h4>Quantidade: 1</h4>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        removeItemInCart(index);
                                                    }}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className='productDetails'
                                            key={index}
                                        >
                                            {product.productImage ? (
                                                <div>
                                                    <img
                                                        src={
                                                            product.productImage
                                                        }
                                                        alt='Modelo'
                                                    />
                                                </div>
                                            ) : (
                                                images.map((sketchbook) => (
                                                    <div>
                                                        {sketchbook.name ===
                                                        product.model ? (
                                                            <img
                                                                src={
                                                                    sketchbook.image
                                                                }
                                                                alt='Modelo'
                                                            />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                ))
                                            )}

                                            <ul>
                                                <li>
                                                    <strong>Modelo:</strong>{' '}
                                                    {product.model}
                                                </li>
                                                {product.kindleModel ? (
                                                    <li>
                                                        <strong>
                                                            Aparelho:
                                                        </strong>{' '}
                                                        {product.kindleModel}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                {product.paperWidth ? (
                                                    <li>
                                                        <strong>
                                                            Tamanho:
                                                        </strong>{' '}
                                                        {product.paperWidth}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                {product.paper ? (
                                                    typeof product.paper ===
                                                    'string' ? (
                                                        <li>
                                                            <b>
                                                                Papel do miolo:
                                                            </b>{' '}
                                                            {product.paper}
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <strong>
                                                                Papel do miolo:
                                                            </strong>{' '}
                                                            {product.paper.map(
                                                                (
                                                                    papel,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <p
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {index +
                                                                                1}{' '}
                                                                            -{' '}
                                                                            <strong>
                                                                                {
                                                                                    papel.quantidade
                                                                                }
                                                                            </strong>{' '}
                                                                            bloco(s)
                                                                            de{' '}
                                                                            <strong>
                                                                                {
                                                                                    papel.nomePapel
                                                                                }
                                                                            </strong>
                                                                        </p>
                                                                    );
                                                                }
                                                            )}
                                                        </li>
                                                    )
                                                ) : (
                                                    ''
                                                )}

                                                <li id='coverColor'>
                                                    <strong>
                                                        Cor da capa:{' '}
                                                    </strong>
                                                    {product.coverColors.map(
                                                        (color, index) => {
                                                            return color.name ? (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {(index
                                                                        ? ' + '
                                                                        : '') +
                                                                        color.name}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {(index
                                                                        ? ' + '
                                                                        : '') +
                                                                        color}
                                                                </span>
                                                            );
                                                        }
                                                    )}
                                                </li>

                                                {product.elasticColor ? (
                                                    <li>
                                                        <strong>
                                                            Cor do elástico:
                                                        </strong>{' '}
                                                        {product.elasticColor
                                                            .colorName
                                                            ? product
                                                                  .elasticColor
                                                                  .colorName
                                                            : product.elasticColor}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                {product.lineColor ? (
                                                    <li>
                                                        <strong>
                                                            Cor da linha:
                                                        </strong>{' '}
                                                        {product.lineColor
                                                            .colorName
                                                            ? product.lineColor
                                                                  .colorName
                                                            : product.lineColor}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                {product.spiralColor ? (
                                                    <li>
                                                        <strong>
                                                            Cor do espiral:
                                                        </strong>{' '}
                                                        {product.spiralColor}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                                {product.sketchFinish ? (
                                                    <li>
                                                        <strong>
                                                            Tipo de Acabamento:
                                                        </strong>{' '}
                                                        {product.sketchFinish}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                {product.clientNote ? (
                                                    <li>
                                                        <strong>
                                                            Observações:
                                                        </strong>{' '}
                                                        {product.clientNote}
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                            </ul>

                                            <div className='productsButtons'>
                                                {product.value > 0 ? (
                                                    <h1>
                                                        R${' '}
                                                        {product.value.toFixed(
                                                            2
                                                        )}
                                                    </h1>
                                                ) : (
                                                    <h1
                                                        style={{
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        Finalize o pedido e
                                                        aguarde nosso retorno
                                                        com o valor de seu
                                                        produto
                                                    </h1>
                                                )}

                                                {product.quantity ? (
                                                    <h4>
                                                        Quantidade:{' '}
                                                        {product.quantity}
                                                    </h4>
                                                ) : (
                                                    <h4>Quantidade: 1</h4>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        removeItemInCart(index);
                                                    }}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>

                            {userIsLogged ? (
                                <section className='checkout'>
                                    <div className='finishOrder'>
                                        <h2>Finalização do pedido</h2>

                                        <div
                                            id='VoucherArea'

                                            // style={{
                                            //     width: '100%',
                                            //     margin: '1rem 0',
                                            // }}
                                        >
                                            <h3>Cupom de Desconto</h3>

                                            <input
                                                type='text'
                                                id='VoucherCode'
                                                placeholder='Insira o cupom'
                                                onChange={handleUserVoucher}
                                            />
                                            <button
                                                onClick={() => {
                                                    if (pickupSelect === '0') {
                                                        redeemVoucher();
                                                    } else {
                                                        alert(
                                                            'Voce deve aplicar o cupom antes de selecionar o envio. Recarregue a página e tente novamente.'
                                                        );
                                                    }
                                                }}
                                            >
                                                Inserir Cupom
                                            </button>
                                            <br />
                                            <div
                                                className='ValuesWrapper'
                                                style={{
                                                    display:
                                                        displayDiscountValues,
                                                }}
                                            >
                                                <h4>
                                                    Valor Anterior: R${' '}
                                                    {productsSum.toFixed(2)}
                                                </h4>
                                                <h4>
                                                    Desconto Aplicado: R${' '}
                                                    {aplliedDiscount.toFixed(2)}
                                                </h4>
                                                <h4>
                                                    Valor com Desconto: R${' '}
                                                    {totalValue.toFixed(2)}
                                                </h4>
                                            </div>

                                            <br />
                                        </div>
                                        {data.length > 1 ? (
                                            <select
                                                className='pickupSelect'
                                                defaultValue='0'
                                                onChange={handlePickupSelect}
                                            >
                                                <option disabled value='0'>
                                                    Selecione como deseja
                                                    receber sua encomenda
                                                </option>
                                                <option value='Entrega por aplicativo'>
                                                    Combinar entrega por
                                                    aplicativo de viagem (Uber
                                                    ou 99) com a Cactus
                                                </option>
                                                <option value='Impresso módico ou Carta registrada'>
                                                    Impresso módico ou Carta
                                                    registrada
                                                </option>
                                                <option value='Retirada física'>
                                                    Retirada física: Travessa da
                                                    Lapa - 162 - Centro/Desterro
                                                </option>
                                            </select>
                                        ) : (
                                            <select
                                                className='pickupSelect'
                                                defaultValue='0'
                                                onChange={handlePickupSelect}
                                            >
                                                <option disabled value='0'>
                                                    Selecione como deseja
                                                    receber sua encomenda
                                                </option>
                                                <option value='Entrega por aplicativo'>
                                                    Combinar entrega por
                                                    aplicativo de viagem (Uber
                                                    ou 99) com a Cactus
                                                </option>
                                                <option value='Frete por transportadora'>
                                                    Entrega por transportadora
                                                </option>
                                                <option value='Impresso módico ou Carta registrada'>
                                                    Impresso módico ou Carta
                                                    registrada
                                                </option>
                                                <option value='Retirada física'>
                                                    Retirada física: Travessa da
                                                    Lapa - 162 - Centro/Desterro
                                                </option>
                                            </select>
                                        )}
                                        <span>
                                            <strong>Observação: </strong>
                                            As entregas por transportadora são
                                            limitadas a um produto. As entregas
                                            por carta registrada e registro
                                            módico são formas de envio mais
                                            baratas e permitem o envio de mais
                                            de um produto, porém, o envio não é
                                            atualizado a todo momento (apenas
                                            quando é postado, chegou na sua
                                            cidade, saiu para entrega). O envio
                                            é feito pelos Correios com um valor
                                            fixo de R$ 15,00 para as regiões{' '}
                                            <strong>Norte e Nordeste</strong>, e
                                            R$ 20,00 para as regiões{' '}
                                            <strong>
                                                Sul, Sudeste e Centro-Oeste
                                            </strong>
                                            .
                                        </span>
                                        <span>
                                            <strong>Atenção: </strong>
                                            Pedidos feitos <strong>
                                                FORA
                                            </strong>{' '}
                                            do "pronta entrega" tem um prazo de{' '}
                                            <strong>
                                                5 DIAS ÚTEIS DE PRODUÇÃO + 2
                                                DIAS ÚTEIS PARA POSTAGEM OU
                                                RETIRADA
                                            </strong>{' '}
                                            após a produção. Pedidos a pronta
                                            entrega tem apenas o prazo de
                                            postagem/entrega{' '}
                                            <strong>(até 2 dias úteis)</strong>{' '}
                                            .
                                        </span>

                                        <label
                                            style={{
                                                display: displayCepSearch,
                                            }}
                                            htmlFor='cepNumber'
                                        >
                                            Insira o CEP abaixo
                                        </label>
                                        <InputMask
                                            id='CepNumber'
                                            name='cepNumber'
                                            type='text'
                                            mask='99999-999'
                                            maskChar=''
                                            style={{
                                                display: displayCepSearch,
                                            }}
                                            onChange={handleInputCep}
                                            placeholder='CEP'
                                        />
                                        <button
                                            style={{
                                                display: displayCepSearch,
                                            }}
                                            onClick={() => {
                                                calculaFrete();
                                            }}
                                        >
                                            Calcular frete
                                        </button>
                                        <div
                                            className='transportInfos'
                                            style={{
                                                display: displayCepSearch,
                                            }}
                                        >
                                            {transportData.map(
                                                (item, index) => {
                                                    if (
                                                        item.id === 1 ||
                                                        item.id === 2
                                                    ) {
                                                        if (!item.error) {
                                                            return (
                                                                <div
                                                                    className='optionsTransport'
                                                                    key={index}
                                                                >
                                                                    <div className='radioButton'>
                                                                        <input
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleSelectedTransport(
                                                                                    e,
                                                                                    item,
                                                                                    index
                                                                                )
                                                                            }
                                                                            type='radio'
                                                                            name='selectedTransport'
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.name
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className='transportLogoWrapper'>
                                                                        <img
                                                                            src={
                                                                                item
                                                                                    .company
                                                                                    .picture
                                                                            }
                                                                            alt={
                                                                                item
                                                                                    .company
                                                                                    .name
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className='textTransportInfos'>
                                                                        <span>
                                                                            {
                                                                                item
                                                                                    .company
                                                                                    .name
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                item.name
                                                                            }
                                                                            )
                                                                        </span>
                                                                        <span>
                                                                            <strong>
                                                                                R${' '}
                                                                                {
                                                                                    item.custom_price
                                                                                }
                                                                            </strong>
                                                                        </span>
                                                                        <span>
                                                                            Prazo
                                                                            de
                                                                            entrega:{' '}
                                                                            <strong>
                                                                                {
                                                                                    item.custom_delivery_time
                                                                                }{' '}
                                                                                dias
                                                                                úteis
                                                                            </strong>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    }
                                                }
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                display: displayAddressForms,
                                            }}
                                            className='transportDiv'
                                        >
                                            <h2>
                                                Insira os dados para entrega
                                                abaixo
                                            </h2>

                                            <div className='userInfos'>
                                                <input
                                                    name='receiverName'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Nome do destinatário'
                                                    value={
                                                        newDataReceiver.receiverName
                                                    }
                                                />

                                                {/* <input name='receiverPhone' onChange={handleInputInfosChange} placeholder='Telefone' value={newDataReceiver.receiverPhone} /> */}
                                                <InputMask
                                                    id='receiverPhone'
                                                    name='receiverPhone'
                                                    type='text'
                                                    mask='(99) 99999-9999'
                                                    maskChar=''
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Telefone'
                                                    value={
                                                        newDataReceiver.receiverPhone
                                                    }
                                                />

                                                <input
                                                    name='receiverAddress'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Endereço de entrega'
                                                    value={
                                                        newDataReceiver.receiverAddress
                                                    }
                                                />

                                                <input
                                                    name='receiverHouseNumber'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Número da residência'
                                                    value={
                                                        newDataReceiver.receiverHouseNumber
                                                    }
                                                />

                                                <input
                                                    name='receiverComplement'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Complemento'
                                                    value={
                                                        newDataReceiver.receiverComplement
                                                    }
                                                />

                                                <input
                                                    name='receiverDistrict'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Bairro'
                                                    value={
                                                        newDataReceiver.receiverDistrict
                                                    }
                                                />

                                                <input
                                                    name='receiverCity'
                                                    onChange={
                                                        handleInputInfosChange
                                                    }
                                                    placeholder='Cidade'
                                                    value={
                                                        newDataReceiver.receiverCity
                                                    }
                                                />

                                                {pickupSelect ===
                                                'Frete por transportadora' ? (
                                                    <InputMask
                                                        id='receiverCpf'
                                                        name='receiverCpf'
                                                        type='text'
                                                        mask='999.999.999-99'
                                                        maskChar=''
                                                        onChange={
                                                            handleInputInfosChange
                                                        }
                                                        placeholder='CPF'
                                                        value={
                                                            newDataReceiver.receiverCpf
                                                        }
                                                    />
                                                ) : (
                                                    <>
                                                        <select
                                                            onChange={
                                                                handleSelectedState
                                                            }
                                                            className='StateSelect'
                                                            defaultValue='0'
                                                        >
                                                            <option
                                                                value='0'
                                                                disabled
                                                            >
                                                                Estado
                                                            </option>

                                                            {states.map(
                                                                (
                                                                    states,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                index
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                states.uf
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>

                                                        <InputMask
                                                            id='receiverCep'
                                                            name='receiverCep'
                                                            type='text'
                                                            mask='99999-999'
                                                            maskChar=''
                                                            onChange={
                                                                handleInputInfosChange
                                                            }
                                                            placeholder='CEP'
                                                            value={
                                                                newDataReceiver.receiverCep
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <select
                                            style={{
                                                display: displayPaymentOption,
                                            }}
                                            defaultValue='0'
                                            className='paymentSelect'
                                            onChange={handleSelectPayment}
                                        >
                                            <option disabled value='0'>
                                                Selecione o tipo de pagamento
                                            </option>
                                            <option value='PayPal'>
                                                PayPal{' '}
                                            </option>
                                            <option value='Cartão'>
                                                Cartão{' '}
                                            </option>
                                            <option value='Pix'>Pix</option>
                                        </select>
                                        <div
                                            className='paypalButtons'
                                            ref={(v) => (paypalRef = v)}
                                        />
                                        <div className='checkoutOptions'>
                                            <a href='/'>
                                                Continuar comprando...
                                            </a>

                                            {finalValue > 0 ? (
                                                <h3>
                                                    Valor: R${' '}
                                                    {finalValue.toFixed(2)}
                                                </h3>
                                            ) : (
                                                ''
                                            )}

                                            <button
                                                style={{
                                                    display:
                                                        displayFinishButton,
                                                }}
                                                onClick={sendOrder}
                                            >
                                                Concluir compra!
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            ) : (
                                <div className='loginRedirect'>
                                    <p>
                                        Você deve ter uma conta para finalizar
                                        seu pedido. Clique{' '}
                                        <Link to='/login'>aqui</Link> para
                                        entrar
                                    </p>
                                </div>
                            )}

                            <h2>Confira as artes de nossos clientes</h2>
                            <section className='ourClients'>
                                <img src={produto1} alt='' />
                                <img src={produto2} alt='' />
                                <img src={produto3} alt='' />
                                <img src={produto4} alt='' />
                            </section>

                            <section className='ourServices'>
                                <div className='service-title'>
                                    <h1>Os cactus mais vendidos</h1>
                                </div>

                                <div className='service-card'>
                                    <h3>mandacaru</h3>
                                    <h4>Sketchbook costura copta</h4>
                                    <img src={mandacaru} alt='Mandacaru' />
                                </div>

                                <div className='service-card'>
                                    <h3>baião</h3>
                                    <h4>Sketchbook quadrado copta</h4>
                                    <img src={baiao} alt='Baião' />
                                </div>

                                <div className='service-card'>
                                    <h3>facheiro</h3>
                                    <h4>Sketchbook espiral</h4>
                                    <img src={facheiro} alt='Facheiro' />
                                </div>
                            </section>
                        </section>
                    ) : (
                        <section className='emptyCart'>
                            <h3>
                                Opa... parece que seu carrinho está vazio! Bora
                                fazer arte?
                            </h3>
                            <a id='redirect' href='/'>
                                Bora!
                            </a>
                            <span>
                                Dica: realizou um pedido? Verifique se ele foi
                                confirmado em{' '}
                                <Link id='requests' to='/meusPedidos'>
                                    Meus pedidos
                                </Link>
                            </span>
                        </section>
                    )}
                </div>

                <Footer />
            </main>
        );
    } else
        return (
            <main id='mainPaidForm'>
                <Header />

                <body>
                    <h1>Resumo de sua compra</h1>

                    <h4>
                        Você pode acompanhar o status de seu pedido através da
                        página de{' '}
                        <Link target='_blank' to='/meusPedidos'>
                            pedidos
                        </Link>
                    </h4>

                    {purchasedProductData ? (
                        <div className='buyInfosWrapper'>
                            <div className='buyInfosData'>
                                <div className='rowDataInfos'>
                                    <h4>ID do pedido: </h4>
                                    <span>{purchasedProductData.id}</span>
                                </div>

                                <div className='rowDataInfos'>
                                    <h4>Opção de entrega: </h4>
                                    <span>
                                        {purchasedProductData.pickupOption}
                                    </span>
                                </div>

                                {purchasedProductData.pickupOption ===
                                'Frete por transportadora' ? (
                                    <>
                                        <div className='rowDataInfos'>
                                            <h4>Transportadora: </h4>
                                            <span>
                                                {
                                                    purchasedProductData
                                                        .selectedTransport.name
                                                }
                                            </span>
                                        </div>

                                        <div className='rowDataInfos'>
                                            <h4>Prazo de entrega: </h4>
                                            <span>
                                                De{' '}
                                                {
                                                    purchasedProductData
                                                        .selectedTransport
                                                        .delivery_range.min
                                                }{' '}
                                                a{' '}
                                                {
                                                    purchasedProductData
                                                        .selectedTransport
                                                        .delivery_range.max
                                                }{' '}
                                                dias úteis após a confirmação de
                                                pagamento
                                            </span>
                                        </div>

                                        <div className='rowDataInfos'>
                                            <h4>Valor do frete: </h4>
                                            <span>
                                                R${' '}
                                                {
                                                    purchasedProductData
                                                        .selectedTransport.price
                                                }
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}

                                {purchasedProductData.pickupOption ===
                                'Impresso módico ou Carta registrada' ? (
                                    <div className='rowDataInfos'>
                                        <h4>Valor do frete: </h4>
                                        <span>
                                            R${' '}
                                            {
                                                purchasedProductData.economicTransportValue
                                            }
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}

                                {purchasedProductData.payment === 'Pix' ? (
                                    <>
                                        <div id='pixProofDiv'>
                                            <h3>
                                                Forma de pagamento -{' '}
                                                {purchasedProductData.payment}
                                            </h3>
                                            <h4>Chave PIX:</h4>
                                            <span>
                                                <strong>
                                                    cactussketchs@gmail.com
                                                </strong>{' '}
                                                - Cactus Sketchbooks (C6 Bank)
                                            </span>
                                            <span>
                                                envie seu comprovante na página
                                                dos{' '}
                                                <Link
                                                    target='_blank'
                                                    to='/meusPedidos'
                                                >
                                                    seus pedidos
                                                </Link>
                                            </span>

                                            <div className='rowDataInfos'>
                                                {purchasedProductData.totalValue >
                                                0 ? (
                                                    <>
                                                        <h4>Total: </h4>
                                                        <span>
                                                            R${' '}
                                                            {
                                                                purchasedProductData.totalValue
                                                            }
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span>
                                                        Aguarde o retorno da
                                                        Cactus com o valor de
                                                        sua compra
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='rowDataInfos'>
                                            <h4>Forma de pagamento: </h4>
                                            <span>
                                                {purchasedProductData.payment}
                                            </span>
                                        </div>

                                        <div className='rowDataInfos'>
                                            <h4>Total: </h4>
                                            <span>
                                                R${' '}
                                                {
                                                    purchasedProductData.totalValue
                                                }
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className='boxProductInfos'>
                                {purchasedProductData.products
                                    ? purchasedProductData.products.map(
                                          (product) => {
                                              return product.productType &&
                                                  product.productType ===
                                                      'Outros' ? (
                                                  <ul>
                                                      <li>
                                                          <h2>
                                                              {
                                                                  product.productName
                                                              }
                                                          </h2>
                                                      </li>
                                                      <li>
                                                          <span>
                                                              {
                                                                  product.description
                                                              }
                                                          </span>
                                                      </li>
                                                      <li>
                                                          <b>Quantidade </b>{' '}
                                                          <span>
                                                              {product.quantity}
                                                          </span>
                                                      </li>
                                                      <li>
                                                          {' '}
                                                          {product.value > 0 ? (
                                                              <h2>
                                                                  R${' '}
                                                                  {
                                                                      product.value
                                                                  }
                                                              </h2>
                                                          ) : (
                                                              ''
                                                          )}
                                                      </li>
                                                  </ul>
                                              ) : (
                                                  <ul className='productInfo'>
                                                      <h2>
                                                          {product.productName
                                                              ? product.productName
                                                              : product.model}
                                                      </h2>

                                                      {product.paperWidth ? (
                                                          <li>
                                                              <b>Tamanho</b>
                                                              <span>
                                                                  {
                                                                      product.paperWidth
                                                                  }
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          <li>
                                                              <b>Aparelho</b>
                                                              <span>
                                                                  {
                                                                      product.kindleModel
                                                                  }
                                                              </span>
                                                          </li>
                                                      )}

                                                      {product.paper ? (
                                                          typeof product.paper ===
                                                          'string' ? (
                                                              <li>
                                                                  <b>
                                                                      Papel do
                                                                      miolo:
                                                                  </b>{' '}
                                                                  {
                                                                      product.paper
                                                                  }
                                                              </li>
                                                          ) : (
                                                              <li>
                                                                  <strong>
                                                                      Papel do
                                                                      miolo:
                                                                  </strong>{' '}
                                                                  {product.paper.map(
                                                                      (
                                                                          papel,
                                                                          index
                                                                      ) => {
                                                                          return (
                                                                              <p
                                                                                  key={
                                                                                      index
                                                                                  }
                                                                              >
                                                                                  {index +
                                                                                      1}{' '}
                                                                                  -{' '}
                                                                                  <strong>
                                                                                      {
                                                                                          papel.quantidade
                                                                                      }
                                                                                  </strong>{' '}
                                                                                  bloco(s)
                                                                                  de{' '}
                                                                                  <strong>
                                                                                      {
                                                                                          papel.nomePapel
                                                                                      }
                                                                                  </strong>
                                                                              </p>
                                                                          );
                                                                      }
                                                                  )}
                                                              </li>
                                                          )
                                                      ) : (
                                                          ''
                                                      )}

                                                      <div id='coverColorDiv'>
                                                          <b>Cor da capa </b>

                                                          <div className='coverColorWrapper'>
                                                              {product.coverColors.map(
                                                                  (
                                                                      color,
                                                                      index
                                                                  ) => {
                                                                      return color.name ? (
                                                                          <span
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              {(index
                                                                                  ? ' + '
                                                                                  : '') +
                                                                                  color.name}
                                                                          </span>
                                                                      ) : (
                                                                          <span
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              {(index
                                                                                  ? ' + '
                                                                                  : '') +
                                                                                  color}
                                                                          </span>
                                                                      );
                                                                  }
                                                              )}
                                                          </div>
                                                      </div>

                                                      {product.lineColor ? (
                                                          <li>
                                                              <b>
                                                                  Cor da linha
                                                              </b>
                                                              <span>
                                                                  {product
                                                                      .lineColor
                                                                      .colorName
                                                                      ? product
                                                                            .lineColor
                                                                            .colorName
                                                                      : product.lineColor}
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          ''
                                                      )}

                                                      {product.elasticColor ? (
                                                          <li>
                                                              <b>
                                                                  Cor do
                                                                  elástico
                                                              </b>
                                                              <span>
                                                                  {product
                                                                      .elasticColor
                                                                      .colorName
                                                                      ? product
                                                                            .elasticColor
                                                                            .colorName
                                                                      : product.elasticColor}
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          ''
                                                      )}

                                                      {product.spiralColor ? (
                                                          <li>
                                                              <b>
                                                                  Cor do espiral
                                                              </b>
                                                              <span>
                                                                  {
                                                                      product.spiralColor
                                                                  }
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          ''
                                                      )}
                                                      {product.sketchFinish ? (
                                                          <li>
                                                              <b>
                                                                  Tipo de
                                                                  Acabamento
                                                              </b>
                                                              <span>
                                                                  {
                                                                      product.sketchFinish
                                                                  }
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          ''
                                                      )}

                                                      {product.clientNote ? (
                                                          <li>
                                                              <b>Observação</b>
                                                              <span>
                                                                  {' '}
                                                                  {
                                                                      product.clientNote
                                                                  }
                                                              </span>
                                                          </li>
                                                      ) : (
                                                          ''
                                                      )}

                                                      {product.value > 0 ? (
                                                          <h2>
                                                              R$ {product.value}
                                                          </h2>
                                                      ) : (
                                                          ''
                                                      )}
                                                  </ul>
                                              );
                                          }
                                      )
                                    : ''}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </body>

                <Footer />
            </main>
        );
}
