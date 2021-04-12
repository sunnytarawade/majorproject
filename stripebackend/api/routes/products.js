const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const get_ip = require('ipware')().get_ip;
 
const Product = require('../models/products')

router.get('/',(req,res)=>{
    console.log(get_ip(req))
    Product.find().exec().then(result => {
        if(result.length > 0){
        
             
        res.status(200).json({
            products : result
        })
    } else{
        throw new Error("No products found")
    }
   
    })
    .catch(err => {
        res.status(500).json({
            error : err
        }) 
    })
})

router.get('/:productName',(req,res,next)=>{
    const name = req.params.productName

    console.log(req.params,)
    Product.find({name : name}).exec().then(result => {
        console.log(result)
        res.status(200).json({
            product : result
        })
    
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })

})

router.post('/',(req,res,next)=>{
    const product = new Product({
        // _id : new mongoose.Types.ObjectId,
        // _id : req.body._id,
        name : req.body.name,
        price : req.body.price,
    })
    product.save()
    .then(result=>{console.log(result)
        res.status(200).json({
            message: "Product Created",
            product: product
        })})
        .catch(err => {
            console.log(err)
            res.status(500).json({
            error : err
        })})
    
})

router.patch('/:productName', (req,res)=>{
    const name = req.params.productName
    const props = req.body
    Product.update({name},props).exec().then(result => {
        res.status(200).json({
            updatedProduct : result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

})

router.delete('/:productName', (req,res)=>{
    const name  = req.params.productName

    Product.deleteOne({name}).exec().then(result => {
        res.status(200).json({
            deleteProduct : result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

})

module.exports = router