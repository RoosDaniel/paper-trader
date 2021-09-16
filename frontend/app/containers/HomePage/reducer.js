import produce from 'immer';
import { CHANGE_REGISTER_FORM, CHANGE_LOGIN_FORM } from './constants';

export const initialState = {
  registerForm: {
    name: '',
    email: '',
    password: '',
  },
  loginForm: {
    email: '',
    password: '',
  }
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_REGISTER_FORM:
        draft.registerForm[action.key] = action.value;
        break;
      case CHANGE_LOGIN_FORM:
        draft.loginForm[action.key] = action.value;
        break;
    }
  });

export default reducer;
