import React from 'react';
import './style.scss';

import logo from '../../images/cactopng2.png';
import sapo from '../../images/sapofoto.png';

export default function SignUp() {

    return (

            <section id="SectionSignUp">

                <div className="textIntroSignUp">

                    <div className="imageLogoWrapper">

                       <a href="/"> <img src={logo} alt="logo cactus" /> </a>

                    </div>

                    <h1>Faça arte. Crie com a Cactus.</h1>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>

                <div className="signUpDiv">


                </div>

            </section >

    )
}