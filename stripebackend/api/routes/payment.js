const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const get_ip = require('ipware')().get_ip;
require('dotenv').config();
// TODO: Add Stripe Api Key
const stripe = require('stripe')(process.env.REACT_APP_KEY) 
let uuid = require('uuid')

router.post("/",(req,res)=>{

// app.get("/",(req,res)=>{
//     res.send("It works")
// })

// app.post("/purchase",(req,res)=>{

    const {token, product} = req.body
    
    console.log(product)
    console.log(product.price)
    
    const idempotencyKey = uuid.v4()

    return stripe.customers.create({
        email:token.email,
        source : token.id
    }).then(customer => {
        stripe.charges.create({
            currency : 'inr',
            amount : product.price,
            customer : customer.id,
            receipt_email : token.email,
            description : 'bought ' + product.name,
            shipping : {
                name : token.card.name,
                address : {
                    line1 : 'line1',
                    country : token.card.address_country
                }
            }
        },{idempotencyKey})
    }).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        console.log('error occured '+err)
    })



})

// app.listen(3001,()=>{console.log("Listening at localhost:3001")})
module.exports = router;