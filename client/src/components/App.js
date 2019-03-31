import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React, { Component } from 'react';
import NavBar from './Header/NavBar';
import Main from './Home/Main';
import LeftNav from './Header/LeftNav';
import { Container } from 'semantic-ui-react';
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
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      
      // console.log(idToken);
      // return the headers to the context so httpLink can read them
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
        //console.log(res);
        // navigate to the home route
        console.log(res);
      })
      .catch(err => console.log('Sign in or create account error: ', err));

    return (
      <ApolloProvider client={client}>
        <Container>
          <NavBar {...this.props} />
          <LeftNav />
          <Main {...this.props} />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
