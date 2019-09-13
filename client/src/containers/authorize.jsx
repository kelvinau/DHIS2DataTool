import React, { useState } from 'react';
import { authorize } from 'services/apis';

const INITIAL_CREDENTIALS = { username: '', password: '' };

const AuthorizeContainer = () => {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
  const onClick = () => {
    authorize(credentials)
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setCredentials(INITIAL_CREDENTIALS);
      });
  };
  return (
    <div>
      <div>
        <span>
          Username:
          <input type="text" />
        </span>
      </div>
      <div>
        <span>
          Password:
          <input type="password" />
        </span>
      </div>
      <button onClick={onClick}>Authorize</button>
    </div>
  );
};
export default AuthorizeContainer;
