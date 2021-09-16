/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectName = () =>
  createSelector(
    selectHome,
    homeState => homeState.name,
  );

const makeSelectEmail = () => 
    createSelector(
      selectHome,
      homeState => homeState.email,
  );

const makeSelectPassword = () => 
    createSelector(
      selectHome,
      homeState => homeState.password,
  );

export { selectHome, makeSelectName, makeSelectEmail, makeSelectPassword };
