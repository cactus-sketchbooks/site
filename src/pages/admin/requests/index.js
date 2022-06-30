import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import './style.scss';
import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseConfig from '../../../FirebaseConfig.js';

export default function Requests() {
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataBackup, setDataBackup] = useState([]);
    const [selectItem, setSelectItem] = useState('');
    const [noteAdmin, setNoteAdmin] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [modalDataProducts, setModalDataProducts] = useState();
    const [displayModal, setDisplayModal] = useState('none');
    const [displaySearchResult, setDisplaySearchResult] = useState('none');
    const [searchInput, setSearchInput] = useState([]);
    const [dataPeriod, setDataPeriod] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const now = new Date();
    const timestamp = now.getTime();

    function makeLogin() {
        firebase
            .auth()
            .signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(() => {
                var userEmail = localStorage.getItem('userEmail');

                firebase
                    .database()
                    .ref('admins')
                    .get('/admins')
                    .then(function (snapshot) {
                        if (snapshot.exists()) {
                            var data = snapshot.val();
                            var temp = Object.keys(data).map(
                                (key) => data[key]
                            );

                            temp.map((item) => {
                                if (item.email === userEmail)
                                    setUserIsLogged(true);
                            });
                        } else {
                            console.log('No data available');
                        }
                    });

                localStorage.setItem('userEmail', loginData.email);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    function handleInputLoginChange(event) {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    useEffect(() => {
        var userEmail = localStorage.getItem('userEmail');

        firebase
            .database()
            .ref('admins')
            .get('/admins')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var temp = Object.keys(data).map((key) => data[key]);

                    temp.map((item) => {
                        if (item.email === userEmail) setUserIsLogged(true);
                    });
                } else {
                    console.log('No data available');
                }
            });
    }, []);

    useEffect(() => {
        if (!firebase.apps.length) firebase.initializeApp(FirebaseConfig);

        var firebaseRef = firebase.database().ref('requests/');

        firebaseRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                var temp = Object.keys(data).map((key) => data[key]);
                setDataAdmin(temp);
                setDataBackup(temp);
            }
        });
    }, []);

    function handleSelectedPeriod(event) {
        let period = event.target.value;
        let temp = [];
        setSelectedPeriod(event.target.value);
        setHasSearched(false);
        setNoteAdmin('');

        dataAdmin.map((request) => {
            if (request.timestamp) {
                if (period === 'Tudo') {
                    setDataPeriod(dataAdmin);
                } else {
                    if (
                        period === 'Dia' &&
                        timestamp - request.timestamp <= 86400000
                    ) {
                        temp.push(request);
                    }

                    if (
                        period === 'Semana' &&
                        (timestamp - request.timestamp) / 86400000 < 7
                    ) {
                        temp.push(request);
                    }

                    if (
                        period === 'Mês' &&
                        (timestamp - request.timestamp) / 86400000 <= 31
                    ) {
                        temp.push(request);
                    }

                    setDataPeriod(temp);
                }
            }
        });
    }

    function handleSelectedStatus(event) {
        setRequestStatus(event.target.value);
    }

    function handleInputNote(event) {
        setNoteAdmin(event.target.value);
    }

    function handleIdSelected(event) {
        setSelectItem(event.target.value);
    }

    function finishOrder() {
        firebase
            .database()
            .ref('requests/' + selectItem)
            .remove()
            .then(() => alert('Pedido finalizado com sucesso!'));

        window.location.reload();
    }

    function sendNoteAdmin(indexItem) {
        if (dataPeriod.length > 0) {
            var dataTemp = dataPeriod;
        } else {
            var dataTemp = dataAdmin;
        }

        firebase
            .database()
            .ref('requests/' + dataTemp[indexItem].id)
            .update({
                address: dataTemp[indexItem].address
                    ? dataTemp[indexItem].address
                    : '',
                adminNote:
                    noteAdmin !== ''
                        ? noteAdmin
                        : dataTemp[indexItem].adminNote,
                cepNumber: dataTemp[indexItem].cepNumber
                    ? dataTemp[indexItem].cepNumber
                    : '',
                cep: dataTemp[indexItem].cep ? dataTemp[indexItem].cep : '',
                city: dataTemp[indexItem].city ? dataTemp[indexItem].city : '',
                complement: dataTemp[indexItem].complement
                    ? dataTemp[indexItem].complement
                    : '',
                cpf: dataTemp[indexItem].cpf ? dataTemp[indexItem].cpf : '',
                date: dataTemp[indexItem].date,
                dateToCompare: dataTemp[indexItem].dateToCompare,
                district: dataTemp[indexItem].district
                    ? dataTemp[indexItem].district
                    : '',
                houseNumber: dataTemp[indexItem].houseNumber
                    ? dataTemp[indexItem].houseNumber
                    : '',
                id: dataTemp[indexItem].id,
                products: dataTemp[indexItem].products,
                paymentProof: dataTemp[indexItem].paymentProof
                    ? dataTemp[indexItem].paymentProof
                    : '',
                payment: dataTemp[indexItem].payment,
                phoneNumber: dataTemp[indexItem].phoneNumber,
                pickupOption: dataTemp[indexItem].pickupOption,
                requestStatus: requestStatus,
                selectedTransport: dataTemp[indexItem].selectedTransport
                    ? dataTemp[indexItem].selectedTransport
                    : '',
                totalValue: dataTemp[indexItem].totalValue,
                userEmail: dataTemp[indexItem].userEmail,
                userName: dataTemp[indexItem].userName,
            });

        firebase
            .database()
            .ref('reportsSales/' + dataTemp[indexItem].id)
            .update({
                address: dataTemp[indexItem].address
                    ? dataTemp[indexItem].address
                    : '',
                adminNote:
                    noteAdmin !== ''
                        ? noteAdmin
                        : dataTemp[indexItem].adminNote,
                cepNumber: dataTemp[indexItem].cepNumber
                    ? dataTemp[indexItem].cepNumber
                    : '',
                cep: dataTemp[indexItem].cep ? dataTemp[indexItem].cep : '',
                city: dataTemp[indexItem].city ? dataTemp[indexItem].city : '',
                complement: dataTemp[indexItem].complement
                    ? dataTemp[indexItem].complement
                    : '',
                cpf: dataTemp[indexItem].cpf ? dataTemp[indexItem].cpf : '',
                date: dataTemp[indexItem].date,
                dateToCompare: dataTemp[indexItem].dateToCompare,
                district: dataTemp[indexItem].district
                    ? dataTemp[indexItem].district
                    : '',
                houseNumber: dataTemp[indexItem].houseNumber
                    ? dataTemp[indexItem].houseNumber
                    : '',
                id: dataTemp[indexItem].id,
                products: dataTemp[indexItem].products,
                paymentProof: dataTemp[indexItem].paymentProof
                    ? dataTemp[indexItem].paymentProof
                    : '',
                payment: dataTemp[indexItem].payment,
                phoneNumber: dataTemp[indexItem].phoneNumber,
                pickupOption: dataTemp[indexItem].pickupOption,
                requestStatus: requestStatus,
                selectedTransport: dataTemp[indexItem].selectedTransport
                    ? dataTemp[indexItem].selectedTransport
                    : '',
                totalValue: dataTemp[indexItem].totalValue,
                userEmail: dataTemp[indexItem].userEmail,
                userName: dataTemp[indexItem].userName,
            })
            .then(() => {
                if (noteAdmin) {
                    window.alert('Recado enviado!');
                } else if (requestStatus) {
                    window.alert('Status alterado!');
                }
            });

        setNoteAdmin('');
    }

    function handleSelectedRequest(item) {
        setModalDataProducts(item);
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

    function handleSearchInput(event) {
        setHasSearched(true);

        if (event.key === 'Enter') {
            clearSearchName();
            searchName();
        }

        setSearchInput(event.target.value);
    }

    function searchName() {
        var name = [];
        setHasSearched(true);
        setNoteAdmin('');

        dataAdmin.map((item) => {
            var nameToSearch = item.userName.toLowerCase();
            var search = searchInput.toLowerCase();

            if (nameToSearch.includes(search)) name.push(item);
        });

        setDataAdmin(name);
        setDisplaySearchResult('flex');
    }

    function clearSearchName() {
        setDisplaySearchResult('none');
        setNoteAdmin('');
        setDataAdmin(dataBackup);
        setSelectedPeriod('');
    }

    if (userIsLogged) {
        return (
            <main id='mainRequestAdmin'>
                <div
                    style={{ display: displayModal }}
                    role='dialog'
                    className='divModalRequests'
                >
                    <div className='modalContentRequests'>
                        <div className='closeModalDiv'>
                            <span onClick={closeModal}>x</span>
                        </div>

                        {modalDataProducts ? (
                            <div className='modalFirstInfo'>
                                <h1>{modalDataProducts.userName}</h1>
                                <span>{modalDataProducts.id}</span>
                            </div>
                        ) : (
                            ''
                        )}

                        {modalDataProducts ? (
                            <h2>R$ {modalDataProducts.totalValue}</h2>
                        ) : (
                            ''
                        )}

                        <div className='userInfosWrapper'>
                            {modalDataProducts ? (
                                <>
                                    {modalDataProducts.city ? (
                                        <div className='userData'>
                                            <p>Cidade:</p>
                                            <b>{modalDataProducts.city}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.address ? (
                                        <div className='userData'>
                                            <p>Endereço:</p>
                                            <b>{modalDataProducts.address}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.district ? (
                                        <div className='userData'>
                                            <p>Bairro:</p>
                                            <b>{modalDataProducts.district}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.houseNumber ? (
                                        <div className='userData'>
                                            <p>Número da casa:</p>
                                            <b>
                                                {modalDataProducts.houseNumber}
                                            </b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.complement ? (
                                        <div className='userData'>
                                            <p>Complemento:</p>
                                            <b>
                                                {modalDataProducts.complement}
                                            </b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.cepNumber ? (
                                        <div className='userData'>
                                            <p>CEP:</p>
                                            <b>{modalDataProducts.cepNumber}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.cep ? (
                                        <div className='userData'>
                                            <p>CEP:</p>
                                            <b>{modalDataProducts.cep}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.cpf ? (
                                        <div className='userData'>
                                            <p>CPF do remetente:</p>
                                            <b>{modalDataProducts.cpf}</b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.pickupOption ===
                                    'Impresso módico ou Carta registrada' ? (
                                        <div className='userData'>
                                            <p>Valor do frete: </p>
                                            <b>
                                                R${' '}
                                                {
                                                    modalDataProducts.economicTransportValue
                                                }
                                            </b>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {modalDataProducts.selectedTransport ? (
                                        <>
                                            <div className='userData'>
                                                <p>Transportadora escolhida:</p>
                                                <b>
                                                    {
                                                        modalDataProducts
                                                            .selectedTransport
                                                            .name
                                                    }
                                                </b>
                                            </div>

                                            <div className='userData'>
                                                <p>Valor do frete:</p>
                                                <b>
                                                    R${' '}
                                                    {
                                                        modalDataProducts
                                                            .selectedTransport
                                                            .price
                                                    }
                                                </b>
                                            </div>
                                        </>
                                    ) : (
                                        <p></p>
                                    )}
                                </>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className='productModalInfos'>
                            {modalDataProducts !== undefined
                                ? modalDataProducts.products.map((product) => {
                                      return (
                                          <>
                                              <ul className='productCard'>
                                                  <h4>{product.model}</h4>

                                                  {product.paperWidth ? (
                                                      <li className='productData'>
                                                          <span>Tamanho: </span>
                                                          <b>
                                                              {
                                                                  product.paperWidth
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      <li className='productData'>
                                                          <span>
                                                              Modelo do Kindle:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product.kindleModel
                                                              }
                                                          </b>
                                                      </li>
                                                  )}

                                                  {/* Aqui tem 2 conferencias primeiro se existe, e depois  se o paper é uma string
                                                isso é feito pq no inicio o paper (como só tinha 1 tipo de papel) era uma string
                                                agora, o paper é um array de objetos, contendo o nome do papel e a quantidade de cada um escolhido
                                                Por isso que se nao for uma string (um pedido feito depois da adicao da combinacao de papeis ou
                                                um sketch que continua so podendo um tipo de papel, como o Sertao), ele mostra cada um dos tipos do papeis 
                                                que estao no array de objetos salvo*/}
                                                  {product.paper ? (
                                                      typeof product.paper ===
                                                      'string' ? (
                                                          <li>
                                                              <b>
                                                                  Papel do
                                                                  miolo:
                                                              </b>{' '}
                                                              {product.paper}
                                                          </li>
                                                      ) : (
                                                          <li>
                                                              <b>
                                                                  Papel do
                                                                  miolo:
                                                              </b>{' '}
                                                              {product.paper.map(
                                                                  (
                                                                      papel,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <p>
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
                                                      Cor da capa:
                                                      {product.coverColors.map(
                                                          (color, index) => {
                                                              return (
                                                                  <span
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <b>
                                                                          {(index
                                                                              ? ' + '
                                                                              : '') +
                                                                              color.name}
                                                                      </b>
                                                                  </span>
                                                              );
                                                          }
                                                      )}
                                                  </li>

                                                  {product.lineColor ? (
                                                      <li className='productData'>
                                                          <span>
                                                              Cor da linha:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product
                                                                      .lineColor
                                                                      .colorName
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      ''
                                                  )}

                                                  {product.elasticColor ? (
                                                      <li className='productData'>
                                                          <span>
                                                              Cor do elástico:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product
                                                                      .elasticColor
                                                                      .colorName
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      ''
                                                  )}

                                                  {product.spiralColor ? (
                                                      <li className='productData'>
                                                          <span>
                                                              Cor do espiral:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product.spiralColor
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      ''
                                                  )}
                                                  {product.sketchFinish ? (
                                                      <li className='productData'>
                                                          <span>
                                                              Tipo de
                                                              Acabamento:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product.sketchFinish
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      ''
                                                  )}

                                                  {product.size ? (
                                                      <>
                                                          <li className='productData'>
                                                              <span>
                                                                  Altura:{' '}
                                                              </span>
                                                              <b>
                                                                  {
                                                                      product
                                                                          .size
                                                                          .height
                                                                  }{' '}
                                                                  cm
                                                              </b>
                                                          </li>

                                                          <li className='productData'>
                                                              <span>
                                                                  Largura:{' '}
                                                              </span>
                                                              <b>
                                                                  {
                                                                      product
                                                                          .size
                                                                          .width
                                                                  }{' '}
                                                                  cm
                                                              </b>
                                                          </li>

                                                          <li className='productData'>
                                                              <span>
                                                                  Comprimento:{' '}
                                                              </span>
                                                              <b>
                                                                  {
                                                                      product
                                                                          .size
                                                                          .length
                                                                  }{' '}
                                                                  cm
                                                              </b>
                                                          </li>

                                                          {product.size
                                                              .weight ? (
                                                              <li className='productData'>
                                                                  <span>
                                                                      Peso:{' '}
                                                                  </span>
                                                                  <b>
                                                                      {
                                                                          product
                                                                              .size
                                                                              .weight
                                                                      }{' '}
                                                                      kg
                                                                  </b>
                                                              </li>
                                                          ) : (
                                                              ''
                                                          )}
                                                      </>
                                                  ) : null}

                                                  {product.clientNote ? (
                                                      <li className='productData'>
                                                          <span>
                                                              Observação:{' '}
                                                          </span>
                                                          <b>
                                                              {
                                                                  product.clientNote
                                                              }
                                                          </b>
                                                      </li>
                                                  ) : (
                                                      ''
                                                  )}

                                                  <li id='productValue'>
                                                      <b>
                                                          R${' '}
                                                          {product.value.toFixed(
                                                              2
                                                          )}
                                                      </b>
                                                  </li>
                                              </ul>
                                          </>
                                      );
                                  })
                                : ''}
                        </div>
                    </div>
                </div>

                <Header />

                <div id='MainRequests'>
                    <div className='filterNameSearch'>
                        <h3>Pesquisa por nome</h3>
                        <p>Limpe a pesquisa antes de realizar uma nova</p>

                        <div className='searchUsername'>
                            <input
                                type='text'
                                placeholder='Dê Enter para realizar a busca'
                                onKeyDown={handleSearchInput}
                            />
                        </div>
                    </div>

                    <section
                        style={{ display: displaySearchResult }}
                        className='searchUsernameResult'
                    >
                        <div className='divSearchUsernameResult'>
                            <a
                                onClick={() => {
                                    clearSearchName();
                                }}
                            >
                                Limpar pesquisa
                            </a>
                        </div>
                    </section>

                    <div className='selectWrapper'>
                        <div className='finishOrder'>
                            <h3>Finalizar pedido</h3>

                            <div className='finishOrderWrapper'>
                                <select
                                    onChange={handleIdSelected}
                                    className='selectFinishOrder'
                                >
                                    <option
                                        disabled
                                        className='optionSelectOrder'
                                    >
                                        Selecionar
                                    </option>

                                    {dataPeriod.length > 0
                                        ? dataPeriod.map((item) => (
                                              <option
                                                  className='optionSelectOrder'
                                                  value={item.id}
                                                  key={item.id}
                                              >
                                                  {item.userName.split(' ')[0]}:{' '}
                                                  {item.id}
                                              </option>
                                          ))
                                        : dataAdmin.map((item) => (
                                              <option
                                                  className='optionSelectOrder'
                                                  value={item.id}
                                                  key={item.id}
                                              >
                                                  {item.userName.split(' ')[0]}:{' '}
                                                  {item.id}
                                              </option>
                                          ))}
                                </select>

                                <button
                                    className='finishButton'
                                    onClick={() => finishOrder()}
                                >
                                    Finalizar
                                </button>
                            </div>
                        </div>

                        <div className='selectPeriodChangeDiv'>
                            {selectedPeriod ? (
                                <>
                                    <h3>Selecione um período abaixo</h3>

                                    <select
                                        id='selectPeriodChange'
                                        onChange={handleSelectedPeriod}
                                    >
                                        <option>Tudo</option>
                                        <option>Dia</option>
                                        <option>Semana</option>
                                        <option>Mês</option>
                                    </select>
                                </>
                            ) : (
                                <>
                                    <h3>Selecione um período abaixo</h3>

                                    <select
                                        id='selectPeriodChange'
                                        onChange={handleSelectedPeriod}
                                    >
                                        <option selected>Tudo</option>
                                        <option>Dia</option>
                                        <option>Semana</option>
                                        <option>Mês</option>
                                    </select>
                                </>
                            )}
                        </div>
                    </div>

                    <h2
                        id='resultSearch'
                        style={{ color: '#fff', display: displaySearchResult }}
                    >
                        Resultado da busca
                    </h2>

                    <div className='boxOrderWrapper'>
                        {selectedPeriod && !hasSearched
                            ? dataPeriod.map((item, indexItem) => (
                                  <div className='boxOrder'>
                                      <h1>{item.userName}</h1>
                                      <span>{item.date}</span>

                                      <div className='infosWrapper'>
                                          <div className='userInfosWrapper'>
                                              {item.phoneNumber ? (
                                                  <div className='rowItens'>
                                                      <p>Telefone</p>
                                                      <b>{item.phoneNumber}</b>
                                                  </div>
                                              ) : (
                                                  ''
                                              )}

                                              <div className='rowItens'>
                                                  <p>E-mail </p>
                                                  <b>{item.userEmail}</b>
                                              </div>
                                          </div>

                                          <div className='userInfosWrapper'>
                                              {item.payment === 'Pix' ? (
                                                  item.paymentProof ? (
                                                      <div className='rowItens'>
                                                          <p>
                                                              Tipo de pagamento
                                                          </p>
                                                          <b>
                                                              {item.payment} (
                                                              <a
                                                                  style={{
                                                                      textDecoration:
                                                                          'none',
                                                                  }}
                                                                  target='_blank'
                                                                  href={
                                                                      item.paymentProof
                                                                  }
                                                              >
                                                                  Comprovante
                                                              </a>
                                                              )
                                                          </b>
                                                      </div>
                                                  ) : (
                                                      <div className='rowItens'>
                                                          <p>
                                                              Tipo de pagamento
                                                          </p>
                                                          <b>
                                                              {item.payment}{' '}
                                                              (Aguardando
                                                              comprovante)
                                                          </b>
                                                      </div>
                                                  )
                                              ) : (
                                                  <div className='rowItens'>
                                                      <p>Tipo de pagamento</p>
                                                      <b>{item.payment}</b>
                                                  </div>
                                              )}

                                              <div className='rowItens'>
                                                  <p>Como deseja receber</p>
                                                  <b>{item.pickupOption}</b>
                                              </div>
                                          </div>

                                          <div className='userInfosWrapper'>
                                              <button
                                                  onClick={() => {
                                                      handleSelectedRequest(
                                                          item
                                                      );
                                                  }}
                                              >
                                                  Ver pedido
                                              </button>

                                              {item.requestStatus !== '' ? (
                                                  <p id='status'>
                                                      Status do pedido:{' '}
                                                      <b>
                                                          {item.requestStatus}
                                                      </b>
                                                  </p>
                                              ) : (
                                                  <p id='status'>
                                                      Status do pedido:{' '}
                                                      <b>Novo pedido!</b>
                                                  </p>
                                              )}

                                              <div
                                                  div
                                                  className='requestStatus'
                                              >
                                                  <select
                                                      onChange={
                                                          handleSelectedStatus
                                                      }
                                                  >
                                                      <option selected disabled>
                                                          Status do pedido
                                                      </option>
                                                      <option value='Preparando'>
                                                          Preparando
                                                      </option>
                                                      <option value='Enviado'>
                                                          Enviado
                                                      </option>
                                                      <option value='Entregue'>
                                                          Entregue
                                                      </option>
                                                  </select>

                                                  <button
                                                      onClick={() => {
                                                          sendNoteAdmin(
                                                              indexItem
                                                          );
                                                      }}
                                                  >
                                                      Alterar status
                                                  </button>
                                              </div>

                                              <div className='trackingCode'>
                                                <input
                                                      placeholder='Código de Rastreio'
                                                />
                                                
                                                <button>
                                                    Enviar Código de Rastreio
                                                </button>
                                                </div>      
                                                
                                              <div className='clientMessage'>
                                                  <input
                                                      placeholder='Recado para cliente'
                                                      onChange={handleInputNote}
                                                  />

                                                  <button
                                                      onClick={() => {
                                                          sendNoteAdmin(
                                                              indexItem
                                                          );
                                                      }}
                                                  >
                                                    Enviar Recado
                                                  </button>

                                                  {item.adminNote ? (
                                                      <div className='adminNoteDiv'>
                                                          <p>Nota da Cactus</p>
                                                          <b>
                                                              {item.adminNote}
                                                          </b>
                                                      </div>
                                                  ) : (
                                                      ''
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : dataAdmin.map((item, indexItem) => (
                                  <div className='boxOrder'>
                                      <h1>{item.userName}</h1>

                                      <div className='infosWrapper'>
                                          <div className='userInfosWrapper'>
                                              {item.phoneNumber ? (
                                                  <div className='rowItens'>
                                                      <p>Telefone</p>
                                                      <b>{item.phoneNumber}</b>
                                                  </div>
                                              ) : (
                                                  ''
                                              )}

                                              <div className='rowItens'>
                                                  <p>E-mail </p>
                                                  <b>{item.userEmail}</b>
                                              </div>
                                          </div>

                                          <div className='userInfosWrapper'>
                                              {item.payment === 'Pix' ? (
                                                  item.paymentProof ? (
                                                      <div className='rowItens'>
                                                          <p>
                                                              Tipo de pagamento
                                                          </p>
                                                          <b>
                                                              {item.payment} (
                                                              <a
                                                                  style={{
                                                                      textDecoration:
                                                                          'none',
                                                                  }}
                                                                  target='_blank'
                                                                  href={
                                                                      item.paymentProof
                                                                  }
                                                              >
                                                                  Comprovante
                                                              </a>
                                                              )
                                                          </b>
                                                      </div>
                                                  ) : (
                                                      <div className='rowItens'>
                                                          <p>
                                                              Tipo de pagamento
                                                          </p>
                                                          <b>
                                                              {item.payment}{' '}
                                                              (Aguardando
                                                              comprovante)
                                                          </b>
                                                      </div>
                                                  )
                                              ) : (
                                                  <div className='rowItens'>
                                                      <p>Tipo de pagamento</p>
                                                      <b>{item.payment}</b>
                                                  </div>
                                              )}

                                              <div className='rowItens'>
                                                  <p>Como deseja receber</p>
                                                  <b>{item.pickupOption}</b>
                                              </div>
                                          </div>

                                          <div className='userInfosWrapper'>
                                              <button
                                                  onClick={() => {
                                                      handleSelectedRequest(
                                                          item
                                                      );
                                                  }}
                                              >
                                                  Ver pedido
                                              </button>

                                              {item.requestStatus !== '' ? (
                                                  <p id='status'>
                                                      Status do pedido:{' '}
                                                      <b>
                                                          {item.requestStatus}
                                                      </b>
                                                  </p>
                                              ) : (
                                                  <p id='status'>
                                                      Status do pedido:{' '}
                                                      <b
                                                          style={{
                                                              color: '#DED040',
                                                          }}
                                                      >
                                                          Novo pedido!
                                                      </b>
                                                  </p>
                                              )}

                                              <div
                                                  div
                                                  className='requestStatus'
                                              >
                                                  <select
                                                      onChange={
                                                          handleSelectedStatus
                                                      }
                                                  >
                                                      <option selected disabled>
                                                          Status do pedido
                                                      </option>
                                                      <option value='Preparando'>
                                                          Preparando
                                                      </option>
                                                      <option value='Enviado'>
                                                          Enviado
                                                      </option>
                                                      <option value='Entregue'>
                                                          Entregue
                                                      </option>
                                                  </select>

                                                  <button
                                                      onClick={() => {
                                                          sendNoteAdmin(
                                                              indexItem
                                                          );
                                                      }}
                                                  >
                                                      Alterar status
                                                  </button>
                                              </div>
                                            
                                              <div className='trackingCode'>
                                                <input
                                                      placeholder='Código de Rastreio'
                                                />
                                                
                                                <button>
                                                    Enviar Código <p>de Rastreio</p> 
                                                </button>
                                                </div>

                                              <div className='clientMessage'>
                                                  <input
                                                      placeholder='Recado para cliente'
                                                      onChange={handleInputNote}
                                                  />

                                                  <button
                                                      onClick={() => {
                                                          sendNoteAdmin(
                                                              indexItem
                                                          );
                                                      }}
                                                  >
                                                      Enviar Recado
                                                  </button>

                                                  {item.adminNote ? (
                                                      <div className='adminNoteDiv'>
                                                          <p>Nota da Cactus</p>
                                                          <b>
                                                              {item.adminNote}
                                                          </b>
                                                      </div>
                                                  ) : (
                                                      ''
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>

                <Footer />
            </main>
        );
    } else {
        return (
            <div className='Admin'>
                <Header />

                <main id='mainRegister'>
                    <div className='adminRegister'>
                        <div className='titleAdmin'>
                            <h1>Bem vindos, equipe da Cactus 🌵</h1>
                        </div>

                        <fieldset>
                            <h1>Entrar</h1>

                            <input
                                name='email'
                                onChange={handleInputLoginChange}
                                placeholder='E-mail'
                            />

                            <input
                                name='password'
                                type='password'
                                onChange={handleInputLoginChange}
                                placeholder='Senha'
                            />
                        </fieldset>

                        <div className='buttonsFormRegister'>
                            <Link id='enterButtonSignIn' onClick={makeLogin}>
                                Entrar
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }
}
