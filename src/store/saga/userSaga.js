import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import { registerUser } from '../../services/user';
import {
    REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,
} from '../constants/userConstant'



// worker Saga: will be fired on REGISTER_USER actions
function* registerUserPost(action) {
   try {
      const user = yield call(registerUser,action.payload);
      console.log(user)
      yield put({type:REGISTER_USER_SUCCESS, user: user});
   } catch (e) {
     console.log("error",e)
      yield put({type: REGISTER_USER_FAILURE, error: e});
   }
}


export default[
  takeLatest(REGISTER_USER,registerUserPost)
]