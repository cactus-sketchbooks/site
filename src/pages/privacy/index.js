import React from 'react';

import './style.scss';
import 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Privacy() {
    return (
        <html id='termsPage'>
            <body id='termsInfos'>
                <h1>Política de privacidade geral</h1>

                <p>Data de atualização: 25 de março de 2022</p>

                <article>
                    <h2>1. Objetivo</h2>

                    <p>
                        A presente política tem por objetivo descrever as
                        medidas de segurança e proteção de dados aplicadas nos
                        processos de tratamento de dados pessoais em toda a
                        plataforma Cactus Sketchbooks, com sede na cidade de São
                        Luís, Estado do Maranhão, situada na Travessa da Lapa,
                        nº 162, Centro, CEP 65010-330.
                    </p>

                    <p>
                        Para utilizar os serviços oferecidos pela Cactus em sua
                        plataforma, sejam eles de cadastro na plataforma, compra
                        dos nossos produtos, ou para nos mandar uma mensagem
                        pelos nossos canais de comunicação, nós precisaremos de
                        alguns dados para que possamos te dar o melhor
                        atendimento que você merece, porém sempre preservando a
                        sua privacidade conforme demonstraremos a seguir.
                    </p>
                </article>

                <article>
                    <h2>2. Quais dados pessoais são coletados e por quê?</h2>

                    <div className='usePurpose'>
                        <strong>
                            <h3>Cadastro/Login</h3>
                        </strong>

                        <p>
                            <strong>Dados coletados: </strong> Nome, e-mail,
                            telefone, data de nascimento, CEP, estado, cidade,
                            endereço, número da residência, bairro, complemento.
                        </p>

                        <p>
                            <strong>Finalidade: </strong>Identificarmos você;
                            possuir os dados necessários para entrar em contato
                            caso haja necessidade, auxiliar em algum tipo de
                            situação, fornecer informações sobre sua compra e
                            para os demais fins; possuir dados necessários para
                            entrega de nossos produtos; conhecermos a faixa
                            etária de nossos usuários.
                        </p>
                    </div>

                    <div className='usePurpose'>
                        <strong>
                            <h3>Formulário de contato</h3>
                        </strong>

                        <p>
                            <strong>Dados coletados: </strong> Nome, e-mail,
                            telefone
                        </p>

                        <p>
                            <strong>Finalidade: </strong>Identificarmos você
                            para que possamos entrar em contato e atender o que
                            foi solicitado através da sua mensagem enviada.
                        </p>
                    </div>

                    <div className='usePurpose'>
                        <strong>
                            <h3>Compras</h3>
                        </strong>

                        <p>
                            <strong>Dados coletados: </strong> Nome do
                            destinatário, telefone, endereço de entrega, número
                            da residência, complemento, bairro, cidade, CPF,
                            CEP.
                        </p>

                        <p>
                            <strong>Finalidade: </strong>Possuir os dados
                            necessários para a efetuação da entrega caso a opção
                            escolhida seja diferente da opção de retirada
                            física; Possuir os dados necessários para a emissão
                            da etiqueta de entrega por transportadora utilizada
                            pela plataforma da Melhor Envio.
                        </p>
                    </div>
                </article>

                <article>
                    <h2>3. Como utilizamos os seus dados pessoais?</h2>

                    <p>
                        Os dados pessoais e pessoais sensíveis que nos forem
                        disponibilizados serão objetos de tratamento
                        automatizado e incorporados aos arquivos da Cactus,
                        sendo esta Sociedade titular e responsável de seus
                        próprios arquivos, os quais, conforme a norma vigente,
                        encontram-se devidamente registrados.
                    </p>

                    <p>
                        Os dados dos usuários desta plataforma serão utilizados
                        unica e exclusivamente para identificação e contato com
                        o usuário. Nenhum dado é solicitado sem que haja
                        finalidade para seu uso.
                    </p>

                    <p>
                        No caso de que nos envie dados de um terceiro, por
                        exemplo para informar a um conhecido sobre a publicação
                        de uma postagem na nossa página de <i>Use e Apareça</i>,
                        ou para recomendar-lhe nosso site, é o responsável por
                        haver obtido o consentimento da pessoa que está nos
                        indicando.
                    </p>
                </article>

                <article>
                    <h2>
                        4. Consentimento do usuário para o tratamento e cessão
                        dos dados pessoais
                    </h2>

                    <p>
                        Ao preencher o formulário de cadastro e ao clicar no
                        botaão de cadastrar, o usuário declara ter lido e
                        aceitado expressamente a presente Política de
                        Privacidade e os{' '}
                        <Link
                            to='/termosDeUso'
                            target='_blank'
                            rel='noreferrer'
                        >
                            Termos de Uso
                        </Link>{' '}
                        da Cactus, e declara seu consentimento inequívoco e
                        expresso ao tratamento de seus dados pessoais e serviços
                        que presta o site.
                    </p>
                </article>

                <article>
                    <h2>5. Por quanto tempo armazenamos os seus dados?</h2>

                    <p>
                        Os dados de caráter pessoal fornecidos pelo usuários são
                        armazenados enquanto durar a relação e não houver pedido
                        de apagamento ou cancelamento da prestação dos nossos
                        serviços.
                    </p>

                    <p>
                        Caso não deseje mais os serviços oferecidos pela Cactus,
                        a exclusão de sua conta pode ser feita a qualquer
                        momento através do seu perfil.
                    </p>
                </article>

                <article>
                    <h2>6. Com quem compartilhamos os seus dados?</h2>

                    <p>
                        A Cactus cederá seus dados fornecidos às empresas
                        responsáveis pela execução e transporte da sua compra.
                        Além disso, os dados pessoais coletados e as atividades
                        registradas podem ser compartilhados com autoridades
                        judiciais, administrativas ou governamentais
                        competentes, sempre que houver determinação legal,
                        requerimento, requisição ou ordem judicial.{' '}
                    </p>

                    <p>
                        Os seus dados inseridos referentes ao pagamento online
                        são de responsabilidade do PayPal. Todo tratamento das
                        informações inseridas no formulário de pagamento são
                        realizadas pela plataforma.
                    </p>
                </article>

                <article>
                    <h2>7. Quais os direitos dos usuários?</h2>

                    <p>
                        De acordo com a legislação vigente, você, usuário, tem
                        os seguintes direitos:
                    </p>

                    <ul>
                        <li>
                            Confirmação dos dados: O Usuário poderá solicitar a
                            confirmação da existência de tratamento dos seus
                            Dados de caráter pessoal por meio de qualquer de
                            nossas plataformas de contato.
                        </li>

                        <li>
                            Atualização dos dados: Caberá ao usuário, enquanto
                            ativo, manter os dados pessoais atualizados.
                        </li>

                        <li>
                            Poderá o Usuário manifestar sua oposição e/ou
                            revogar o consentimento quanto ao uso de seus Dados
                            de caráter pessoal, e nesse caso, o funcionamento
                            adequado do site e dos serviços tornar-se-ão
                            indisponíveis.
                        </li>

                        <li>
                            O Usuário titular dos dados pessoais poderá, no
                            término e nas limitações estabelecidas na norma
                            vigente, solicitar a exclusão dos seus dados,
                            através dos seguintes meios:
                        </li>

                        <li>
                            Escrevendo ao formulário de contato, identificando
                            as seguintes informações: O endereço de e-mail com o
                            qual está cadastrado em nossa base de dados.
                            Telefone de contato, com DDD.
                        </li>

                        <li>
                            Mediante correspondência enviada via Correios, ao
                            endereço mencionado no cabeçalho da presente
                            “Política de Privacidade”, indicando o assunto
                            "RETIRADA DE REGISTRO DA INTERNET". Na
                            correspondência, deverão constar: O endereço de
                            e-mail com o qual está cadastrado em nossa base de
                            dados, telefone de contato, com DDD.
                        </li>
                    </ul>

                    <p>
                        Em ambos os meios, a comunicação deverá ser clara quanto
                        à solicitação do usuário. A entrega dos dados de caráter
                        pessoal através de qualquer meio estabelecido no site,
                        supõe a autorização expressa do Usuário para realizar o
                        tratamento assinalado nos parágrafos anteriores. Não
                        obstante, se não desejar que seus dados de caráter
                        pessoal fornecidos sejam tratados com fins comerciais e
                        para o envio de mensagens para contato, poderão opor-se
                        solicitando o cancelamento de envio das mensagens.
                    </p>
                </article>

                <article>
                    <h2>8. Atualizações sobre essa política</h2>

                    <p>
                        A Cactus poderá alterar o teor desta Política a qualquer
                        momento, conforme a finalidade ou necessidade, ou ainda
                        para adequação à legislação, sendo uma responsabilidade
                        do Usuário verificá-la sempre que efetuar o acesso ao
                        site ou utilizar nossos serviços.
                    </p>
                </article>
            </body>
        </html>
    );
}
