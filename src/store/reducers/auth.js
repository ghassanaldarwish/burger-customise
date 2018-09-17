import * as actionType from '../actions/actionTypes'

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'

}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionType.AUTH_START:
        return {
            ...state,
            loading:true,
            error: null
        }
        case actionType.AUTH_SUCCESS:
        return {
            ...state,
            loading:false,
            error: null,
            token: action.idToken,
            userId: action.userId


        }
        case actionType.AUTH_FILD:
        return {
            ...state,
            loading:false,
            error: action.error
        }


        case actionType.AUTH_LOGOUT:
        return {
            ...state,
            token: null,
            userId: null


        }
        case actionType.SET_AUTH_REDIRECT_PATH:
        return {
            ...state,
            authRedirectPath: action.path


        }

       
        default:
        return state
    }


}

export default reducer