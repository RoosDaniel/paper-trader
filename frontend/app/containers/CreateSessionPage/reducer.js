/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_CREATE_SESSION_FORM } from './constants';

export const initialState = {
  createSessionForm: {
    name: "",
    wallet: 100,
  }
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CREATE_SESSION_FORM:
        draft.createSessionForm[action.key] = action.value;
        break;
    }
  });

export default reducer;
