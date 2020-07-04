import React, { FC } from 'react';

import OneEmail from './Email';
import { Email } from '../interfaces';

interface PropTypes {
  emails: Email[];
  deleteCallback(id: string): any;
}

const DisplayEmails: FC<PropTypes> = ({ emails, deleteCallback }) => (
  <div>
    {emails.map((email) => <OneEmail key={email._id} emailData={email} deleteThis={() => deleteCallback(email._id)} />)}
  </div>
);

export default DisplayEmails;
