const uuid = require('uuid');

const express = require('express')
const router = express.Router()
const publicIp = require('public-ip');

const getDnsPublicIp = async()=>{
    const dnsPublicIpAddress = await publicIp.v4();
    return dnsPublicIpAddress
}

const dnsTable =  async (domainName)=>{
    console.log(domainName)

    let dnsPublicIpAddress = '';
    // dnsPublicIpAddress = await getDnsPublicIp();
    dnsPublicIpAddress = '440.230.54.12';
    switch(domainName){
        case 'google.com':
            return {
                name:domainName,
                type: 'A',
                class: 'IN',
                ttl: 300,
                address: '1.1.1.1',
                dnsPublicIpAddress
              }
        case 'onetimedns.com':
            return {
                name:domainName,
                type: 'A',
                class: 'IN',
                ttl: 300,
                address: '12.134.24.1',
                dnsPublicIpAddress
              }
        case '*.onetimedns.com':
            return {  name:domainName,
                type: 'CNAME',
                class: 'IN',
                ttl: 300,
                domainInfo : await dnsTable('onetimedns.com'),
                dnsPublicIpAddress
            }
    }

}

router.get('/:domainName',async (req,res)=>{

    const {domainName} = req.params;

    let dnsInfo = {};
    if(domainName === 'onetimedns.com'){
        dnsInfo = await dnsTable(domainName);
    }else if(domainName.includes('onetimedns.com')){
        dnsInfo = await dnsTable('*.onetimedns.com');
    }

    

    res.json({
        dnsInfo
    })
})

module.exports = router