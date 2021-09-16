/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CREATE_USER = 'papertrader/App/CREATE_USER';
export const CREATE_USER_SUCCESS = 'papertrader/App/CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'papertrader/App/CREATE_USER_ERROR';

export const LOGIN_USER = 'papertrader/App/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'papertrader/App/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'papertrader/App/LOGIN_USER_ERROR';

export const FETCH_USER = 'papertrader/App/FETCH_USER';
export const FETCH_USER_SUCCESS = 'papertrader/App/FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'papertrader/App/FETCH_USER_ERROR';

export const INVALID_JWT = 'papertrader/App/INVALID_JWT';
