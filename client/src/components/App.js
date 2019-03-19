import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React, { Component } from 'react';
import NavBar from './Header/NavBar';
import Main from './Home/Main';
import LeftNav from './Header/LeftNav';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Container>
        <NavBar />
        <LeftNav />
        <Main />
      </Container>
    );
  }
}

export default App;
