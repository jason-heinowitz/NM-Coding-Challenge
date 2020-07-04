import React, { FC, useState } from 'react';

const NewEmail: FC<{}> = () => {
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

      <button type="submit">Send</button>
    </div>
  );
};

export default NewEmail;
