import { compose, withProps, withState } from 'recompose';
import TextField from 'material-ui/TextField';
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import withApp from '../lib/withApp';
import withAPI from '../lib/withAPI';


const RegisterPage = ({ doRegister, setEmail, setPassword, email, password, startRegister }) => (
  <div>
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


const mutation = gql`
  mutation ($email:String!, $password: String!) {
    createUser(record:{email: $email, password: $password}) {
      recordId
    }
  }
`;


export default compose(
    withApp({}),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    graphql(mutation, {
      props: ({ mutate, props }) => ({
        doRegister: async () => {
          console.log('do mutate');
          const result = await mutate();
          console.log(result);
        },
      }),
      options: ({ email, password }) => ({
        variables: {
          email,
          password,
        },
      }),
    }),
    // withAPI(),
)(RegisterPage);
