import React, { Component } from 'react';
import './Main.css';
import Upload from './Upload';
import List from './List';

class Main extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem('isLoggedIn') && (
          <div className="main-content">
            <div className="container align-items-center p-3 px-md-4 mb-3 bg-white shadow-sm rounded">
              {this.props.auth.isAuthenticated() && (
                <div>
                  <Upload />
                </div>
              )}
            </div>
            <div className="container align-items-center p-3 px-md-4 mb-3 bg-white shadow-sm rounded">
              {this.props.auth.isAuthenticated() && (
                <div>
                  <List />
                </div>
              )}
            </div>
          </div>
        )}

        {!localStorage.getItem('isLoggedIn') && (
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <p className="lead">Please login to use the app.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
