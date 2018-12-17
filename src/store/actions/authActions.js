import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    GET_USER,GET_USER_SUCCESS,GET_USER_FAILURE
} from '../constants/authConstant'

export default class AuthActions {

    static signin(user) {
        console.log(user)
        return {
            type: SIGNIN,
            payload: user
        }
    }

    static signinSuccess(data) {
        return {
            type: SIGNIN_SUCCESS,
            payload: data
        }
    }

    static signinFailure(error) {
        return {
            type: SIGNIN_FAILURE,
            error: error
        }
    }

    static logout() {
        console.log("logout action")
        return {
            type: LOGOUT
        }
    }

    static logoutSuccess() {
        return {
            type: LOGOUT_SUCCESS
        }
    }

    static logoutFailure(error) {
        return {
            type: LOGOUT_FAILURE,
            error: error
        }
    }

    static getUser() {
        return {
            type: GET_USER
        }
    }

    static getUserSuccess() {
        return {
            type: GET_USER_SUCCESS
        }
    }

    static getUserFailure(error) {
        return {
            type: GET_USER_FAILURE,
            error: error
        }
    }
}