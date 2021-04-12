import axios from 'axios'

export const logUserIn = (userCredentials)=>{

    return async (dispatch, getState)=>{
    
    console.log('1) Login Action creator works before POST')
    //post request
    const res = await axios.post("http://localhost:3001/login",userCredentials)/* .then((res)=>{res.json()}) .then(res=>{console.log('2) Post request success' + res.data)})*/
    
    console.log(res)

    dispatch({type : 'LOG_USER_IN', payload : {...userCredentials,loginStatus : res.data.loginStatus, unique : res.data.unique }})
    }
}