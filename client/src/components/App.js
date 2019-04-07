import React, { Component } from 'react';
import NavBar from './Header/NavBar';
import Main from './Home/Main';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/',
      credentials: 'same-origin'
    });
    const idToken = this.props.auth.getIdToken();
    console.log(idToken);
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

    const AUTHENTICATE = gql`
      mutation authenticate($idToken: String!) {
        authenticate(idToken: $idToken)
      }
    `;

    client
      .mutate({
        variables: { idToken },
        mutation: AUTHENTICATE
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log('Sign in or create account error: ', err));

    return (
      <ApolloProvider client={client}>
        <div className="container">
          <NavBar {...this.props} />
          <Main {...this.props} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
