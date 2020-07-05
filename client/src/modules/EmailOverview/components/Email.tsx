import React, { FC } from 'react';

import { Email } from '../interfaces';

interface PropTypes {
  emailData: Email;
  deleteThis(): any;
}

/**
 * Displays an Email
 */
const email: FC<PropTypes> = ({ emailData, deleteThis }) => {
  const {
    from, to, subject, body,
  } = emailData;

  return (
    <div className="email-item">
      From: {from}
      <br />
      <ul>
        To: {to.map((r) => <li key={r}>{`- ${r}`}</li>)}
      </ul>
      <br />
      <h4><strong>{subject.length > 0 ? subject : '[No Subject]'}</strong></h4>
      <p>{body.length > 0 ? body : 'This message has no content.'}</p>
      <button type="submit" onClick={deleteThis}>Delete</button>
    </div>
  );
};

export default email;
