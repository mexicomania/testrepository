import { call, put, takeEvery, takeLatest,select } from 'redux-saga/effects'
import { getEmailSettingsService,addEmailSettingsService,updateEmailSettingsService } from '../../services/emailSetting';
import {
    GET_EMAIL_SETTING,GET_EMAIL_SETTING_SUCCESS,GET_EMAIL_SETTING_FAILURE,
    ADD_EMAIL_SETTING,ADD_EMAIL_SETTING_SUCCESS,ADD_EMAIL_SETTING_FAILURE,
    UPDATE_EMAIL_SETTING,UPDATE_EMAIL_SETTING_SUCCESS,UPDATE_EMAIL_SETTING_FAILURE
} from '../constants/email-setting-constant';


// worker Saga: will be fired on GET_EMAIL_SETTING actions
function* getEmailSetting() {
   try {
      const data = yield call(getEmailSettingsService);
      yield put({type:GET_EMAIL_SETTING_SUCCESS, payload: data.data.success[0]});
   } catch (e) {
      yield put({type: GET_EMAIL_SETTING_FAILURE, error: e.message});
   }
}


// worker Saga: will be fired on ADD_EMAIL_SETTING actions
function* addEmailSetting(action) {
   try {
      const data = yield call(addEmailSettingsService,action.payload);
      yield put({type:GET_EMAIL_SETTING, payload: data});
   } catch (e) {
      yield put({type: ADD_EMAIL_SETTING_FAILURE, error: e.message});
   }
}


// worker Saga: will be fired on UPDATE_EMAIL_SETTING actions
function* updateEmailSetting(action) {
   try {
      const data = yield call(updateEmailSettingsService,action.payload);
      console.log(data)
      yield put({type:GET_EMAIL_SETTING, payload: data});
   } catch (e) {
      yield put({type: UPDATE_EMAIL_SETTING_FAILURE, error: e.message});
   }
}


export default[
  takeLatest(GET_EMAIL_SETTING,getEmailSetting),
  takeLatest(ADD_EMAIL_SETTING,addEmailSetting),
  takeLatest(UPDATE_EMAIL_SETTING,updateEmailSetting)
]