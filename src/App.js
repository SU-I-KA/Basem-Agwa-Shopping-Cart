import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProductDetails from './pages/ProductDetails/ProductDetails'

class App extends Component {
   render() {
      return (
         <>
            <Navbar />
            <Switch>
               <Route exact path='/' component={Home} />
               <Route
                  path='/product/:id'
                  render={(props) => (
                     <ProductDetails key={props.match.params.id} {...props} />
                  )}
               />
               <Route
                  path='/category/:category'
                  render={(props) => (
                     <Home key={props.match.params.category} {...props} />
                  )}
               />
               <Route path='/cart' component={Cart} />
               <Route component={NotFoundPage} />
            </Switch>
         </>
      )
   }
}

export default App
