const uuid = require('uuid');

const express = require('express')
const router = express.Router()

const dnsTable = (domainName)=>{
    console.log(domainName)
    switch(domainName){
        case 'google.com':
            return {
                name:domainName,
                type: 'A',
                class: 'IN',
                ttl: 300,
                address: '1.1.1.1'
              }
        case 'onetimedns.com':
            return {
                name:domainName,
                type: 'A',
                class: 'IN',
                ttl: 300,
                address: '12.134.24.1'
              }
        case '*.onetimedns.com':
            return {  name:domainName,
                type: 'CNAME',
                class: 'IN',
                ttl: 300,
                domainInfo : dnsTable('onetimedns.com'),
            }
    }
}

router.get('/:domainName',(req,res)=>{

    const {domainName} = req.params;

    let dnsInfo = {};
    if(domainName === 'onetimedns.com'){
        dnsInfo = dnsTable(domainName);
    }else if(domainName.includes('onetimedns.com')){
        dnsInfo = dnsTable('*.onetimedns.com');
    }

    

    res.json({
        dnsInfo
    })
})

module.exports = router