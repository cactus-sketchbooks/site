import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
// import Contact from './pages/contact'
// import Admin from './pages/admin'
// import About from './pages/about'


const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
{/*             <Route component={Contact} path='/contact' exact />
            <Route component={Admin} path='/admin' exact />
            <Route component={About} path='/about' exact /> */}

        </BrowserRouter>

    )

}

export default Routes;
