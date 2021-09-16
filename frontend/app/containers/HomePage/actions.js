/*
 * Home Actions
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

import { CHANGE_REGISTER_FORM, CHANGE_LOGIN_FORM, ALREADY_LOGGED_IN } from './constants';


export function changeRegisterFormValue(key, value) {
  return {
    type: CHANGE_REGISTER_FORM,
    key,
    value,
  };
}

export function changeLoginFormValue(key, value) {
  return {
    type: CHANGE_LOGIN_FORM,
    key,
    value,
  };
}

export function alreadyLoggedIn() {
  return {
    type: ALREADY_LOGGED_IN,
  };
}
