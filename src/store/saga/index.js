import { takeEvery, all,fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import EmailSettingsSaga from './emailSettingsSaga';
import PublicDataSaga from './publicDataSaga';
import UserSaga from './userSaga';

// import { loginSaga,logoutSaga } from './authSaga';
// import { getDataSaga,createDataSaga,updateDataSaga,deleteDataSaga } from './publicDataSaga';
// import { getUserSaga,registerUserSaga } from './userSaga';
// import { getEmailSettingSaga,addEmailSettingSaga,updateEmailSettingSaga } from './emailSettingsSaga';

// export default function* rootSaga() {
//     yield [
//         fork(loginSaga),
//         fork(logoutSaga),
//         fork(getDataSaga),
//         fork(createDataSaga),
//         fork(updateDataSaga),
//         fork(deleteDataSaga),
//         fork(getUserSaga),
//         fork(registerUserSaga),
//         fork(getEmailSettingSaga),
//         fork(addEmailSettingSaga),
//         fork(updateEmailSettingSaga)
//     ]
//   }




export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...EmailSettingsSaga,
        ...PublicDataSaga,
        ...UserSaga
    ])
  }