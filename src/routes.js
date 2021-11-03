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

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contact' exact />
            <Route component={Admin} path='/admin' exact />
            <Route component={About} path='/about' exact />
            <Route component={Cart} path='/cart' exact />
            <Route component={Clients} path='/clients' exact />
            <Route component={Login} path='/login' exact />
            <Route component={SignUp} path='/cadastro' exact />

        </BrowserRouter>

    )

}

export default Routes;
