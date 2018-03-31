import React, { Component } from 'react';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import MenuLeft from './components/menu-left/menu-left';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MenuLeft/>
        <div className="wrapper-right">
          <div className="header"></div>
          <div className="content"></div>
        </div>
      </div>
    );
  }
}

export default App;
