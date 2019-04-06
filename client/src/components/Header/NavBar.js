import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class NavBar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

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
    const { activeItem } = this.state;

    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">TODO Together</h5>
        {!this.props.auth.isAuthenticated() && (
          <a className="btn btn-outline-primary" href="#" onClick={this.login}>
            Login
          </a>
        )}
        {this.props.auth.isAuthenticated() && (
          <span className="navbar-text mr-3">
            Hello, {localStorage.getItem('auth0-name')}
          </span>
        )}
        {this.props.auth.isAuthenticated() && (
          <a className="btn btn-outline-secondary" href="#" onClick={this.logout}>
            Logout
          </a>
        )}
      </div>
    );
  }
}

export default NavBar;
