import React, { Component } from 'react';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="menu-left">
          <div className="logo"></div>
          <div className="menu-items">
            <a href="" className="item">
              <div className="rectangle"></div>
              <div className="label"><i class="fas fa-chart-line"></i></div>
            </a>
          </div>
        </div>
        <div className="wrapper-right">
          <div className="header"></div>
          <div className="content"></div>
        </div>
      </div>
    );
  }
}

export default App;
