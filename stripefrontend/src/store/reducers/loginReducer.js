const initState = {
    userName : null,
    password : null,
    loginStatus : false,
    unique: null
}

const loginReducer = (state = initState,action)=>{
    
    switch (action.type){
        case "LOG_USER_IN" :  
    console.log('4) last step @ REDUCER sucess' + action.payload.userName)

        // MAYBE USE setState ?
        console.log("Server log in status : "+action.payload.loginStatus)
        // 
        
        return {
            loginStatus :action.payload.loginStatus,
            unique : action.payload.unique
        }

    default : console.log('error')

}
return state
}

export default loginReducer