import React from 'react';
import './style.scss';

import logo from '../../images/cactopng2.png';
// import sapo from '../../images/sapofoto.png';

export default function SignUp() {

    return (

            <section id="SectionSignUp">

                <div className="textIntroSignUp">

                    <div className="imageLogoWrapper">

                       <a href="/"> <img src={logo} alt="logo cactus" /> </a>

                    </div>

                    <h1>Faça arte. <br />Crie com a Cactus.</h1>

                </div>

                <div className="signUpDiv">

                    <form className="formRegister">

                        <input id='name' name='name' placeholder='Nome completo' />
                        <input id='email' name='email' placeholder='E-mail' />

                        <div className="passwordDiv">

                            <input id='password' name='password' type="password" placeholder='Senha' />
                            <input id='passwordConfirm' name='passwordConfirm' type="password" placeholder='Confirmação de senha' />

                        </div>

                        <input id='phoneNumber' name='phoneNumber' placeholder='Telefone' />
                        <input id='birthDate' name='birthDate' type='date' placeholder='Data de nascimento' />
                        <input id='cepNumber' name='cepNumber' placeholder='CEP' />

                        <div className="cityDiv">

                            <select name="state" id="uf">

                                <option disabled selected value="0" >Estado</option>

                                <option value="Acre">Acre</option>
                                <option value="Alagoas">Alagoas</option>
                                <option value="Amapá">Amapá</option>
                                <option value="Amazonas">Amazonas</option>
                                <option value="Bahia">Bahia</option>
                                <option value="Ceará">Ceará</option>
                                <option value="Distrito Federal">Distrito Federal</option>
                                <option value="Espírito Santo">Espírito Santo</option>
                                <option value="Centro-Oeste">Centro-Oeste</option>
                                <option value="Maranhão">Maranhão</option>
                                <option value="Mato Grosso">Mato Grosso</option>
                                <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                                <option value="Minas Gerais">Minas Gerais</option>
                                <option value="Pará">Pará</option>
                                <option value="Paraíba">Paraíba</option>
                                <option value="Paraná">Paraná</option>
                                <option value="Pernambuco">Pernambuco</option>
                                <option value="Piauí">Piauí</option>
                                <option value="Rio de Janeiro">Rio de Janeiro</option>
                                <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                                <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                                <option value="Rondônia">Rondônia</option>
                                <option value="Roraima">Roraima</option>
                                <option value="Santa Catarina">Santa Catarina</option>
                                <option value="São Paulo">São Paulo</option>
                                <option value="Sergipe">Sergipe</option>
                                <option value="Tocantins">Tocantins</option>

                            </select>

                            <input name="city" id="localidade" placeholder="Cidade" />

                            {/* <select name="city" id="localidade" onChange={handleSelectedCity} value={selectedCity} >
                                <option value="0">Selecione uma cidade</option>
                                {city.map(city => (
                                    <option key={city} value={city} >{city}</option>
                                ))}
                            </select> */}

                        </div>
                        <input id='address' name='address' placeholder='Endereço' />
                        <input id='houseNumber' name='houseNumber' placeholder='Número da residência' />
                        <input id='district' name='district' placeholder='Bairro' />
                        <input id='complement' name='complement' placeholder='Complemento' />

                        </form>

                    </div>

            </section >

    )
}