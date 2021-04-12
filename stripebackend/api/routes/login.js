
const express = require('express')
const router = express.Router()
const stripe = require('stripe')('REACT_APP_KEY') 

const uuid = require('uuid').v4
express().use(express.json())

let counter = (function (){

    c = 1
    return ()=>{
        return c++
    }

})()



router.post('/',(req,res)=>{
    // console.log(req)
    const unique = uuid()
    res.status(201).json({"loginStatus":true,unique})
})

router.get('/',(req,res)=>{
    // console.log(req)
    res.status(201).send('abc')
})



module.exports = router