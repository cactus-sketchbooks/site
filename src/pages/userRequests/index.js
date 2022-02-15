import { React, createRef } from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FirebaseConfig.js'

import { Link, useHistory } from "react-router-dom";

export default function UserRequests() {

    const [dataAccount, setDataAccount] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [paymentFile, setPaymentFile] = useState('');

    let history = useHistory();

    useEffect(() => {

        window.scrollTo(0, 0);

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail)
                            setDataAccount(item)

                    })

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('reportsSales/').get('/reportsSales')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    var requestDataTemp = []

                    temp.map((item) => {

                        if (item.userEmail === userEmail)
                            requestDataTemp.push(item)

                    })

                    setRequestData(requestDataTemp)

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    function sendPaymentProof(index) {

        if (paymentFile !== '') {

            const newRequestData = {

                address: requestData[index].address,
                adminNote: requestData[index].adminNote,
                cep: requestData[index].cep,
                cepNumber: requestData[index].cepNumber,
                city: requestData[index].city,
                clientNote: requestData[index].clientNote ? requestData[index].clientNote : '',
                complement: requestData[index].complement,
                cpf: requestData[index].cpf,
                date: requestData[index].date,
                dateToCompare: requestData[index].dateToCompare,
                district: requestData[index].district,
                houseNumber: requestData[index].houseNumber,
                id: requestData[index].id,
                payment: requestData[index].payment,
                paymentProof: paymentFile,
                phoneNumber: requestData[index].phoneNumber,
                pickupOption: requestData[index].pickupOption,
                products: requestData[index].products,
                requestStatus: requestData[index].requestStatus,
                selectedTransport: requestData[index].selectedTransport,
                totalValue: requestData[index].totalValue,
                userEmail: requestData[index].userEmail,
                userName: requestData[index].userName,

            }
            firebase.database()
                .ref('requests/' + requestData[index].id)
                .update(newRequestData)

            firebase.database()
                .ref('reportsSales/' + requestData[index].id)
                .update(newRequestData)

                .then(() => alert("Comprovante enviado com sucesso!"))

            setPaymentFile('')

        } else {

            window.alert("Comprovante não enviado. Aguarde alguns segundos e tente novamente. Se o error persistir, verifique o formato do arquivo inserido ou sua conexão.")

        }

    }

    function uploadPaymentProof(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('paymentProofs/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setPaymentFile(url))
            });

    }

    return (

        <div className="requestsPage">

            <Header />

            <section id="DataSection">

                <h1>Seus pedidos</h1>

                <div className="requestData">

                    {requestData.map((item, index) => {

                        return (

                            <div className="boxInfoData">

                                <div className="rowData">

                                    <h4>ID do pedido: </h4>
                                    <h4>{item.id}</h4>

                                </div>

                                {item.requestStatus ? (

                                    <div className="rowData">

                                        <h4>Status do pedido: </h4>
                                        <h4>{item.requestStatus}</h4>

                                    </div>

                                ) : ('')}

                                <div className="rowData">

                                    <h4>Opção de entrega: </h4>
                                    <h4>{item.pickupOption}</h4>

                                </div>

                                {item.selectedTransport ? (

                                    <>
                                        <div className="rowData">

                                            <h4>Transportadora: </h4>
                                            <h4>{item.selectedTransport.name}</h4>

                                        </div>

                                        <div className="rowData">

                                            <h4>Prazo de entrega: </h4>
                                            <h4>De {item.selectedTransport.delivery_range.min} a {item.selectedTransport.delivery_range.max} dias úteis após a confirmação de pagamento</h4>

                                        </div>

                                        <div className="rowData">

                                            <h4>Valor do frete: </h4>
                                            <h4>R$ {item.selectedTransport.price}</h4>

                                        </div>

                                    </>

                                ) : ('')}

                                {item.payment == 'Pix' ? (

                                    <div id="pixProofDiv" className="rowData">

                                        <h4>Forma de pagamento: {item.payment}</h4>

                                        {item.paymentProof ? (

                                            <h4>Comprovante enviado com sucesso!</h4>

                                        ) : (

                                            <div className="paymentProof">

                                                <label for="pixProof">Selecionar comprovante</label>
                                                <input
                                                    type='file'
                                                    onChange={uploadPaymentProof}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                    id="pixProof"
                                                />

                                                <button onClick={() => { sendPaymentProof(index) }}>Enviar comprovante</button>

                                            </div>

                                        )}

                                    </div>

                                ) : (

                                    <div className="rowData">

                                        <h4>Forma de pagamento: </h4>
                                        <h4>{item.payment}</h4>

                                    </div>

                                )}

                                {item.adminNote ? (

                                    <div className="rowData" id="noteDiv">

                                        <h4>Observação da Cactus</h4>

                                        <p>{item.adminNote}</p>

                                    </div>

                                ) : ('')}

                                <div className="boxProductInfos">

                                    {item.products.map((product) => {

                                        return (

                                            <ul className="productInfo">

                                                <h2>{product.model}</h2>

                                                {product.paperWidth ? (

                                                    <>
                                                        <li><b>Tamanho:</b> {product.paperWidth}</li>
                                                    </>

                                                ) : (

                                                    <li><b>Modelo do Kindle:</b> {product.kindleModel}</li>

                                                )}

                                                {product.paper ? (

                                                    <li><b>Papel do miolo:</b> {product.paper}</li>

                                                ) : ('')}

                                                <div className="coverColorDiv">

                                                    <strong>Cor da capa: </strong>

                                                    {product.coverColors.map((color, index) => {

                                                        return (

                                                            <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                                        )

                                                    })}

                                                </div>

                                                {product.lineColor ? (

                                                    <li><b>Cor da linha:</b> {product.lineColor.colorName}</li>

                                                ) : ('')}

                                                {product.elasticColor ? (

                                                    <li><b>Cor do elástico:</b> {product.elasticColor.colorName}</li>

                                                ) : ('')}

                                                {product.spiralColor ? (

                                                    <li><b>Cor do espiral:</b> {product.spiralColor}</li>

                                                ) : ('')}

                                                {product.clientNote ? (

                                                    <li><b>Observação:</b> {product.clientNote}</li>

                                                ) : ('')}

                                                <h2>R$ {product.value}</h2>

                                            </ul>

                                        )

                                    })}

                                </div>

                            </div>

                        )

                    })}

                </div>

            </section>

            <Footer />

        </div>

    )

}