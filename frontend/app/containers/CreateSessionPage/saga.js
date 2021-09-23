import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { requestAPI } from 'utils/request';

import { makeSelectCreateSessionForm } from './selectors';
import { sessionCreated, sessionCreatedError } from './actions';
import { CREATE_SESSION } from './constants';


export function* createSession() {
    const createSessionForm = yield select(makeSelectCreateSessionForm());
    let response;

    try {
        response = yield requestAPI('/session', {
            method: "POST",
            body: createSessionForm,
        });
    } catch (err) {
        put(sessionCreatedError(err))
    }
    
    const { session } = response;

    yield put(sessionCreated(session));
    yield put(push(`/session/${session._id}`));
}

export default function* sagas() {
    yield takeLatest(CREATE_SESSION, createSession);
}
