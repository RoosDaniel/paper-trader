import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { requestAPI } from 'utils/request';

import { sessionFetched, sessionFetchedError } from './actions';
import { GET_SESSION } from './constants';

export function* getSession({ id }) {
    let response;

    try {
        response = yield requestAPI(`/session/${id}`, {
            method: "GET",
        });
    } catch (err) {
        put(sessionFetchedError(err))
    }
    
    const { session } = response;

    yield put(sessionFetched(session));
}

export default function* sagas() {
    yield takeLatest(GET_SESSION, getSession)
}
