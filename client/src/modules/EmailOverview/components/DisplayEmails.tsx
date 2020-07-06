import React, { FC } from 'react';

import OneEmail from './Email';
import { Email } from '../interfaces';

interface PropTypes {
  emails: Email[];
  deleteCallback(id: string): any;
}

/**
 * Takes in an array of Emails and display them in a list
 */
const DisplayEmails: FC<PropTypes> = ({ emails, deleteCallback }) => (
  <div>
    {/* key emails on their mongo db ids */}
    {emails.map((email) => <OneEmail key={email._id} emailData={email} deleteThis={() => deleteCallback(email._id)} />)}
  </div>
);

export default DisplayEmails;
