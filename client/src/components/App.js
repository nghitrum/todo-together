import React, { Component } from 'react';
import NavBar from './Header/NavBar';
import Main from './Home/Main';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { AUTHENTICATE } from './GQL/Mutation';

class App extends Component {
  render() {
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_SERVER_URL,
      credentials: process.env.CORS_CREDENTIALS
    });
    const idToken = this.props.auth.getIdToken();
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: idToken ? `${idToken}` : ''
        }
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });

    client
      .mutate({
        variables: { idToken },
        mutation: AUTHENTICATE
      })
      .catch(err => console.log('Sign in or create account error: ', err));

    return (
      <ApolloProvider client={client}>
          <NavBar {...this.props} />
          <Main {...this.props} />
      </ApolloProvider>
    );
  }
}

export default App;
