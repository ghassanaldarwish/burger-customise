import * as actionType from  './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
   return {
       type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId 

        }
}

export const authFild = (error) => {
    return {
        type: actionType.AUTH_FILD,
             error
         }
 }

 export const logout = () => {
     localStorage.removeItem('token')
     localStorage.removeItem('expirationDate')
     localStorage.removeItem('userId')
     return {
         type: actionType.AUTH_LOGOUT
     }
 }

 export const checkAuthTimeout = (expiresTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresTime * 1000)
    }
 }


 export const auth = (email, password, isSignup) => {
     let  url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1H4TwO6P7hF8qpgPOPOZNHoM04SMzBMo'
 
    if (!isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1H4TwO6P7hF8qpgPOPOZNHoM04SMzBMo'
    }
    const data = {
        email,
        password,
        returnSecureToken: true
    }

     return dispatch => {
       
        dispatch(authStart())
        axios.post(url, data)
        .then(res =>{
            console.log(res)
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', res.data.localId)

             dispatch(authSuccess(res.data.idToken, res.data.localId))
             dispatch(checkAuthTimeout(res.data.expiresIn))
       })
        .catch(err =>{
          
             dispatch(authFild(err.response.data.error))
           })
      
        
     }
 }

 export const setRedirectPath = (path) => {
     return {
         type: actionType.SET_AUTH_REDIRECT_PATH,
         path
     }
 }

 export const authCheckState = () => {
     return dispatch => {
         const token = localStorage.getItem('token')
         const userId = localStorage.getItem('userId')
         if (!token) {
             dispatch(logout())
         } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
           if (expirationDate <= new Date()) {
            dispatch(logout())
           } 
           else {
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000))
        
           }
            
         }
         
     }
 }