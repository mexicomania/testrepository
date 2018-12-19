import {
    REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE
} from '../constants/userConstant'

export default class userActions {

    static registerUser(user) {
        console.log(user)
        return {
            type: REGISTER_USER,
            payload: user
        }
    }

    static registerUserSuccess(data) {
        return {
            type: REGISTER_USER_SUCCESS,
            payload: data
        }
    }

    static registerUserFailure(error) {
        return {
            type: REGISTER_USER_FAILURE,
            error: error
        }
    }
}