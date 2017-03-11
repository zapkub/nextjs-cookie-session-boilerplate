import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, defaultProps } from 'recompose';

import UserItem from '../components/UserItem';
import withApp from '../lib/withApp';

const UsersPage = ({ data, text, setText }) => (
  <div>
    {console.log(data)}
    {'Users list'}
    <input value={text} onChange={e => setText(e.target.value)} />

    { data.loading ? 'Loading....' : (<div>
      { data.getUsers ? data.getUsers.map(
            user => <UserItem user={user} key={user.id} />) : null }
    </div>) }
  </div>
);

const query = gql`
    ${UserItem.fragments.user}
    query ($text: String) {
        getUsers(filter: {searchByString: $text}) {
            _id
            ...UserItem
        }
    }
`;

export default compose(
    withApp(),
    withState('text', 'setText', ''),
    defaultProps({
      data: {},
    }),
    graphql(query, {
      skip: ({ text }) => text.length === 0,
      options: ({ text }) => ({
        variables: {
          text,
        },
      }),
    }),
)(UsersPage);
