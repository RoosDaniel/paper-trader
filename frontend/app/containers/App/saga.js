import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { requestAPI } from 'utils/request';
import { removeJWT } from 'utils/authorization';

import {
    CREATE_USER_SUCCESS, FETCH_USER,
    INVALID_JWT, NOT_LOGGED_IN, LOG_OUT,
 } from './constants';
import { userFetched, removeUser } from './actions';


export function* fetchUser() {
    const { user } = yield requestAPI('/auth/profile', {
        method: "GET"
    });

    yield put(userFetched(user));
}

export function* logOut() {
    removeJWT();

    yield put(push("/"));
    yield put(removeUser());
}

export default function* sagas() {
    yield takeLatest(CREATE_USER_SUCCESS, fetchUser);
    yield takeLatest(FETCH_USER, fetchUser);
    yield takeLatest(INVALID_JWT, logOut);
    yield takeLatest(NOT_LOGGED_IN, logOut);
    yield takeLatest(LOG_OUT, logOut);
}
