import {
    ADD_PUBLIC_DATA, ADD_PUBLIC_DATA_SUCCESS, ADD_PUBLIC_DATA_FAILURE,
    GET_PUBLIC_DATA, GET_PUBLIC_DATA_SUCCESS, GET_PUBLIC_DATA_FAILURE,
    UPDATE_PUBLIC_DATA, UPDATE_PUBLIC_DATA_SUCCESS, UPDATE_PUBLIC_DATA_FAILURE,
    DELETE_PUBLIC_DATA, DELETE_PUBLIC_DATA_SUCCESS, DELETE_PUBLIC_DATA_FAILURE
} from '../constants/publicDataConstant'

const initialState = {
    publicData: [],
    isLoading: false,
    isError: false,
    error: {},
    
}

export default function PublicDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PUBLIC_DATA:
            return {
            ...state,
            publicData: [],
            isLoading: true,
            isError: false,
            error: {},
            }
        case GET_PUBLIC_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                publicData: action.payload,
                isLoading: false,
            }
        case GET_PUBLIC_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case ADD_PUBLIC_DATA:
            return {
                ...state,
                publicData: [],
                isLoading: true,
                isError: false,
                error: {},
            }
        case ADD_PUBLIC_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                publicData: action.payload,
                isLoading: false,
            }
        case ADD_PUBLIC_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case UPDATE_PUBLIC_DATA:
            return {
                ...state,
                publicData: [],
                isLoading: true,
                isError: false,
                error: {},
            }
        case UPDATE_PUBLIC_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                publicData: action.payload,
                isLoading: false,
            }
        case UPDATE_PUBLIC_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case DELETE_PUBLIC_DATA:
            return {
                ...state,
                publicData: [],
                isLoading: true,
                isError: false,
                error: {},
            }
        case DELETE_PUBLIC_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                publicData: action.payload,
                isLoading: false,
            }
        case DELETE_PUBLIC_DATA_FAILURE:
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