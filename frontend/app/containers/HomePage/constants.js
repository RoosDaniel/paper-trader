/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_REGISTER_FORM = 'papertrader/Home/CHANGE_REGISTER_FORM';
export const CHANGE_LOGIN_FORM = 'papertrader/Home/CHANGE_LOGIN_FORM';

export const ALREADY_LOGGED_IN = 'papertrader/Home/ALREADY_LOGGED_IN';
