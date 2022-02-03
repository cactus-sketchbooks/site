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
    const [displayProducts, setDisplayProducts] = useState("none")
    const [isOpenned, setIsOpenned] = useState(false)

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

    function handleDisplayProducts(index) {

        setIsOpenned(!isOpenned)

        if(isOpenned) {

            setDisplayProducts("flex");

        } else {

            setDisplayProducts("none");

        }

    }

    return (

        <div className="requestsPage">

            <Header />

            <section id="DataSection">

                <h1>Seus pedidos</h1>

                <div className="requestData">

                    {requestData.map((item) => {

                        return (

                            <div className="boxInfoData">

                                <div className="rowData">

                                    <h4>Forma de pagamento: </h4>
                                    <h4>{item.payment}</h4>

                                </div>

                                <div className="rowData">

                                    <h4>ID do pedido: </h4>
                                    <h4>{item.id}</h4>

                                </div>

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

                                <button onClick={handleDisplayProducts}>Teste</button>

                                <div style={{display: displayProducts}} className="boxProductInfos">

                                    {item.products.map((product) => {

                                        return (

                                            <ul className="productInfo">

                                                <li><b>{product.model}</b></li>

                                                {product.paperWidth ? (

                                                    <>
                                                        <li><b>Tamanho: {product.paperWidth}</b></li>
                                                    </>

                                                ) : (

                                                    <li><b>Modelo do Kindle: {product.kindleModel}</b></li>

                                                )}

                                                {product.paper ? (

                                                    <li><b>Papel do miolo: {product.paper}</b></li>

                                                ) : ('')}

                                                <strong>Cor da capa: </strong>

                                                {product.coverColors.map((color, index) => {

                                                    return (

                                                        <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                                    )

                                                })}

                                                {product.lineColor ? (

                                                    <li><b>Cor da linha: {product.lineColor.colorName}</b></li>

                                                ) : ('')}

                                                {product.elasticColor ? (

                                                    <li><b>Cor do elástico: {product.elasticColor.colorName}</b></li>

                                                ) : ('')}

                                                {product.spiralColor ? (

                                                    <li><b>Cor do espiral: {product.spiralColor}</b></li>

                                                ) : ('')}

                                                {product.clientNote ? (

                                                    <li><b>Observação: {product.clientNote}</b></li>

                                                ) : ('')}

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