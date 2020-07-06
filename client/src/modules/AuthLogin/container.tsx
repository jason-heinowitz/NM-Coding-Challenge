import React, { FC } from 'react';
import { connect } from 'react-redux';

import { useRouteMatch, Redirect } from 'react-router';
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
  // if first render, send cookies to server to check if user is currently authenticated
  // will only run on first render
  if (props.isLoggedIn === null) {
    props.checkCookies();

    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  // get current path
  const { url } = useRouteMatch();

  return (
    <div>
      { props.isLoggedIn
        ? (
          <div>
            {/* Display centered log out button after being authenticated */}
            <button id="logout" type="submit" onClick={props.logout}>Logout</button>
            <props.isAuthedComponent />
          </div>
        )
        : (
          <> {/**
                * Always edirect user to home url if they are not authenticated
                * Forms will show up no matter the url, but force user back to '/'
                * for consistency purposes
                * */ }
            {url !== '/' ? <Redirect to="/" />
              : <props.notAuthedComponent />}
          </>
        )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
