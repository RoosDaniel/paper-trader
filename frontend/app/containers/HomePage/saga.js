import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_USER } from 'containers/App/constants';

import { requestAPI } from 'utils/request';

import { makeSelectName, makeSelectEmail, makeSelectPassword } from 'containers/HomePage/selectors';
import { userCreated, userCreatedError } from '../App/actions';


export function* createUser() {
  const name = yield select(makeSelectName());
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  try {
    const user = yield call(requestAPI, '/auth/register', {
      body: {name, email, password},
      method: 'POST',
    });
    
    yield put(userCreated(user));
  } catch (err) {
    yield put(userCreatedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userManagement() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CREATE_USER, createUser);
}
