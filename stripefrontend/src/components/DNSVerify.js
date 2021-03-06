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
        update:0
    }
    
    constructor(props){
        super(props);
    }

    getIp = async ()=>{
        const publicIpAddress =await  publicIp.v4();
        console.log(`clientPublicIPAddress : ${publicIpAddress}`);
        // this.setState({publicIpAddress})
        return publicIpAddress || '';
    }

    getDnsIp = async ()=>{
        const dnsApi = `http://localhost:3005/dns-verify/csdzv.onetimedns.com`
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
        console.log(`dnsPublicIPAddress ${dnsResponse.dnsInfo.dnsPublicIpAddress}`)
        return dnsResponse.dnsInfo.dnsPublicIpAddress || '';
    }

    checkIpAndPreviousDNSGeolocationIntegrity = (dnsIpHistoryArray)=>{
        const maxDifference = 4;
        const uniqueGeolocationIps = []; 
        const dnsIpHistoryArrayLength = dnsIpHistoryArray?.length ?? 0;
        console.log('dnsIpHistoryArray : \n')
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

        const dnsIpHistoryApi = `http://localhost:3005/dns-ip-history/${clientPublicIpAddress}`;
        const {clientDnsIpHistory} = await fetch(dnsIpHistoryApi,{
            method:'GET',
            headers:{
                   'Content-Type':'application/json',
                'Access-Control-Allow-Origin' : '*',
         },
        }).then(async res=>await res.json());
 

        // console.log(clientDnsIpHistory);

        const prevDnsIpHistoryArray = clientDnsIpHistory?.[0]?.dnsIpHistoryArray;
        const dnsIpHistoryArray = prevDnsIpHistoryArray ? [...prevDnsIpHistoryArray,{dnsIp:dnsPublicIpAddress}] : [{dnsIp:dnsPublicIpAddress}];

        if(clientDnsIpHistory?.length === 0){
            const res = await fetch('http://localhost:3005/dns-ip-history',{
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
            // console.log(res);
     
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
            // console.log(res);
     
        }

        if(clientPublicIpAddress && dnsPublicIpAddress){
                    // checks 2 cases :
        // 1. clientIP === dnsIP
        // 2. clientIP is in the same DNS subfarm 
        
           const  isClientDnsIpCombinationValid = !this.checkIfClientAndDnsIpAreSimilar(clientPublicIpAddress,dnsPublicIpAddress) && this.checkIpAndPreviousDNSGeolocationIntegrity(dnsIpHistoryArray)
        
        //    this.setState({shouldShowCheckoutPage:isClientDnsIpCombinationValid})
        if(isClientDnsIpCombinationValid){   
        this.setState({shouldShowCheckoutPage:true,update:2})
        console.log("")
    }
        else{
            this.setState({shouldShowCheckoutPage:false,update:1})
        
        }
        }
        
    }

    componentDidMount(){
        try{
        this.verifyDns();
        }
        catch(err){
            this.setState({update:1})
        }
    }

    componentDidUpdate(){
        if(this.state.shouldShowCheckoutPage){
            window.location.href= "https://globalonlinesalescorporation.com/"
        }
    }

    displayMessage(){
        switch(this.state.update){
            case 0: return "PLEASE WAIT..."
            case 1:  return "SORRY, WE DETECTED SUSPICIOUS BEHAVIOUR, PLEASE TRY AGAIN"
        }
    }

    render(){
        return <div style={{display:'flex',height:'100vh',justifyContent: 'space-evenly', fontWeight:'bold',fontSize:'24px'}}>
            <div style={{alignSelf:'center'}}>
            {this.displayMessage()}
            </div>
        </div>
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
