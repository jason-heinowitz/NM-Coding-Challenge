import React, { FC } from 'react';
import { connect } from 'react-redux';

import actions from './sagaActions';
import { AuthLoginContainer, MapState, MapDispatch } from './interfaces';

const mapStateToProps = (state: any): MapState => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any): MapDispatch => ({
  checkCookies: () => dispatch(actions.checkCookies()),
  logout: () => dispatch(actions.logout()),
});


/**
 * Takes two components, one to display when user is authenticated and one to display when user is not authenticated
 */
const container: FC<AuthLoginContainer> = (props) => {
  if (props.isLoggedIn === null) {
    props.checkCookies();

    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div>
      <p>my auth container</p>
      { props.isLoggedIn
        ? (
          <div>
            <button type="submit" onClick={props.logout}>Logout</button>
            <props.isAuthedComponent />
          </div>
        )
        : <props.notAuthedComponent />}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
