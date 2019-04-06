import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getPayload = this.getPayload.bind(this);

    this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token'
    });

    this.accessToken = '';
    this.idToken = '';
    this.expiresAt = '';
    this.payload = '';
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  getPayload() {
    return this.payload;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.payload = authResult.idTokenPayload;

    if (!localStorage.getItem('auth0-name')) {
      localStorage.setItem('auth0-name', this.payload.name);
    }
    console.log(authResult);
    history.replace('/home');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('auth0-name');

    this.auth0.logout({
      returnTo: AUTH_CONFIG.clientUrl,
      client_id: AUTH_CONFIG.clientId
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    //console.log(this.expiresAt);
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
