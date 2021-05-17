const fetch = require('node-fetch');

const getConfig = () => ({
    method : 'GET',
    headers:{
        'Content-Type' : 'application/json'
    },
    // body : JSON.stringify(postBody)
})

const postRequest = async (domainName)=>{

    const dnsUrl = `http://localhost:3001/dns-verify/${domainName}`
    const res = await fetch(dnsUrl,getConfig())
    const dnsResponse = await res.json();
    console.log(dnsResponse);
}

const domainName = 'jadfs894u3.onetimedns.com';
postRequest(domainName);
