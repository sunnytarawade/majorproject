import React, { useState } from 'react';
import './App.css';

import StripeComponent from './components/StripeComponent';
import Cart from './components/Cart'
import DNSVerify from './components/DNSVerify'
import Login from './components/Login';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function App() {

    return (
      <div>


        <BrowserRouter>
        <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/purchase" component={DNSVerify}></Route>
        <Route path="/cart" component={Cart}></Route>
        {/* <Route path="/dns-verify" component={DNSVerify}></Route> */}
        </Switch>
        </BrowserRouter>
      </div>
    )
  
}

export default App;
