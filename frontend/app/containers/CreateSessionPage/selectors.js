import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateSession = state => state.createSession || initialState;


const makeSelectCreateSessionForm = () =>
  createSelector(
    selectCreateSession,
    state => state.createSessionForm,
  );

export { 
    makeSelectCreateSessionForm,
};
