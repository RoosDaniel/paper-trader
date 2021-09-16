/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
  FETCH_USER, FETCH_USER_SUCCESS,
  INVALID_JWT,
} from './constants';


// User creation
export function createUser() {
  return {
    type: CREATE_USER,
  };
}

export function userCreated(user) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
  };
}

export function userCreatedError(error) {
  return {
    type: CREATE_USER_ERROR,
    error,
  };
}

// User login
export const loginUser = () => ({
  type: LOGIN_USER,
});

export const userLoggedIn = user => ({
  type: LOGIN_USER_SUCCESS,
  user,
});

export const userLoggedInError = error => ({
  type: LOGIN_USER_ERROR,
  error,
});

// User fetching
export const fetchUser = () => ({
  type: FETCH_USER,
});

export const userFetched = user => ({
  type: FETCH_USER_SUCCESS,
  user
});

// Authorization
export const invalidJWT = () => ({
  type: INVALID_JWT,
});
