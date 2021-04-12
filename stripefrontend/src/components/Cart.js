import React from 'react'

function Cart(props) {

    const handleCheckoutClick = ()=>{
        props.history.push("/dns-verify")
    }

    return (
        <div>
            <button onClick={handleCheckoutClick}>
                Checkout
            </button>
        </div>
    )
}

export default Cart
