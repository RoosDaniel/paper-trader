/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
  FETCH_USER_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  user: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
      case CREATE_USER:
        draft.loading = true;
        draft.error = false;
        draft.user = false;
        break;

      case LOGIN_USER_SUCCESS:
      case CREATE_USER_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;

      case LOGIN_USER_ERROR:
      case CREATE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case FETCH_USER_SUCCESS:
        draft.user = action.user;
        break;
    }
  });

export default appReducer;
