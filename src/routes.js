import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'
import Admin from './pages/admin'
import About from './pages/about'
import Cart from './pages/cart'
import Clients from './pages/clients'
import Login from './pages/login'
import SignUp from './pages/signUp'
import Profile from './pages/profile'
import SinglePost from './pages/singlePost'
import Mandacaru from './pages/create/mandacaru'
import Baiao from './pages/create/baiao'
import Facheiro from './pages/create/facheiro'
import Carcara from './pages/create/carcara'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato' />
            <Route component={Admin} path='/admin' />
            <Route component={About} path='/sobre' />
            <Route component={Cart} path='/carrinho' />
            <Route component={Clients} path='/clientes' />
            <Route component={Login} path='/login' />
            <Route component={SignUp} path='/cadastro' />
            <Route component={Profile} path='/Perfil' />
            <Route component={SinglePost} path='/post' />
            <Route component={Mandacaru} path='/mandacaru' />
            <Route component={Baiao} path='/baiao' />
            <Route component={Facheiro} path='/facheiro' />
            <Route component={Carcara} path='/carcara' />

        </BrowserRouter>

    )

}

export default Routes;
