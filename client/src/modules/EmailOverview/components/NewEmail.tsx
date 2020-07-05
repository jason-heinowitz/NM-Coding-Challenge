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
      <label htmlFor="recipients">Recipients</label>
      <input type="text" id="recipients" name="recipients" onChange={(e) => setTo(e.target.value)} />

      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" onChange={(e) => setSubject(e.target.value)} />

      <label htmlFor="body">Body </label>
      <textarea id="body" name="body" onChange={(e) => setBody(e.target.value)} />

      <button type="submit" onClick={() => send({ to, subject, body })}>Send</button>
      {isSending ? <span>Sending...</span> : ''}
    </div>
  );
};

export default NewEmail;
