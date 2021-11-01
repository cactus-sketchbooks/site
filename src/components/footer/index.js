import React from 'react'
import {Link} from "react-router-dom";
import logoCactus from "../../images/logocactus.jpg";
import svg from "../../images/svg.svg";
// import instagramIcon from "../../img/instagramIcon.png";
// import facebookIcon from "../../img/facebookIcon.png";
// import logoAurea from "../../img/Logos_Aurea2.png"

import './style.scss'

export default function Footer (props) {

    return (

        <footer>

                <div className="footerBackgroundWrapper">

                    <img src={svg} alt='Fundo' />

                </div>

                <div className='footerContent'>

                    <img draggable="false" src={logoCactus} alt='Logo Cactus' />

                    <ul>
                        <li> <Link to='/' > Início </Link> </li>
                        <li> <Link to='/quemsomos'> Quem Somos </Link> </li>
                        <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                        <li> <Link to='/contato'> Contato </Link> </li>
                        <li> <Link to='/Entrar'> Login/Perfil </Link> </li>
                    </ul>

                    <p>Telefone: (22) 98112-9219 </p>

                </div>
                
            {/* <div className='socialMedias' >

                <a href='https://www.instagram.com/armazem.dovinho/?utm_medium=copy_link'  > <img src={instagramIcon} alt='logoInstagram' /> </a>
                <a href='https://www.facebook.com/Armaz%C3%A9m-do-Vinho-107327764956105'  > <img src={facebookIcon} alt='logoFacebook' /> </a>

            </div> */}

            {/* <div className='copyright' >
                
                <p>Desenvolvido por :</p>
                <a href='https://aureaej.com/' ><img src={logoAurea} alt='' /></a>

            </div> */}

        </footer>

    )
}