import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'
import Admin from './pages/admin'
import About from './pages/about'
import Cart from './pages/cart'
import Login from './pages/login'
import SignUp from './pages/signUp'
import Profile from './pages/profile'
import Blog from './pages/blog'
import SinglePostBlog from './pages/singlePostBlog'
import BlogAdm from './pages/blogAdmin'
import Mandacaru from './pages/create/mandacaru'
import Baiao from './pages/create/baiao'
import Buriti from './pages/create/buriti'
import Facheiro from './pages/create/facheiro'
import Carcara from './pages/create/carcara'
import ClientList from './pages/admin/clientList'
import CreatePost from './pages/admin/createPost'
import CreateColor from './pages/admin/createColor'
// import CreateTypes from './pages/admin/createTypes'
import Requests from './pages/admin/requests'
import UserRequests from './pages/userRequests'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato' />
            <Route component={Admin} path='/admin' />
            <Route component={About} path='/sobre' />
            <Route component={Cart} path='/carrinho' />
            <Route component={Login} path='/login' />
            <Route component={SignUp} path='/cadastro' />
            <Route component={Profile} path='/Perfil' />
            <Route component={Blog} path='/nossosClientes' />
            <Route component={SinglePostBlog} path='/post/:idPost' />
            <Route component={BlogAdm} path='/blogadmin'/>
            <Route component={Mandacaru} path='/mandacaru' />
            <Route component={Baiao} path='/baiao' />
            <Route component={Facheiro} path='/facheiro' />
            <Route component={Carcara} path='/carcara' />
            <Route component={Buriti} path='/buriti' />
            <Route component={ClientList} path='/listaDeClientes' />
            <Route component={CreatePost} path='/criarPost' />
            <Route component={CreateColor} path='/gerenciarCores' />
            <Route component={Requests} path='/pedidos' />
            <Route component={UserRequests} path='/meuspedidos' />
            {/* <Route component={CreateTypes} path='/gerenciarTipos' /> */}

        </BrowserRouter>

    )

}

export default Routes;
