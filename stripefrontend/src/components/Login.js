import React,{useState,useEffect} from 'react' 
import axios from 'axios'

import {Redirect} from 'react-router-dom'

import {logUserIn} from '../store/actionCreators/login'

import {connect} from 'react-redux'

function Login(props) {

    console.log(props)

    const initUserCredentials = {
        userName : null,
        password : null,
        loginStatus : props.loginStatus,
        unique : props.unique
    }

    const [userCredentials,setUser] = useState(initUserCredentials)

    const  handleSubmit = async (e)=>{
        
        const url = "http://localhost:3001/login"

        e.preventDefault()

        // const abc = await axios.post(url,{userCredentials})/* .then((res)=>{res.json()}) */.then(res=>{console.log('1) Post request success' + res.data)})
    
         props.logUserIn(userCredentials)

        console.log("Works?")
        
    }

    const handleChange = (e)=>{
        // console.log(e.target.value)
        
        
        
        setUser({

            ...userCredentials,
            [e.target.id] : e.target.value ,
            
        })
        
        // console.log(userCredentials)


        
    }

    useEffect(()=>{
        // if(props.loginStatus)
        // {props.history.push("/purchase")}
   
   
        
    },[])
   

    return (

        props.loginStatus ? 
        
        <a href={"http://"+props.unique + ".google.com"}>Click Here</a>
    //    <Redirect to="/purchase"></Redirect>
        

        :
        (
        <div>
            <form onSubmit={handleSubmit}>
            
            
            
            Name : 
            <input id="userName" type="text" onChange={handleChange}/>
        
            Password : 
            <input id="password" type="text" onChange={handleChange}/>

            {/* <input id="submit" value="submit" type="submit"  />
             */}
             
             <button>Login</button>
             </form>
        </div>
        )
        
        
    )
}

const mapStateToProps = (state)=>{
    return {
        loginStatus : state.loginReducer.loginStatus,
        unique : state.loginReducer.unique        
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        logUserIn : (userCredentials)=>{dispatch(logUserIn(userCredentials))} 
    
        // logUserIn : (userCredentials)=>{dispatch({type : 'LOG_USER_IN', payload : userCredentials})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
