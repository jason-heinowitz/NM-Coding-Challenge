import React, { FC, useState } from 'react';
import { SendEmailObj } from '../interfaces';

interface PropTypes {
  isSending: boolean;
  send(email: SendEmailObj): any;
}

/**
 * Form to compose and send a new email
 */
const NewEmail: FC<PropTypes> = ({ isSending, send }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  return (
    <div className="form">
      <label htmlFor="recipients">
        Recipients
        <input type="text" onChange={(e) => setTo(e.target.value)} />
      </label>

      <label htmlFor="subject">
        Subject
        <input type="text" onChange={(e) => setSubject(e.target.value)} />
      </label>

      <label htmlFor="body">
        Body
        <textarea onChange={(e) => setBody(e.target.value)} />
      </label>

      <button type="submit" onClick={() => send({ to, subject, body })}>Send</button>
      {isSending ? <span>Sending...</span> : ''}
    </div>
  );
};

export default NewEmail;
