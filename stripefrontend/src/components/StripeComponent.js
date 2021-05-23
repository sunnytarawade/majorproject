import logo from '../../src/logo.svg';
import StripeCheckout from 'react-stripe-checkout'
import React, { useState } from 'react'
import DNSVerify from './DNSVerify';

function StripeComponent() {
    

    const makePayment = token=>{
    const body = {
      token,
      product
    }

    const headers = {
      'Content-Type' :'application/json'
    }

    return fetch('http://localhost:3005/payment',{
      method :'POST',
      headers,
      body : JSON.stringify(body)
    }).then(response => {
        console.log(response)
        const {status} = response
        console.log(status)
      })
      .catch(err => {
        console.log('error : '+err)
      })
    
  }

  const [product, setProduct] = useState({
      name : "Apple",
      price : 51,
      seller : "Me"

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
        //enter your test public stripekey in stripeKey
          stripeKey="" token={makePayment} name="Buy Apples" amount={product.price}
        
          // shippingAddress
          // billingAddress
        >
          <button className="btn-large blue lighten-1">Buy apples @ Rs. 0.{product.price}</button>
        </StripeCheckout>

      </header>
    </div>
  );

}

export default StripeComponent
