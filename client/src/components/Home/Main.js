import React, { Component } from 'react';
import './Main.css';
import Upload from './Upload';
import List from './List';

class Main extends Component {
  render() {
    // console.log(this.props.auth.isAuthenticated());
    // console.log(this.props.auth.getIdToken())
    return (
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
    );
  }
}

export default Main;
