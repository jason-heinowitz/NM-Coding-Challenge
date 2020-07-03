import React, { FC } from 'react';
import { connect } from 'react-redux';

import * as actions from './sagaActions';
import { AuthLoginContainer, MapState, DispatchState } from './interfaces';

const mapStateToProps = (state: any): MapState => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any): DispatchState => ({
  checkCookies: () => dispatch(actions.checkCookies()),
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
        ? <props.isAuthedComponent />
        : <props.notAuthedComponent />}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
