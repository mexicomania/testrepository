import {
    ADD_PUBLIC_DATA, ADD_PUBLIC_DATA_SUCCESS, ADD_PUBLIC_DATA_FAILURE,
    GET_PUBLIC_DATA, GET_PUBLIC_DATA_SUCCESS, GET_PUBLIC_DATA_FAILURE,
    UPDATE_PUBLIC_DATA, UPDATE_PUBLIC_DATA_SUCCESS, UPDATE_PUBLIC_DATA_FAILURE,
    DELETE_PUBLIC_DATA, DELETE_PUBLIC_DATA_SUCCESS, DELETE_PUBLIC_DATA_FAILURE
} from '../constants/publicDataConstant'

export default class PublicDataActions {

    static getData(data) {
        console.log(data)
        return {
            type: GET_PUBLIC_DATA,
            payload: data
        }
    }

    static getDataSuccess(data) {
        return {
            type: GET_PUBLIC_DATA_SUCCESS,
            payload: data
        }
    }

    static getDataFailure(error) {
        return {
            type: GET_PUBLIC_DATA_FAILURE,
            error: error
        }
    }


    static addData(data) {
        console.log(data)
        return {
            type: ADD_PUBLIC_DATA,
            payload: data
        }
    }

    static addDataSuccess(data) {
        return {
            type: ADD_PUBLIC_DATA_SUCCESS,
            payload: data
        }
    }

    static addDataFailure(error) {
        return {
            type: ADD_PUBLIC_DATA_FAILURE,
            error: error
        }
    }


    static updateData(data) {
        console.log(data)
        return {
            type: UPDATE_PUBLIC_DATA,
            payload: data
        }
    }

    static updateDataSuccess(data) {
        return {
            type: UPDATE_PUBLIC_DATA_SUCCESS,
            payload: data
        }
    }

    static updateDataFailure(error) {
        return {
            type: UPDATE_PUBLIC_DATA_FAILURE,
            error: error
        }
    }


    static deleteData(data) {
        console.log(data)
        return {
            type: DELETE_PUBLIC_DATA,
            payload: data
        }
    }

    static deleteDataSuccess(data) {
        return {
            type: DELETE_PUBLIC_DATA_SUCCESS,
            payload: data
        }
    }

    static deleteDataFailure(error) {
        return {
            type: DELETE_PUBLIC_DATA_FAILURE,
            error: error
        }
    }
}