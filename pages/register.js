import { compose, withProps, withState } from 'recompose';
import TextField from 'material-ui/TextField';
import React from 'react';
import Router from 'next/router';

import withApp from '../lib/withApp';
import withAPI from '../lib/withAPI';


const RegisterPage = ({ setEmail, setPassword, email, password, doRegister, startRegister }) => (
  <div>
    <h2>{'Register'}</h2>
    <form
      className="container" onSubmit={async (e) => {
        e.preventDefault();
        await doRegister(email, password);
        Router.push('/');
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
