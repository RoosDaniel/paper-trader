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
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { fetchUser } from './actions';

import HomePage from 'containers/HomePage/index';
import DashboardPage from 'containers/DashboardPage/index';

import NotFoundPage from 'containers/NotFoundPage/index';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const key = 'global';

export function App({
  onPageLoad,
}) {
  useInjectSaga({ key, saga });

  useEffect(() => {
    if ("JWT" in window.localStorage) {
      onPageLoad();
    }
  }, [])

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Papertrader"
        defaultTitle="Papertrader"
      >
        <meta name="description" content="A papertrader" />
      </Helmet>
      {/*<Header />*/}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    onPageLoad: () => dispatch(fetchUser()),
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
