const express = require('express')
const mongoose = require('mongoose');
const dnsIpHistory = require('../models/dnsIpHistory');
const router = express.Router()

const DnsIpHistory = require('../models/dnsIpHistory');

router.get('/',(req,res)=>{
    DnsIpHistory.find().exec().then(result => {
        if(result.length > 0){
        
             
        res.status(200).json({
            DnsIpHistory : result
        })
    } else{
        throw new Error("No DnsIpHistory found")
    }
   
    })
    .catch(err => {
        res.status(500).json({
            error : err
        }) 
    })
})

router.get('/:clientIp',(req,res,next)=>{
    const clientIp = req.params.clientIp

    console.log(req.params,)
    DnsIpHistory.find({clientIp : clientIp}).exec().then(result => {
        console.log(result)
        res.status(200).json({
            clientDnsIpHistory : result
        })
    
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })

})

router.post('/',(req,res,next)=>{
    console.log(req.body)
    const dnsIpHistory = new DnsIpHistory({
        // _id : new mongoose.Types.ObjectId,
        // _id : req.body._id,
        clientIp : req.body.clientIp,
        dnsIpHistoryArray:[{dnsIp:req.body.dnsIp}],
        })
    dnsIpHistory.save()
    .then(result=>{console.log(req.body)
        res.status(200).json({
            message: "Product Created",
            clientIp : req.body.clientIp,
            dnsIpHistoryArray:[{dnsIp:req.body.dnsIp}],
           })})
        .catch(err => {
            console.log(err)
            res.status(500).json({
            error : err
        })})
    
})

router.patch('/:clientIp', async (req,res)=>{
    const {dnsIp,dnsIpHistoryArray} = req.body;
    const {clientIp} = req.params;

    // const result = await DnsIpHistory.find({clientIp : clientIp}).exec();
    // const dnsIpHistoryArray = result?.[0]?.dnsIpHistoryArray;
    // // const dnsIpStringHistoryArray = dnsIpHistoryArray?.map(dnsIpObject=>dnsIpObject.dnsIp);
    // console.log(dnsIpHistoryArray);
    
    // if(!dnsIpHistoryArray){
    //     const dnsIpHistory = new DnsIpHistory({
    //         // _id : new mongoose.Types.ObjectId,
    //         // _id : req.body._id,
    //         clientIp : clientIp,
    //         dnsIpHistoryArray:[{dnsIp:dnsIp}],
    //         })
    //     dnsIpHistory.save()
    //     .then(result=>{console.log(req.body)
    //         res.status(200).json({
    //             clientIp : clientIp,
    //             dnsIpHistoryArray:[{dnsIp:dnsIp}],
    //           })})
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500).json({
    //             error : err
    //         })})
    // }else if(dnsIpHistoryArray.length > 0){
        // DnsIpHistory.updateOne({clientIp:clientIp},{dnsIpHistoryArray : [{dnsIp:dnsIp},...dnsIpHistoryArray]}).exec().then(result => {
        DnsIpHistory.updateOne({clientIp:clientIp},{dnsIpHistoryArray : dnsIpHistoryArray}).exec().then(result => {
            res.status(200).json({
                updatedProduct : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    // }

    
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