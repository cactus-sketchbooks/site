import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

import './style.scss';
import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js'

export default function Requests() {

    const [userIsLogged, setUserIsLogged] = useState(false);
    const [redirect, setRedirect] = useState(useHistory());
    const [dataAdmin, setDataAdmin] = useState([])
    const [selectItem, setSelectItem] = useState('')
    const [noteAdmin, setNoteAdmin] = useState('')
    const [requestStatus, setRequestStatus] = useState('');
    const [modalDataProducts, setModalDataProducts] = useState();
    const [displayModal, setDisplayModal] = useState('none');

    const [loginData, setLoginData] = useState({

        email: '',
        password: ''

    })

    function makeLogin() {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(() => {

                var userEmail = localStorage.getItem('userEmail')

                firebase.database().ref('admins').get('/admins')
                    .then(function (snapshot) {

                        if (snapshot.exists()) {

                            var data = snapshot.val()
                            var temp = Object.keys(data).map((key) => data[key])

                            temp.map((item) => {

                                if (item.email === userEmail)
                                    setUserIsLogged(true)

                            })
                        }
                        else {
                            console.log("No data available");
                        }
                    })

                localStorage.setItem('userEmail', loginData.email)

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

    }

    function handleInputLoginChange(event) {

        const { name, value } = event.target

        setLoginData({

            ...loginData, [name]: value

        })

    }

    useEffect(() => {

        var userEmail = localStorage.getItem('userEmail')

        firebase.database().ref('admins').get('/admins')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail)
                            setUserIsLogged(true)

                    })
                }
                else {
                    console.log("No data available");
                }
            })

    }, []);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('requests/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                console.log(temp)
                setDataAdmin(temp)

            }

        });

    }, [])

    function handleSelectedStatus(event) {

        setRequestStatus(event.target.value)

    }

    function handleInputNote(event) {

        setNoteAdmin(event.target.value)

    }

    function handleIdSelected(event) {

        setSelectItem(event.target.value)

    }

    function finishOrder() {

        firebase.database()
            .ref('requests/' + selectItem)
            .remove()
            .then(() => alert("Pedido finalizado com sucesso!"))

    }

    function sendNoteAdmin(indexItem) {

        var dataTemp = dataAdmin

        firebase.database()
            .ref('requests/' + dataTemp[indexItem].id)
            .update({

                address: dataTemp[indexItem].address ? dataTemp[indexItem].address : '',
                adminNote: noteAdmin !== '' ? noteAdmin : dataTemp[indexItem].adminNote,
                cepNumber: dataTemp[indexItem].cepNumber ? dataTemp[indexItem].cepNumber : '',
                cep: dataTemp[indexItem].cep ? dataTemp[indexItem].cep : '',
                city: dataTemp[indexItem].city ? dataTemp[indexItem].city : '',
                complement: dataTemp[indexItem].complement ? dataTemp[indexItem].complement : '',
                cpf: dataTemp[indexItem].cpf ? dataTemp[indexItem].cpf : '',
                date: dataTemp[indexItem].date,
                dateToCompare: dataTemp[indexItem].dateToCompare,
                district: dataTemp[indexItem].district ? dataTemp[indexItem].district : '',
                houseNumber: dataTemp[indexItem].houseNumber ? dataTemp[indexItem].houseNumber : '',
                id: dataTemp[indexItem].id,
                products: dataTemp[indexItem].products,
                paymentProof: dataTemp[indexItem].paymentProof ? dataTemp[indexItem].paymentProof : '',
                payment: dataTemp[indexItem].payment,
                phoneNumber: dataTemp[indexItem].phoneNumber,
                pickupOption: dataTemp[indexItem].pickupOption,
                requestStatus: requestStatus,
                selectedTransport: dataTemp[indexItem].selectedTransport ? dataTemp[indexItem].selectedTransport : '',
                totalValue: dataTemp[indexItem].totalValue,
                userEmail: dataTemp[indexItem].userEmail,
                userName: dataTemp[indexItem].userName,


            })

        firebase.database()
            .ref('reportsSales/' + dataTemp[indexItem].id)
            .update({

                address: dataTemp[indexItem].address ? dataTemp[indexItem].address : '',
                adminNote: noteAdmin !== '' ? noteAdmin : dataTemp[indexItem].adminNote,
                cepNumber: dataTemp[indexItem].cepNumber ? dataTemp[indexItem].cepNumber : '',
                cep: dataTemp[indexItem].cep ? dataTemp[indexItem].cep : '',
                city: dataTemp[indexItem].city ? dataTemp[indexItem].city : '',
                complement: dataTemp[indexItem].complement ? dataTemp[indexItem].complement : '',
                cpf: dataTemp[indexItem].cpf ? dataTemp[indexItem].cpf : '',
                date: dataTemp[indexItem].date,
                dateToCompare: dataTemp[indexItem].dateToCompare,
                district: dataTemp[indexItem].district ? dataTemp[indexItem].district : '',
                houseNumber: dataTemp[indexItem].houseNumber ? dataTemp[indexItem].houseNumber : '',
                id: dataTemp[indexItem].id,
                products: dataTemp[indexItem].products,
                paymentProof: dataTemp[indexItem].paymentProof ? dataTemp[indexItem].paymentProof : '',
                payment: dataTemp[indexItem].payment,
                phoneNumber: dataTemp[indexItem].phoneNumber,
                pickupOption: dataTemp[indexItem].pickupOption,
                requestStatus: requestStatus,
                selectedTransport: dataTemp[indexItem].selectedTransport ? dataTemp[indexItem].selectedTransport : '',
                totalValue: dataTemp[indexItem].totalValue,
                userEmail: dataTemp[indexItem].userEmail,
                userName: dataTemp[indexItem].userName,

            }).then(() => {

                if (noteAdmin) {

                    window.alert('Recado enviado!')

                } else if (requestStatus) {

                    window.alert('Status alterado!')

                }

            })

        setNoteAdmin('')

    }

    function handleSelectedRequest(item) {

        setModalDataProducts(item)
        displayModal === "none" ? setDisplayModal("flex") : setDisplayModal("none")

    }

    function closeModal() {

        if (displayModal === "none")
            setDisplayModal("flex")
        else {
            setDisplayModal("none");
        }

    }

    if (userIsLogged) {

        return (

            <main>

                <div style={{ display: displayModal }} role="dialog" className='divModalRequests' >

                    <div className="modalContentRequests">

                        <div className="userInfosWrapper" >

                            {modalDataProducts ? (

                                <>

                                    {modalDataProducts.city ? (

                                        <div className="rowItens">
                                            <p>Cidade:</p>
                                            <b>{modalDataProducts.city}</b>
                                        </div>

                                    ) : ('')}

                                    {modalDataProducts.address ? (

                                        <div className="rowItens">
                                            <p>Endereço:</p>
                                            <b>{modalDataProducts.address}</b>
                                        </div>

                                    ) : ('')}

                                    {modalDataProducts.district ? (

                                        <div className="rowItens">
                                            <p>Bairro:</p>
                                            <b>{modalDataProducts.district}</b>
                                        </div>

                                    ) : ('')}

                                    {modalDataProducts.houseNumber ? (

                                        <div className="rowItens">
                                            <p>Número da casa:</p>
                                            <b>{modalDataProducts.houseNumber}</b>
                                        </div>

                                    ) : ('')}

                                    {modalDataProducts.complement ? (

                                        <div className="rowItens">
                                            <p>Complemento:</p>
                                            <b>{modalDataProducts.complement}</b>
                                        </div>

                                    ) : ('')}

                                    <div className="rowItens">

                                        {modalDataProducts.cepNumber ? (

                                            <>
                                                <p>CEP:</p>
                                                <b>{modalDataProducts.cepNumber}</b>
                                            </>

                                        ) : ('')}

                                        {modalDataProducts.cep ? (

                                            <>
                                                <p>CEP:</p>
                                                <b>{modalDataProducts.cep}</b>
                                            </>

                                        ) : ('')}

                                        {

                                            modalDataProducts.cpf ?

                                                <div className="rowItens">
                                                    <p>CPF do remetente:</p>
                                                    <b>{modalDataProducts.cpf}</b>
                                                </div>

                                                : <p></p>

                                        }
                                    </div>

                                </>

                            ) : ('')}

                        </div>

                        <div className="productModalInfos">

                            {modalDataProducts !== undefined ? (

                                modalDataProducts.products.map((product) => {

                                    return (

                                        <h1>{product.model}</h1>

                                    )

                                })

                            ) : ('')}

                            <span onClick={closeModal}>x</span>

                        </div>

                    </div>

                </div>

                <Header />

                <div id="MainRequests">

                    {dataAdmin.map((item, indexItem) => (

                        <div onClick={() => { handleSelectedRequest(item) }} className="boxOrder">

                            <h1>{item.userName}</h1>

                            <div className="infosWrapper">

                                <div className="userInfosWrapper" >

                                    {item.phoneNumber ? (

                                        <div className="rowItens">
                                            <p>Telefone</p>
                                            <b>{item.phoneNumber}</b>
                                        </div>

                                    ) : ('')}

                                    <div className="rowItens">
                                        <p>E-mail </p>
                                        <b>{item.userEmail}</b>
                                    </div>

                                </div>

                                <div className="userInfosWrapper" >

                                    {

                                        item.payment === "Pix" ? (

                                            item.paymentProof ? (

                                                <div className="rowItens">

                                                    <p>Tipo de pagamento</p>
                                                    <b>{item.payment} (<a style={{ textDecoration: 'none' }} target="_blank" href={item.paymentProof}>Comprovante</a>)</b>

                                                </div>

                                            ) :

                                                (

                                                    <div className="rowItens">
                                                        <p>Tipo de pagamento</p>
                                                        <b>{item.payment} (Aguardando comprovante)</b>
                                                    </div>

                                                )
                                        )


                                            : (

                                                <div className="rowItens">
                                                    <p>Tipo de pagamento</p>
                                                    <b>{item.payment}</b>
                                                </div>
                                            )

                                    }

                                    <div className="rowItens">
                                        <p>Como deseja receber</p>
                                        <b>{item.pickupOption}</b>
                                    </div>

                                </div>

                                <div className="userInfosWrapper" >

                                    <p>Status do pedido: <b>{item.requestStatus}</b></p>

                                    <div div className="requestStatus" >

                                        <select onChange={handleSelectedStatus}>

                                            <option selected disabled>Status do pedido</option>
                                            <option value="Preparando">Preparando</option>
                                            <option value="Enviado">Enviado</option>
                                            <option value="Entregue">Entregue</option>

                                        </select>

                                        <button onClick={() => { sendNoteAdmin(indexItem) }}>Alterar status</button>

                                    </div>

                                    <div className="clientMessage">

                                        <input
                                            placeholder='Recado para cliente'
                                            onChange={handleInputNote}
                                        />

                                        <button onClick={() => { sendNoteAdmin(indexItem) }} >Enviar Recado</button>

                                    </div>

                                </div>

                                {/* {

                                item.selectedTransport ?

                                    <>
                                        <div className="rowItens">
                                            <p>Transportadora escolhida:</p>
                                            <b>{item.selectedTransport.name}</b>
                                        </div>

                                        <div className="rowItens">
                                            <p>Valor do frete:</p>
                                            <b>R$ {item.selectedTransport.price}</b>
                                        </div>
                                    </>

                                    : <p></p>

                            } */}



                                {/* <div className="rightSizeBoxOrder" >

                                <p>Itens:</p>

                                <ul>

                                    {
                                        item.products.length > 1 ?

                                            item.products.map((product, indexListItem) => (

                                                <div className='flexDisplayRequestPage' >

                                                    <li><b>{product.model}</b></li>

                                                    <div className="productConfiguration">

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

                                                        <li id="productValue"><b>R$ {product.value.toFixed(2)}</b></li>

                                                    </div>

                                                </div>

                                            ))

                                            :

                                            <div className='flexDisplayRequestPage' >

                                                <li><b>{item.products[0].model}</b></li>

                                                <div className="productConfiguration">

                                                    {item.products[0].paperWidth ? (

                                                        <>
                                                            <li><b>Tamanho: {item.products[0].paperWidth}</b></li>
                                                        </>

                                                    ) : (

                                                        <li><b>Modelo do Kindle: {item.products[0].kindleModel}</b></li>

                                                    )}

                                                    {item.products[0].paper ? (

                                                        <li><b>Papel do miolo: {item.products[0].paper}</b></li>

                                                    ) : ('')}

                                                    <strong>Cor da capa: </strong>

                                                    {item.products[0].coverColors.map((color, index) => {

                                                        return (

                                                            <span key={index}>{(index ? ' + ' : '') + color.name}</span>

                                                        )

                                                    })}

                                                    {item.products[0].lineColor ? (

                                                        <li><b>Cor da linha: {item.products[0].lineColor.colorName}</b></li>

                                                    ) : ('')}

                                                    {item.products[0].elasticColor ? (

                                                        <li><b>Cor do elástico: {item.products[0].elasticColor.colorName}</b></li>

                                                    ) : ('')}

                                                    {item.products[0].spiralColor ? (

                                                        <li><b>Cor do espiral: {item.products[0].spiralColor}</b></li>

                                                    ) : ('')}

                                                    {item.products[0].clientNote ? (

                                                        <li><b>Observação: {item.products[0].clientNote}</b></li>

                                                    ) : ('')}

                                                    <li id="productValue"><b>R$ {item.products[0].value.toFixed(2)}</b></li>

                                                </div>

                                            </div>

                                    }

                                </ul>

                                <p>ID do pedido: <b>{item.id}</b></p>
                                <p>Valor total: <b>R$ {Number(item.totalValue).toFixed(2)}</b></p>

                                {

                                    item.adminNote !== '' ?
                                        <p>Observações da Cactus: <b>{item.adminNote}</b></p>
                                        : ''

                                }

                                <div className="clientMessage">
                                    <input
                                        placeholder='Recado para cliente'
                                        onChange={handleInputNote}
                                    />

                                    <div className="sendMessage">
                                        <a onClick={() => { sendNoteAdmin(indexItem) }} >Enviar Recado</a>
                                    </div>
                                </div>

                            </div> */}

                            </div>

                        </div>

                    ))

                    }

                    <div className="finalizarPedido">
                        <h3 className="texTripRequest" >Finalizar pedido</h3>

                        <select onChange={handleIdSelected} className="selectFinishOrder" >

                            <option className="optionSelectOrder" >Selecionar</option>

                            {dataAdmin.map((item) => (
                                <option className="optionSelectOrder" value={item.id} key={item.id}>{item.userName.split(' ')[0]}: {item.id}</option>
                            ))}

                        </select>

                        <a className="finishButton" onClick={() => finishOrder()} >Finalizar</a>
                    </div>

                </div >

                <Footer />

            </main >

        )

    } else {

        return (

            <div className='Admin'>

                <Header />

                <main id='mainRegister'>

                    <div className='adminRegister'>

                        <div className='titleAdmin' >

                            <h1>Bem vindos, equipe da Cactus 🌵</h1>

                        </div>

                        <fieldset>

                            <h1>Entrar</h1>

                            <input name='email' onChange={handleInputLoginChange} placeholder='E-mail' />

                            <input name='password' type='password' onChange={handleInputLoginChange} placeholder='Senha' />

                        </fieldset>

                        <div className='buttonsFormRegister' >

                            <Link id='enterButtonSignIn' onClick={makeLogin}>Entrar</Link>

                        </div>

                    </div>

                </main>

                <Footer />

            </div>

        )

    }

}