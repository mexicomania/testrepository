import {
    REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,

} from '../constants/userConstant'

const initialState = {
    user: {},
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    error: {}
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                isLoading: true,
                isError:false,
                error:{}
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: {},
                isLoading: false,
                isError: false,
                error: {},
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}