import React, { FC } from 'react';
import { connect } from 'react-redux';

import * as actions from './sagaActions';
import { EmailOverviewContainer, MapState, MapDispatch } from './interfaces';
import { DisplayEmails } from './components';

const mapStateToProps = (state: any): MapState => ({
  emails: state.emails.emails,
  favorites: state.emails.favorites,
  isFetching: state.emails.isFetchingEmails,
});

const mapDispatchToProps = (dispatch: any): MapDispatch => ({
  fetchEmails: () => dispatch(actions.fetchEmails()),
  deleteEmail: (id: string) => dispatch(actions.deleteEmail(id)),
});

const container: FC<EmailOverviewContainer> = (props) => {
  if (props.emails === null && !props.isFetching) props.fetchEmails();

  if (props.isFetching || props.emails === null) {
    return (
      <div>
        <p>Fetching emails...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Inbox</h2>

      {props.emails.length > 0 ? <DisplayEmails emails={props.emails} deleteCallback={props.deleteEmail} /> : <p>No emails yet :(</p>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
