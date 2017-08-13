import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { getCookie } from '../../util/cookie-utils';
import { updateStore, buildGenericInitialState, handleError } from '../../util/store-utils';
import { CHANGE_AUTH } from './authentication';

const typeBase = `${APP_NAMESPACE}/user/`;

// Constants
export const GET_USER = `${typeBase}GET_USER`;
export const GET_USERS = `${typeBase}GET_USERS`;

const USER_ENDPOINT_BASE = '/user';

// Actions

/**
 * getUser  - Fetches user from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getUser = id => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_USER, `${USER_ENDPOINT_BASE}/${id}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_USER);
  }
};

/**
 * getUsers  - Fetches users from API
 *
 * @returns {Promise}
 */
export const getUsers = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_USERS, USER_ENDPOINT_BASE, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_USER);
  }
};

// Store
const INITIAL_STATE = {
  ...buildGenericInitialState([GET_USER, GET_USERS]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(state, action, _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {});
    case GET_USER:
      return updateStore(state, action, _.get(action, 'payload.user.id') ? { [action.payload.user.id]: action.payload.user } : {});
    case GET_USERS:
      return updateStore(state, action, _.get(action, 'payload.users') ? _.mapKeys(action.payload.users, 'id') : {});
    default:
      return state;
  }
};

// Selectors
export const getAuthenticatedUser = ({ user, authentication }) => user[authentication.user];
