import React, { Component } from 'react';

class NavBar extends Component {
  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    return (
      <div className="sticky-top d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm rounded-bottom bg-dark text-light">
        <h5 className="my-0 mr-md-auto font-weight-normal">TODO Together</h5>
        {!this.props.auth.isAuthenticated() && (
          <button className="btn btn-light" onClick={this.login}>
            Login
          </button>
        )}
        {this.props.auth.isAuthenticated() && (
          <span className="navbar-text mr-3">
            Hello, {localStorage.getItem('auth0-name')}
          </span>
        )}
        {this.props.auth.isAuthenticated() && (
          <button className="btn btn-secondary" onClick={this.logout}>
            Logout
          </button>
        )}
      </div>
    );
  }
}

export default NavBar;
