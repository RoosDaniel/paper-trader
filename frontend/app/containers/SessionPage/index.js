import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import CenteredSection from 'components/CenteredSection';
import LoadingIndicator from 'components/LoadingIndicator';

import { makeSelectSession } from './selectors';
import { getSession } from './actions';

import H2 from 'components/H2';

import reducer from './reducer';
import saga from './saga';

const key = 'session';

export function SessionPage({
  session,
  match,

  getSession,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getSession(match.params.id);
  }, []);

  if (!session) return <LoadingIndicator />;

  return (
    <article>
      <Helmet>
        <title>Session</title>
        <meta
          name="description"
          content="Detailed view of a session."
        />
      </Helmet>
      <CenteredSection>
        <H2>
          Session
        </H2>
        Name: { session.name }
      </CenteredSection>
    </article>
  );
}

SessionPage.propTypes = {
  session: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  match: PropTypes.object,

  getSession: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getSession: id => dispatch(getSession(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SessionPage);
