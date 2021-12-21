import React, {useState, createRef} from 'react';
import {Link} from 'react-router-dom'
import './style.scss';
import logo from '../../images/cactopng.png';

function Header() {

    const [header, setHeader] = useState(false);

    const changeBackgroundColor = () => {
        if(window.scrollY >= 40) {
            setHeader(true);
        } else {
            setHeader(false);
        };
    };

    const [isChecked, setIsChecked] = useState(false);

    const menuMobile = createRef()

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none';
        else
            menuMobile.current.style.display = 'flex';

    }

    window.addEventListener('scroll', changeBackgroundColor);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

    return (
        <div>
            <header className={header ? 'header active' : 'header'}>

                <div onClick={scrollToTop} className='logo' >

                    <Link to="/"> <img src={logo} alt="Logo" /> </Link>

                </div>

                <div className='menu' >

                    <ul>
                        <li><Link onClick={scrollToTop} to="/sobre"> Quem Somos </Link></li>
                        <li><Link onClick={scrollToTop} to="/admin"> Admin </Link></li>
                        <li><Link onClick={scrollToTop} to="/contato"> Contato </Link></li>
                        <li><Link onClick={scrollToTop} to="/clientes"> Nossos Clientes </Link></li>
                        <li><Link onClick={scrollToTop} to="/carrinho"> Carrinho </Link></li>
                        <li><Link onClick={scrollToTop} to="/login"> Login </Link></li>
                    </ul>

                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={() => {

                        setIsChecked(!isChecked);
                        showMenuMobile()
                        window.scrollTo(0, 0)

                    }} />

                    <label htmlFor="checkbox" >

                        <span></span>
                        <span></span>
                        <span></span>

                    </label>

                </div>
            </header>

            <div className='menu-mobile' ref={menuMobile} >

                <ul>
                    <li><Link to="/sobre"> Quem Somos </Link></li>
                    <li><Link to="/admin"> Adim </Link></li>
                    <li><Link to="/contato"> Contato </Link></li>
                    <li><Link to="/clientes"> Nossos Clientes </Link></li>
                    <li><Link to="/carrinho"> Carrinho </Link></li>
                    <li><Link to="/login"> Login </Link></li>  
                </ul>

            </div>
        </div>
    )
} export default Header;