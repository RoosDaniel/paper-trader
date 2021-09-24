import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSession = state => state.session || initialState;


const makeSelectSession = () =>
  createSelector(
    selectSession,
    state => state.session,
  );

export { 
  makeSelectSession,
};
