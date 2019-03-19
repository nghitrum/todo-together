import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <Segment className="main-content">
        <div className="ui cards">
          <div className="ui red fluid card">
            <div className="content">
              <div className="header">Option 1</div>
            </div>
          </div>
          <div className="ui orange fluid card">
            <div className="content">
              <div className="header">Option 2</div>
            </div>
          </div>
          <div className="ui yellow fluid card">
            <div className="content">
              <div className="header">Option 3</div>
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}

export default Main;
