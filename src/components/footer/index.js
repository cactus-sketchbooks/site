import React from 'react'
import {Link} from "react-router-dom";
import logoCactus from "../../images/logocactus.jpg";
import svg from "../../images/svg.svg";
import instagram from "../../images/instagram.svg";
import whatsapp from "../../images/whatsapp.svg";
import telephone from "../../images/telephone.png";
// import instagramIcon from "../../img/instagramIcon.png";
// import facebookIcon from "../../images/facebookIcon.png";
import logoAurea from "../../images/Logos_Aurea.png"

import './style.scss'

export default function Footer (props) {
    
    return (

        <footer>

                <div className="footerBackgroundWrapper">

                    <img src={svg} alt='Fundo' />

                </div>

                <div className='footerContent'>

                    <img draggable="false" className="logoCactus" src={logoCactus} alt='Logo Cactus' />

                    <ul>
                        <li> <Link to='/' > Início </Link> </li>
                        <li> <Link to='/sobre'> Quem Somos </Link> </li>
                        <li> <Link to='/contato'> Contato </Link> </li>
                        <li> <Link to='/login'> Login/Perfil </Link> </li>
                    </ul>

                    <div className="footerSocialMedia">
                        <ul>
                            <li> 
                                <a href='https://api.whatsapp.com/send?phone=5598982885488' target='_blank' rel="noreferrer">
                                    <img src={whatsapp} alt='whatsapp' />
                                </a>
                            </li>
                            <li> 
                                <a href='https://www.instagram.com/cactussketchbooks/?hl=en' target='_blank' rel="noreferrer">
                                    <img src={instagram} alt='instagram' />
                                </a> 
                            </li>
                            <li>
                                <img src={telephone} alt='telephone' />
                                <p> +55 (98) 98288-5488 </p>
                            </li>
                        </ul>
                    </div>

                    <div className='copyright' >

                        <p>Desenvolvido por :</p>
                        <a href='https://aureaej.com/' ><img src={logoAurea} alt='' /></a>

                    </div>
                </div>


        </footer>

    )
}