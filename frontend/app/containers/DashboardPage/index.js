/*
 * DashboardPage
 *
 * This is the logged in "homepage"
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectUser } from 'containers/App/selectors';

import LoadingIndicator from 'components/LoadingIndicator';

import CenteredSection from './CenteredSection';
import Session from './containers/Session';
import SessionCollection from './SessionCollection';

import H2 from 'components/H2';

import reducer from './reducer';
import saga from './saga';

const key = 'dashboard';

export function DashboardPage({
    user,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  if (!user) return <LoadingIndicator />;

  return (
    <article>
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="The logged in user's dashboard."
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            Dashboard
          </H2>
          <p>
            From here, you can view your created sessions and create new ones.
          </p>
          <SessionCollection>
            {user.sessions.map(session => <Session session={session} key={session._id}/>)}
          </SessionCollection>
        </CenteredSection>
      </div>
    </article>
  );
}

DashboardPage.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardPage);
