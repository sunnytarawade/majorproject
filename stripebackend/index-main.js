const cors = require('cors')
const express = require('express')

// TODO: Add Stripe Api Key
const stripe = require('stripe')('REACT_APP_KEY') 
let uuid = require('uuid')
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("It works")
})

app.post("/purchase",(req,res)=>{

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
            receipt_mail : token.email,
            description : 'bought ' + product.name,
            shipping : {
                name : token.card.name,
                address : {
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

app.listen(3001,()=>{console.log("Listening at localhost:3001")})