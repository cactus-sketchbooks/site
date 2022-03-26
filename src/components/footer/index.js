import React from 'react'
import {Link} from "react-router-dom";
import logoCactus from "../../images/logocactus.jpg";
import svg from "../../images/svg.svg";
import instagram from "../../images/instagram.svg";
import whatsapp from "../../images/whatsapp.svg";
import telephone from "../../images/telephone.png";
// import instagramIcon from "../../img/instagramIcon.png";
// import facebookIcon from "../../images/facebookIcon.png";
// import logoAurea from "../../images/Logos_Aurea.png"
import logoAurea from "../../images/logoaurea2.png"

import './style.scss'

export default function Footer (props) {
    
    return (

        <footer>

                <div className='footerContent'>

                    <div className="footerImgWrapper">

                        <img draggable="false" className="logoCactus" src={logoCactus} alt='Logo Cactus' />

                    </div>

                    <div className="footerSocialMedia">

                        <ul>

                            <li> 
                                <a href='https://api.whatsapp.com/send?phone=5598982885488' target='_blank' rel="noreferrer">
                                    <img src={whatsapp} alt='Whatsapp' />
                                </a>
                                <p>Fale conosco!</p>
                            </li>

                            <li> 
                                <a href='https://www.instagram.com/cactussketchbooks/?hl=en' target='_blank' rel="noreferrer">
                                    <img src={instagram} alt='Instagram' />
                                </a> 
                                <p>Apareça no nosso perfil!</p>
                            </li>

                            <li>
                                <img src={telephone} alt='Telefone' />
                                <p> +55 (98) 98288-5488 </p>
                            </li>

                            <li>
                                <p><strong>use #cactussketchbooks</strong></p>
                            </li>

                            <li>
                                <Link to="/termosDeUso" target="_blank" rel="norreferer">Termos de Uso</Link>
                            </li>

                            <li>
                                <Link to="/politicaDePrivacidade" target="_blank" rel="norreferer">Política de Privacidade</Link>
                            </li>

                        </ul>

                    </div>

                    <div className='copyright' >

                        <a href='https://aureaej.com/' >
                            
                            <img src={logoAurea} alt='Desenvolvido pela Aurea Empresa Júnior' />

                            <p>Desenvolvido com React.js © Aurea Empresa Júnior</p>
                            
                        </a>

                    </div>

                </div>

        </footer>

    )
}