import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import CenteredSection from 'components/CenteredSection';

import { makeSelectCreateSessionForm } from './selectors';
import { changeCreateSessionForm, createSession } from './actions';

import H2 from 'components/H2';
import Form from 'components/Form';
import Input from 'components/Input';
import Submit from 'components/Submit';

import reducer from './reducer';
import saga from './saga';

const key = 'createSession';

export function CreateSessionPage({
    createSessionForm,
    onSubmitCreateSession,
    onCreateSessionFormChange,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <article>
      <Helmet>
        <title>Create Session</title>
        <meta
          name="description"
          content="Creating a new session."
        />
      </Helmet>
      <CenteredSection>
        <H2>
          Create session
        </H2>
        <Form onSubmit={onSubmitCreateSession}>
            <label htmlFor="register-name">
              Name
              <Input
                id="register-name"
                type="text"
                value={createSessionForm.name}
                onChange={evt => onCreateSessionFormChange('name', evt.target.value)}
              />
            </label>
            <label htmlFor="wallet">
              Wallet size
              <Input
                id="register-wallet"
                type="register-wallet"
                value={createSessionForm.wallet}
                onChange={evt => onCreateSessionFormChange('wallet', Number(evt.target.value))}
              />
            </label>
            <Submit
              id="register-submit"
              type="submit"
              value="Create session"
            />
          </Form>
      </CenteredSection>
    </article>
  );
}

CreateSessionPage.propTypes = {
  createSessionForm: PropTypes.object,

  onSubmitCreateSession: PropTypes.func,
  onCreateSessionFormChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  createSessionForm: makeSelectCreateSessionForm(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCreateSessionFormChange: (key, value) => dispatch(changeCreateSessionForm(key, value)),
    onSubmitCreateSession: evt => {
      evt && evt.preventDefault && evt.preventDefault();
      dispatch(createSession());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateSessionPage);
