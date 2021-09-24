/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_ERROR } from './constants';

export const initialState = {
  session: false,
  loading: false,
  error: "",
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SESSION:
        draft.session = false;
        draft.loading = true;
        draft.error = "";
        break;
      case GET_SESSION_SUCCESS:
        draft.session = action.session;
        draft.loading = false;
        draft.error = "";
        break;
      case GET_SESSION_ERROR:
        draft.session = false;
        draft.loading = false;
        draft.error = action.error;
    }
  });

export default reducer;
