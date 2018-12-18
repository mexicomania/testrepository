import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import {loginSaga,logoutSaga} from './saga/authSaga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducers,
    {},
    applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(rootSaga)


export default  store;
