import React from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';


export default function withApp(options) {
  return function (Component) {
    return class withApp extends React.Component {
      static async getInitialProps(ctx) {
        const headers = ctx.req ? ctx.req.headers : {};
        return {
          headers,
        };
      }
      constructor(props) {
        super(props);
        const networkInterface = createNetworkInterface({
          uri: 'http://localhost:3000/graphql',
          opts: {
            credentials: 'same-origin',
          },
        });

        this.client = new ApolloClient({
          headers: props.headers,
          networkInterface,
        });
      }
      render() {
        return (<div>
          <ApolloProvider client={this.client}>
            <Component msg="hello" {...this.props} />
          </ApolloProvider>
        </div>);
      }
    };
  };
}
