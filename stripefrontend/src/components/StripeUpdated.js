import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

<CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
/>
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HTNZZCiV3aOZa5CUau4xQh7YkWhgqPFhqzJgn0v6c8bJLbfTCmBMPB4JYXr3nBVZub1hvGqH4VLWYymhrZq88jn00xM2c2ftB');

const StripeComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  );
};

export default StripeComponent;