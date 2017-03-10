import React from 'react';

const CreateJSONRequest = ({ method, url, data }) => fetch(url, {
  method,
  body: JSON.stringify(data),
  credentials: 'same-origin',
  headers: {
    'content-type': 'application/json',
  },
});
const doRegister = async (email, password) => {
  const result = await CreateJSONRequest({
    method: 'POST',
    url: '/auth/register',
    data: {
      email, password,
    },
  });
  const json = await result.json();
  if (result.status === 201) {
    console.log('success');
    console.log(json);
  } else {
    console.log('fail');
    console.log(json);
  }
};

const sendLoginRequest = async (email, password) => CreateJSONRequest({
  method: 'POST',
  url: '/auth/login',
  data: {
    email,
    password,
  },
});
export default function withAPI(options) {
  return function (Component) {
    return class withAPI extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          user: null,
        };
        console.log(props);
        this.doLogin = this.doLogin.bind(this);
        this.refreshSession = this.refreshSession.bind(this);
      }
      componentDidMount() {
        this.refreshSession();
      }
      async refreshSession() {
        const session = await CreateJSONRequest({
          method: 'GET',
          url: '/handshake',
        });
        if (session.status === 200) {
          const user = await session.json();
          this.setState({ user });
        }
      }
      async doLogin(email, password) {
        const result = await sendLoginRequest(email, password);
        if (result.status === 200) {
          const user = await result.json();
          this.setState({
            user,
          });
        }
      }

      render() {
        return (<div>
          <Component {...this.state} doLogin={this.doLogin} doRegister={doRegister} {...this.props} />
        </div>);
      }
        };
  };
}
