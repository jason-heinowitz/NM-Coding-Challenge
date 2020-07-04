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

  if (props.isFetching || props.emails === null) {
    return (
      <div>
        <p>Fetching emails...</p>
      </div>
    );
  }

  const { url } = useRouteMatch();

  return (
    <div>
      <h2>Inbox</h2>
      {url === '/compose' ? <Link to="/"><button type="button">Minimize</button></Link> : <Link to="compose"><button type="button">Compose</button></Link>}

      <Route path="/compose">
        <NewEmailForm isSending={props.isSending} send={props.sendEmail} />
      </Route>

      {props.emails.length > 0 ? <DisplayEmails emails={props.emails} deleteCallback={props.deleteEmail} /> : <p>No emails yet :(</p>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
