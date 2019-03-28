import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './components/App';
import Callback from './components/Callback/Callback';
import Auth from './auth/Auth';
import history from './history';

/*
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

*/
const auth = new Auth();
/*
const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken)
  }
`;
const idToken = auth.getIdToken();
client
  .mutate({
    variables: { idToken },
    mutation: AUTHENTICATE
  })
  .then(res => {
    //console.log(res);
    // navigate to the home route
    history.replace('/home');
  })
  .catch(err => console.log('Sign in or create account error: ', err));

  */

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
