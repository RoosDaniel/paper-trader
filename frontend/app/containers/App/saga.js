import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { requestAPI } from 'utils/request';
import { removeJWT } from 'utils/authorization';

import { CREATE_USER_SUCCESS, FETCH_USER, INVALID_JWT } from './constants';
import { userFetched } from './actions';


export function* fetchUser() {
    const { user } = yield requestAPI('/auth/profile', {
        method: "GET"
    });

    yield put(userFetched(user));
}

export function* invalidJWT() {
    removeJWT();

    yield(put(push("/")));
}

export default function* sagas() {
    yield takeLatest(CREATE_USER_SUCCESS, fetchUser);
    yield takeLatest(FETCH_USER, fetchUser);
    yield takeLatest(INVALID_JWT, invalidJWT);
}
