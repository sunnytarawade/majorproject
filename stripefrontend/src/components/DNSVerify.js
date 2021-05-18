import Axios from "axios"
import React,{ useEffect } from "react"
import { Component } from "react"
import {v4 as uuid} from 'uuid'
import publicIp from 'public-ip';
import StripeComponent from './StripeComponent';
import {Redirect, withRouter} from 'react-router-dom';
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

    checkIpAndPreviousDNSGeolocationIntegrity = (dnsIpHistoryArray)=>{
        const maxDifference = 4;
        const uniqueGeolocationIps = []; 
        const dnsIpHistoryArrayLength = dnsIpHistoryArray?.length ?? 0;
        console.log(dnsIpHistoryArray);
        if(dnsIpHistoryArrayLength > 0){
        for(let i =0;i<dnsIpHistoryArrayLength;i++){
            if(uniqueGeolocationIps.length >= maxDifference)
            return false; 
            else{
            if(!uniqueGeolocationIps.includes(dnsIpHistoryArray[i].dnsIp))
                uniqueGeolocationIps.push(dnsIpHistoryArray[i].dnsIp)
             }
        }}
        return true;
        // const res = dnsIpHistoryArray.map((dnsIpObj) => {
        //     if(uniqueGeolocationIps.length >= maxDifference)
        //         return false; 
        //     else{
        //         if(uniqueGeolocationIps.includes(dnsIpObj.dnsIp))
        //             uniqueGeolocationIps.push(dnsIpObj.dnsIp)
        //     }           
        // })
        
        // return res;
    }

    checkIfClientAndDnsIpAreSimilar = (clientPublicIpAddress,dnsPublicIpAddress)=>{
        const clientIpSubaddress = clientPublicIpAddress.substring(0,12);
        const dnsIpSubaddress = dnsPublicIpAddress.substring(0,12);

        return clientIpSubaddress === dnsIpSubaddress;
    }

    verifyDns = async ()=>{
        const clientPublicIpAddress = await this.getIp();
        const dnsPublicIpAddress = await this.getDnsIp();

        const dnsIpHistoryApi = `http://localhost:3001/dns-ip-history/${clientPublicIpAddress}`;
        const {clientDnsIpHistory} = await fetch(dnsIpHistoryApi,{
            method:'GET',
            headers:{
                   'Content-Type':'application/json',
                'Access-Control-Allow-Origin' : '*',
         },
        }).then(async res=>await res.json());
 

        console.log(clientDnsIpHistory);

        const prevDnsIpHistoryArray = clientDnsIpHistory?.[0]?.dnsIpHistoryArray;
        const dnsIpHistoryArray = prevDnsIpHistoryArray ? [...prevDnsIpHistoryArray,{dnsIp:dnsPublicIpAddress}] : [{dnsIp:dnsPublicIpAddress}];

        if(clientDnsIpHistory?.length === 0){
            const res = await fetch('http://localhost:3001/dns-ip-history',{
                method:'POST',
                headers:{
                       'Content-Type':'application/json',
                    'Access-Control-Allow-Origin' : '*',
             },
                body : JSON.stringify({
                    clientIp:clientPublicIpAddress,
                    dnsIp : dnsPublicIpAddress
                })
            }).then(async res=>await res.json());
            console.log(res);
     
        }else{
            const res = await fetch(dnsIpHistoryApi,{
                method:'PATCH',
                headers:{
                       'Content-Type':'application/json',
                    'Access-Control-Allow-Origin' : '*',
             },
                body : JSON.stringify({
                    dnsIp : dnsPublicIpAddress,
                    dnsIpHistoryArray
                })
            }).then(async res=>await res.json());
            console.log(res);
     
        }

        if(clientPublicIpAddress && dnsPublicIpAddress){
                    // checks 2 cases :
        // 1. clientIP === dnsIP
        // 2. clientIP is in the same DNS subfarm 
        
           const  isClientDnsIpCombinationValid = this.checkIfClientAndDnsIpAreSimilar(clientPublicIpAddress,dnsPublicIpAddress) && this.checkIpAndPreviousDNSGeolocationIntegrity(dnsIpHistoryArray)
        
        //    this.setState({shouldShowCheckoutPage:isClientDnsIpCombinationValid})
           this.setState({shouldShowCheckoutPage:true})
        }
        
    }

    componentDidMount(){
        this.verifyDns();
    }

    componentDidUpdate(){
        if(this.state.shouldShowCheckoutPage){
            window.location.href= "https://globalonlinesalescorporation.com/"
        }
    }

    render(){
        return <>hello
        </>
        // return <>{this.state.shouldShowCheckoutPage ? <StripeComponent/>:null}</>
        // return <>{this.state.shouldShowCheckoutPage ? 
        // <Redirect component={()=>{
            // {window.location.href="https://globalonlinesalescorporation.com/"} : null
            // return null;}}/> :null}</>
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

export default withRouter(DNSVerify);
