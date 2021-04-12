import Axios from "axios"
import React,{ useEffect } from "react"
import { Component } from "react"
import {v4 as uuid} from 'uuid'

class DNSVerify extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        
    }
}

function DNSVerify(props) {
    useEffect( ()=>{

        const DNSVerifyFunc = async ()=>{
        let uniqueSubdomain = ''

        try{
            //post as trasaction/order id as well
            // uniqueSubdomain = res.data.uniqueSubdomain

            uniqueSubdomain = uuid()

            // SEM 8 : 
            // const res = await fetch('http://localhost:3001/dns-verify',{
                // method : 'POST',
                // body : {uniqueSubdomain}
            // })

            // SEM 7 : (Only for demo)
            // props.history.push('http://' + uniqueSubdomain + ".localhost:3001")
            window.location = 'http://' + uniqueSubdomain + ".localhost:3001"
        }
        catch(err){
            console.log(err)
            props.history.push("/cart")
        }
        }
        DNSVerifyFunc()
    },[])   
    
    return (
        <>
        </>
    )
}

export default DNSVerify
