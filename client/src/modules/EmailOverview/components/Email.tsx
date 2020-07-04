import React, { FC } from 'react';

import { Email } from '../interfaces';

interface PropTypes {
  emailData: Email;
  deleteThis(): any;
}

const email: FC<PropTypes> = ({ emailData, deleteThis }) => {
  const {
    from, to, subject, body,
  } = emailData;

  return (
    <div style={{ borderBottom: '1px solid black' }}>
      From: {from}
      To: {to.map((r) => <span key={r}>{r}</span>)}
      <br />
      Subject: {subject}
      <p>{body}</p>
      <button type="submit" onClick={deleteThis}>Delete</button>
    </div>
  );
};

export default email;
