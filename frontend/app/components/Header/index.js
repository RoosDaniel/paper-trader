import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectUser } from 'containers/App/selectors';
import { logOut } from 'containers/App/actions';

import Wrapper from './Wrapper';

function Header({
  user,
  onLogOut,
}) {
  return (
    <Wrapper>
      {user ? (
      <div>{ user.name }, <a href="#" onClick={onLogOut}>log out</a></div>
      ) : null}
    </Wrapper>
  )
}

Header.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLogOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLogOut: e => {
      dispatch(logOut());
      e.preventDefault();
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
