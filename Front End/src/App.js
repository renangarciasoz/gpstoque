import React, { Component } from 'react';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import SimpleLineIcon from 'react-simple-line-icons';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header-bar"></div>
        <div className="menu-left">
          <div className="logo-wrapper">
            <div className="logo"></div>
          </div>
          <div className="menu-items">
            <a href="#" className="item">
              <div className="rectangle"></div>
              <div className="item-label">
               icone
              </div>
            </a>

            <a href="#" className="item">
              <div className="rectangle"></div>
              <div className="item-label">
               icone
              </div>
            </a>

            <a href="#" className="item">
              <div className="rectangle"></div>
              <div className="item-label">
               icone
              </div>
            </a>
          </div>
        </div>
        <div className="main-content"></div>
      </div>
    );
  }
}

export default App;
