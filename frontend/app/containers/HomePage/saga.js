import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { CREATE_USER, LOGIN_USER } from 'containers/App/constants';
import { ALREADY_LOGGED_IN } from './constants';

import { requestAPI } from 'utils/request';
import { setJWT } from 'utils/authorization';

import { makeSelectRegisterForm, makeSelectLoginForm } from 'containers/HomePage/selectors';
import { userCreated, userCreatedError, userLoggedIn, userLoggedInError } from '../App/actions';


export function* createUser() {
  const registerForm = yield select(makeSelectRegisterForm());

  let response;

  try {
    response = yield call(requestAPI, '/auth/register', {
      body: registerForm,
      method: 'POST',
    });
  } catch (err) {
    console.log(err);
    yield put(userCreatedError(err));
    return;
  }

  setJWT(response);
  
  yield put(userCreated(response.user));
}

export function* loginUser() {
  const loginForm = yield select(makeSelectLoginForm());

  let response;

  try {
    response = yield call(requestAPI, '/auth/login', {
      body: loginForm,
      method: 'POST',
    });
  } catch (err) {
    console.log(err);
    yield put(userLoggedInError(err));
    return;
  }

  setJWT(response);

  yield put(userLoggedIn(response.user));
}

// Triggered if on / with logged in user
export function* alreadyLoggedIn() {
  yield put(push('/dashboard'));
}

export default function* sagas() {
  yield takeLatest(CREATE_USER, createUser);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(ALREADY_LOGGED_IN, alreadyLoggedIn);
}
