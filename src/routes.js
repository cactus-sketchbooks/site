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
import SinglePost from './pages/singlePost'

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
            <Route component={SinglePost} path='/post' />

        </BrowserRouter>

    )

}

export default Routes;
