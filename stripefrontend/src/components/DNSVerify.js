import Axios from "axios"
import React,{ useEffect } from "react"
import { Component } from "react"
import {v4 as uuid} from 'uuid'
import publicIp from 'public-ip';
class DNSVerify extends Component{
    state={
        shouldShowCheckoutPage : false,
    }
    
    constructor(props){
        super(props);
    }

    getIp = async ()=>{
        const publicIpAddress =await  publicIp.v4();
        console.log(publicIpAddress)
        // this.setState({publicIpAddress})
        return publicIpAddress || '';
    }

    getDnsIp = async ()=>{
        const dnsApi = `http://localhost:3001/dns-verify/csdzv.onetimedns.com`
        const res = await fetch(dnsApi
        //     ,{
        //     method:'GET',
        //     headers: {
        //         'Content-Type':'application/json',
        //         'Access-Control-Allow-Origin' : '*',
        //     }
        // }
        );
        const dnsResponse = await res.json();
        console.log(dnsResponse)
        return dnsResponse.dnsInfo.dnsPublicIpAddress || '';
    }


    checkIfClientAndDnsIpAreSimilar = (clientPublicIpAddress,dnsPublicIpAddress)=>{
        const clientIpSubaddress = clientPublicIpAddress.substring(0,12);
        const dnsIpSubaddress = dnsPublicIpAddress.substring(0,12);

        return clientIpSubaddress === dnsIpSubaddress;
    }

    verifyDns = async ()=>{
        const clientPublicIpAddress = await this.getIp();
        const dnsPublicIpAddress = await this.getDnsIp();

        console.log(clientPublicIpAddress);
        console.log(dnsPublicIpAddress);

        if(clientPublicIpAddress && dnsPublicIpAddress){
                    // checks 2 cases :
        // 1. clientIP === dnsIP
        // 2. clientIP is in the same DNS subfarm 

            const isClientAndDnsIpSimilar = this.checkIfClientAndDnsIpAreSimilar(clientPublicIpAddress,dnsPublicIpAddress);
            console.log(isClientAndDnsIpSimilar)
        }
        
    }

    componentDidMount(){
        this.verifyDns();
    }

    render(){
        return <>{this.state.publicIpAddress}</>
    }
}

// function DNSVerify(props) {
//     useEffect( ()=>{

//         const DNSVerifyFunc = async ()=>{
//         let uniqueSubdomain = ''

//         try{
           
//             uniqueSubdomain = uuid();


//         }
//         catch(err){
//             console.log(err)
//             props.history.push("/cart")
//         }
//         }
//         DNSVerifyFunc()
//     },[])   
    
//     return (
//         <>
//         </>
//     )
// }

export default DNSVerify
