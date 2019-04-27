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
      <div className="sticky-top d-flex flex-row align-items-center p-3 px-md-4 mb-3 shadow bg-dark text-light">
        <h5 className="my-0 mr-auto font-weight-normal">
          <span>TODO </span><span className="d-none d-sm-inline">Together</span>
        </h5>
        {!this.props.auth.isAuthenticated() && (
          <button className="btn btn-light" onClick={this.login}>
            <i className="fas fa-user-plus"></i> Login
          </button>
        )}
        {this.props.auth.isAuthenticated() && (
          <span className="navbar-text mr-3 d-none d-sm-block">
            Hello, {localStorage.getItem('auth0-name')}
          </span>
        )}
        {this.props.auth.isAuthenticated() && (
          <button className="btn btn-secondary" onClick={this.logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </div>
    );
  }
}

export default NavBar;
