import {
    GET_EMAIL_SETTING,GET_EMAIL_SETTING_SUCCESS,GET_EMAIL_SETTING_FAILURE,
    ADD_EMAIL_SETTING,ADD_EMAIL_SETTING_SUCCESS,ADD_EMAIL_SETTING_FAILURE,
    UPDATE_EMAIL_SETTING,UPDATE_EMAIL_SETTING_SUCCESS,UPDATE_EMAIL_SETTING_FAILURE
} from '../constants/email-setting-constant';

export default class emailSettingActions {

    static getEmailSetting() {
        return {
            type: GET_EMAIL_SETTING
        }
    }

    static getEmailSettingSuccess(data) {
        return {
            type: GET_EMAIL_SETTING_SUCCESS,
            payload: data
        }
    }

    static getEmailSettingFailure(error) {
        return {
            type: GET_EMAIL_SETTING_FAILURE,
            error: error
        }
    }

    static addEmailSetting(data) {
        return {
            type: ADD_EMAIL_SETTING,
            payload:data
        }
    }

    static addEmailSettingSuccess(data) {
        return {
            type: ADD_EMAIL_SETTING_SUCCESS,
            payload:data
        }
    }

    static addEmailSettingFailure(error) {
        return {
            type: ADD_EMAIL_SETTING_FAILURE,
            error: error
        }
    }

    static updateEmailSetting(data) {
        return {
            type: UPDATE_EMAIL_SETTING,
            payload:data
        }
    }

    static updateEmailSettingSuccess(data) {
        return {
            type: UPDATE_EMAIL_SETTING_SUCCESS,
            payload:data
        }
    }

    static updateEmailSettingFailure(error) {
        return {
            type: UPDATE_EMAIL_SETTING_FAILURE,
            error: error
        }
    }
}