import React from 'react';
import gql from 'graphql-tag';

const UserItem = ({ user }) => (
  <div>
    {user.email}
    {user.password}
  </div>
);

UserItem.fragments = {
  user: gql`
        fragment UserItem on User {
            email
            password
        }
    `,
};


export default UserItem;
