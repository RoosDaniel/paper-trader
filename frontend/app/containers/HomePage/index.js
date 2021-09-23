/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import H2 from 'components/H2';
import Input from 'components/Input';
import LoadingIndicator from 'components/LoadingIndicator';
import CenteredSection from 'components/CenteredSection';
import Form from 'components/Form';
import Submit from 'components/Submit';

import { changeRegisterFormValue, changeLoginFormValue, alreadyLoggedIn } from './actions';
import { makeSelectRegisterForm, makeSelectLoginForm } from './selectors';

import { createUser, loginUser } from 'containers/App/actions';
import { makeSelectUser } from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  user,

  registerForm,
  onRegsiterFormChange,
  onSubmitRegister,

  loginForm,
  onLoginFormChange,
  onSubmitLogin,

  alreadyLoggedIn,

  loading,
  error,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    user && alreadyLoggedIn();
  }, [user]);

  if (loading) return <LoadingIndicator />;

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="The homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            Practice trading stocks
          </H2>
          <p>
            Start by creating a user profile
          </p>
          <Form onSubmit={onSubmitRegister}>
            <label htmlFor="register-name">
              Name
              <Input
                id="register-name"
                type="text"
                value={registerForm.name}
                onChange={evt => onRegsiterFormChange('name', evt.target.value)}
              />
            </label>
            <label htmlFor="email">
              Email
              <Input
                id="register-email"
                type="register-email"
                value={registerForm.email}
                onChange={evt => onRegsiterFormChange('email', evt.target.value)}
              />
            </label>
            <label htmlFor="register-password">
              Password
              <Input
                id="register-password"
                type="password"
                value={registerForm.password}
                onChange={evt => onRegsiterFormChange('password', evt.target.value)}
              />
            </label>
            <Submit
              id="register-submit"
              type="submit"
              value="Register"
            />
          </Form>
          <p>
            ... or log in to an existing account
          </p>
          <Form onSubmit={onSubmitLogin}>
            <label htmlFor="login-email">
              Email
              <Input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={evt => onLoginFormChange('email', evt.target.value)}
              />
            </label>
            <label htmlFor="login-password">
              Password
              <Input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={evt => onLoginFormChange('password', evt.target.value)}
              />
            </label>
            <Submit
              id="login-submit"
              type="submit"
              value="Login"
            />
          </Form>
        </CenteredSection>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  registerForm: PropTypes.object,
  onRegsiterFormChange: PropTypes.func,
  onSubmitRegister: PropTypes.func,

  loginForm: PropTypes.object,
  onLoginFormChange: PropTypes.func,
  onSubmitLogin: PropTypes.func,

  alreadyLoggedIn: PropTypes.func,

  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),

  registerForm: makeSelectRegisterForm(),
  loginForm: makeSelectLoginForm(),

  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRegsiterFormChange: (key, value) => dispatch(changeRegisterFormValue(key, value)),
    onSubmitRegister: evt => {
      evt && evt.preventDefault && evt.preventDefault();
      dispatch(createUser());
    },

    onLoginFormChange: (key, value) => dispatch(changeLoginFormValue(key, value)),
    onSubmitLogin: evt => {
      evt && evt.preventDefault && evt.preventDefault();
      dispatch(loginUser());
    },

    alreadyLoggedIn: () => dispatch(alreadyLoggedIn()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
