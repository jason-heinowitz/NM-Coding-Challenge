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

  const [subjectWarn, setSubjectWarn] = useState<boolean>(false);

  /**
   * Validate input for a new email before sending request
   */
  function validateInput(): void {
    // some text in recipient field
    if (to.length === 0) {
      alert('You must enter at least one recipient');
      return;
    }

    // all recipients in recipients field must be valid addresses
    const emails = to.split(',').map((address) => address.trim()).filter((address) => !address.endsWith('@postql.io'));
    if (emails.length > 0) {
      alert('Invalid email address in recipients field');
      return;
    }

    // warn user before submission if subject field is empty
    if (subject.length === 0 && !subjectWarn) {
      setSubjectWarn(true);
      return;
    }

    send({ to, subject, body });
  }

  return (
    <div className="form" onClick={() => (subjectWarn ? setSubjectWarn(false) : '')}>
      <label htmlFor="recipients">Recipients (@postql.io)</label>
      <input type="text" id="recipients" name="recipients" onChange={(e) => setTo(e.target.value)} />

      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" onChange={(e) => setSubject(e.target.value)} />

      <label htmlFor="body">Body </label>
      <textarea id="body" name="body" onChange={(e) => setBody(e.target.value)} />

      <button type="submit" onClick={(): void => validateInput()}>{isSending ? <span>Sending...</span> : subjectWarn ? 'Are you sure? (Subject empty)' : 'Send'}</button>
    </div>
  );
};

export default NewEmail;
