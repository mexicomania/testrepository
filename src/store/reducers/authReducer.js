import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    GET_USER,GET_USER_SUCCESS,GET_USER_FAILURE
} from '../constants/authConstant'
const initialState = {
    user: {},
    authUser: {},
    isLoading: false,
    isError: false,
    error: {},
    isLoggedIn: false,
    token:''
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                user: {},
                authUser: {},
                isLoading: true,
                isError: false,
                error: {},
                isLoggedIn: false,
            }
        case SIGNIN_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                user: action.payload.user,
                authUser: action.payload.user,
                token:action.payload.token,
                isLoading: false,
                isLoggedIn: true,
            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authUser: {},
                user: {},
                token: '',
                isLoading: false,
                isError: false,
                error: {},
                isLoggedIn: false,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case GET_USER:
            return {
                ...state,
                user: {},
                isLoading: true,
                isError: false,
                isLoggedIn:false,
                error: {}
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoggedIn:true,
                isLoading: false
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isLoggedIn:false,
                error: action.error
            }
        default:
            return state
    }
}