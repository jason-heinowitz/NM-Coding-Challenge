import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Link, Route, useRouteMatch,
} from 'react-router-dom';

import * as actions from './sagaActions';
import {
  EmailOverviewContainer, MapState, MapDispatch, SendEmailObj,
} from './interfaces';
import { DisplayEmails, NewEmailForm } from './components';

const mapStateToProps = (state: any): MapState => ({
  emails: state.emails.emails,
  favorites: state.emails.favorites,
  isFetching: state.emails.isFetchingEmails,
  isSending: state.emails.isSendingEmail,
});

const mapDispatchToProps = (dispatch: any): MapDispatch => ({
  fetchEmails: () => dispatch(actions.fetchEmails()),
  deleteEmail: (id: string) => dispatch(actions.deleteEmail(id)),
  sendEmail: (email: SendEmailObj) => dispatch(actions.sendEmail(email)),
});

/**
 * Contains user's emails and ability to compose a new email
 */
const container: FC<EmailOverviewContainer> = (props) => {
  if (props.emails === null && !props.isFetching) props.fetchEmails();

  const { url } = useRouteMatch();

  return (
    <div id="email-container">
      <h2>Inbox</h2>
      {/**
         * If fetching emails, show loading text before displaying emails or lack thereof
         */}
      {props.isFetching || props.emails === null
        ? (
          <div>
            <p>Fetching emails...</p>
          </div>
        )
        : (
          <>
            {url === '/compose' ? <Link to="/" className="btn compose"><span>Minimize</span></Link> : <Link to="compose" className="btn compose"><span>Compose</span></Link>}
            <div className="clear" />

            <Route path="/compose">
              <NewEmailForm isSending={props.isSending} send={props.sendEmail} />
            </Route>
            <div>
              {props.emails.length > 0 ? <DisplayEmails emails={props.emails.reverse()} deleteCallback={props.deleteEmail} /> : <p>No emails yet :(</p>}
            </div>
          </>
        )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
