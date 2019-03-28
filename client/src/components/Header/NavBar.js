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
    console.log('navbar');
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
      <Menu fixed="top" inverted size="large">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          {!this.props.auth.isAuthenticated() && (
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={this.login}
            />
          )}
          {this.props.auth.isAuthenticated() && (
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.logout}
            />
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
