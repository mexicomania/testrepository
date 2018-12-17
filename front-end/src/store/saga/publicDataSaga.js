import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import { getPublicData,createPublicData,updatePublicData,deletePublicData } from '../../services/publicData';

import {
    ADD_PUBLIC_DATA, ADD_PUBLIC_DATA_SUCCESS, ADD_PUBLIC_DATA_FAILURE,
    GET_PUBLIC_DATA, GET_PUBLIC_DATA_SUCCESS, GET_PUBLIC_DATA_FAILURE,
    UPDATE_PUBLIC_DATA, UPDATE_PUBLIC_DATA_SUCCESS, UPDATE_PUBLIC_DATA_FAILURE,
    DELETE_PUBLIC_DATA, DELETE_PUBLIC_DATA_SUCCESS, DELETE_PUBLIC_DATA_FAILURE
} from '../constants/publicDataConstant'

// worker Saga: will be fired on GET_PUBLIC_DATA actions
function* getData(action) {
    console.log("saga get",action)
   try {
      const token = yield select(authToken);
      const data = yield call(getPublicData,token);
      console.log(data)
      yield put({type:GET_PUBLIC_DATA_SUCCESS, payload: data});
   } catch (e) {
      yield put({type: GET_PUBLIC_DATA_FAILURE, message: e.message});
   }
}

// function* getDataSaga() {
//   yield takeLatest(GET_PUBLIC_DATA,getData);
// }


const authToken = (state) => state.auth.token;

// worker Saga: will be fired on ADD_PUBLIC_DATA actions
function* createData(action) {
    console.log("saga create",action)
   try {
    //   const token = yield select(authToken);
    //   console.log(token) 
      const data = yield call(createPublicData,action.payload);
      console.log(data)
      yield put({type:ADD_PUBLIC_DATA_SUCCESS, payload: data});
   } catch (e) {
      yield put({type: ADD_PUBLIC_DATA_FAILURE, message: e.message});
   }
}

// function* createDataSaga() {
//   yield takeLatest(ADD_PUBLIC_DATA, createData);
// }


// worker Saga: will be fired on UPDATE_PUBLIC_DATA actions
function* updateData(action) {
    console.log("saga create",action)
   try {
    //   const token = yield select(authToken);
    //   console.log(token) 
      const data = yield call(updatePublicData,action.payload);
      console.log(data)
      yield put({type:UPDATE_PUBLIC_DATA_SUCCESS, payload: data});
   } catch (e) {
      yield put({type: UPDATE_PUBLIC_DATA_FAILURE, message: e.message});
   }
}

// function* updateDataSaga() {
//   yield takeLatest(UPDATE_PUBLIC_DATA, updateData);
// }

// worker Saga: will be fired on DELETE_PUBLIC_DATA actions
function* deleteData(action) {
    console.log("saga create",action)
   try {
    //   const token = yield select(authToken);
    //   console.log(token) 
      const data = yield call(deletePublicData,action.payload);
      console.log(data)
      yield put({type:DELETE_PUBLIC_DATA_SUCCESS, payload: data});
   } catch (e) {
      yield put({type: DELETE_PUBLIC_DATA_FAILURE, message: e.message});
   }
}

// function* deleteDataSaga() {
//   yield takeLatest(DELETE_PUBLIC_DATA, deleteData);
// }

// export {getDataSaga,createDataSaga,updateDataSaga,deleteDataSaga}; 



export default [
  takeLatest(GET_PUBLIC_DATA,getData),
  takeLatest(ADD_PUBLIC_DATA, createData),
  takeLatest(UPDATE_PUBLIC_DATA, updateData),
  takeLatest(DELETE_PUBLIC_DATA, deleteData)
]; 