import { combineReducers } from 'redux'
import AuthReducer from './authReducer';
import PublicDAtaReducer from './publicDataReducer';
import UserReducer from './userReducer';
import EmailSettingReducer from './email-setting-reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    publicData: PublicDAtaReducer,
    user:UserReducer,
    emailSetting:EmailSettingReducer
})

export default rootReducer