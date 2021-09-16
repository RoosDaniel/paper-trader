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
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Submit from './Submit';
import { createUser } from '../App/actions';
import { changeName, changeEmail, changePassword } from './actions';
import { makeSelectName, makeSelectEmail, makeSelectPassword } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  name,
  email,
  password,
  loading,
  error,
  onSubmitForm,
  onChangeName,
  onChangeEmail,
  onChangePassword,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

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
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="name">
              Name
              <Input
                id="name"
                type="text"
                value={name}
                onChange={onChangeName}
              />
            </label>
            <label htmlFor="email">
              Email
              <Input
                id="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
              />
            </label>
            <label htmlFor="password">
              Password
              <Input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </label>
            <Submit
              id="submit"
              type="submit"
              value="Submit"
            />
          </Form>
        </CenteredSection>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,

  name: PropTypes.string,
  onChangeName: PropTypes.func,
  email: PropTypes.string,
  onChangeEmail: PropTypes.func,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeSelectName(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),

  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeName: evt => dispatch(changeName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),

    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createUser());
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
)(HomePage);
