/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  user: false
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_USER:
        draft.loading = true;
        draft.error = false;
        draft.user = false;
        break;

      case CREATE_USER_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;

      case CREATE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
