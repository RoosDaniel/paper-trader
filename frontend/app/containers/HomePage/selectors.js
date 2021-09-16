/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectHome = state => state.home || initialState;

export const makeSelectRegisterForm = () =>
  createSelector(
    selectHome,
    homeState => homeState.registerForm,
  );

export const makeSelectLoginForm = () => 
  createSelector(
    selectHome,
    homeState => homeState.loginForm,
  );
