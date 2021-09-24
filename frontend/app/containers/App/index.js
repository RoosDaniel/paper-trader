/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { fetchUser, logOut } from './actions';

import HomePage from 'containers/HomePage';
import DashboardPage from 'containers/DashboardPage';
import CreateSessionPage from 'containers/CreateSessionPage';
import SessionPage from 'containers/SessionPage';
import NotFoundPage from 'containers/NotFoundPage';

import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

import AppWrapper from './AppWrapper';

const key = 'global';

export function App({
  onJWTFound,
  onJWTNotFound,
}) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    "JWT" in window.localStorage ? onJWTFound() : onJWTNotFound();
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Papertrader"
        defaultTitle="Papertrader"
      >
        <meta name="description" content="A papertrader" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/create_session" component={CreateSessionPage} />
        <Route exact path="/session/:id" component={SessionPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  onJWTFound: PropTypes.func,
  onJWTNotFound: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onJWTFound: () => dispatch(fetchUser()),
    onJWTNotFound: () => dispatch(logOut()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
