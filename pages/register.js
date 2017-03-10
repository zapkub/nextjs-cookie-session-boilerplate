import { compose, withProps, withState } from 'recompose';
import TextField from 'material-ui/TextField';
import React from 'react';

import withApp from '../lib/withApp';
import withAPI from '../lib/withAPI';


const RegisterPage = ({ setEmail, setPassword, email, password, doRegister, startRegister }) => (
  <div>
    {console.log(startRegister)}
    <form
      className="container" onSubmit={(e) => {
        e.preventDefault();
        doRegister(email, password);
      }}
    >
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="email"
        className="input-field"
      />
      <input
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        className="input-field"
      />
      <input type="submit" value="Register" />
    </form>
    <style jsx>{`
                .container {
                    display:flex;
                }
                .input-field {
                    margin: 5px;
                    font-size: 24px;
                }
                @media screen and (max-width: 670px) {
                    .container {
                        flex-direction: column;
                    }
                }
            `} </style>
  </div>
);

export default compose(
    withApp({}),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withAPI(),
)(RegisterPage);
