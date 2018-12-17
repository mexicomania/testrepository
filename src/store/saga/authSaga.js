import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import { Login, LogOut,getCurrentUser } from '../../services/authService';

import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    GET_USER,GET_USER_SUCCESS,GET_USER_FAILURE
} from '../constants/authConstant'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signin(action) {
    console.log("saga signin",action)
   try {
      const user = yield call(Login, action.payload);
      console.log(user.data)
      localStorage.setItem('user', JSON.stringify(user.data.success.user))
      localStorage.setItem('token', JSON.stringify(user.data.success.token))
      yield put({type:SIGNIN_SUCCESS, payload: user.data.success});
   } catch (e) {
     console.log(e)
      yield put({type: SIGNIN_FAILURE, message: e.error});
   }
}


const authToken = (state) => state.auth.token;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* logout(action) {
    console.log("saga logout",action)
   try {
      const token = yield select(authToken);
      console.log(token) 
      const user = yield call(LogOut,token);
      console.log(user)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      yield put({type:LOGOUT_SUCCESS, user: user});
   } catch (e) {
      yield put({type: LOGOUT_FAILURE, message: e.error});
   }
}

// worker Saga: will be fired on GET_USER actions
function* getUser() {
  try {
     const user = yield call(getCurrentUser);
     yield put({type:GET_USER_SUCCESS, payload: user.data.success.user});
  } catch (e) {
     yield put({type: GET_USER_FAILURE, message: e.error});
  }
}


export default[
  takeLatest(SIGNIN,signin),
  takeLatest(LOGOUT,logout),
  takeLatest(GET_USER,getUser),

]