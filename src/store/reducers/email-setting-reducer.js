import {
    GET_EMAIL_SETTING,GET_EMAIL_SETTING_SUCCESS,GET_EMAIL_SETTING_FAILURE,
    ADD_EMAIL_SETTING,ADD_EMAIL_SETTING_SUCCESS,ADD_EMAIL_SETTING_FAILURE,
    UPDATE_EMAIL_SETTING,UPDATE_EMAIL_SETTING_SUCCESS,UPDATE_EMAIL_SETTING_FAILURE
} from '../constants/email-setting-constant';


const initialState = {
    emailSetting: {},
    isLoading: false,
    isError: false,
    error: {}
}

export default function EmailSettingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EMAIL_SETTING:
            return {
                ...state,
                emailSetting: {},
                isLoading: true,
                isError: false,
                error: {}
            }
        case GET_EMAIL_SETTING_SUCCESS:
            return {
                ...state,
                emailSetting: action.payload,
                isLoading: false
            }
        case GET_EMAIL_SETTING_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case ADD_EMAIL_SETTING:
            return {
                ...state,
                isLoading: true,
                isError:false,
                error:{}
            }
        case ADD_EMAIL_SETTING_SUCCESS:
            return {
                ...state,
                emailSetting: {},
                isLoading: false,
                isError: false,
                error: {},
            }
        case ADD_EMAIL_SETTING_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case UPDATE_EMAIL_SETTING:
            return {
                ...state,
                isLoading: true,
                isError:false,
                error:{}
            }
        case UPDATE_EMAIL_SETTING_SUCCESS:
            return {
                ...state,
                emailSetting: {},
                isLoading: false,
                isError: false,
                error: {},
            }
        case UPDATE_EMAIL_SETTING_FAILURE:
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