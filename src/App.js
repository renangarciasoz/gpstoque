import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';
import MenuLeft from './components/menu-left/menu-left';
import Dashboard from './components/dashboard/dashboard';
import SupportArea from './components/support-area/support-area';
import Warehouse from './components/warehouse/warehouse';

const App = () => (
    <Router>
        <div className="app">
            <MenuLeft />
            <div className="wrapper-right">
                <div className="header">
                    <div className="search">
                        <form>
                            <div className="icon">
                                <i className="fab fa-sistrix"></i>
                            </div>
                            <input placeholder="Buscar por palavra chave"></input>
                        </form>
                    </div>
                    <div className="user-infos">
                        <div className="ocupation">Operador de máquina</div>
                        <div className="image"></div>
                    </div>
                </div>
                <div className="content">
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route path="/support-area" component={SupportArea} />
                    <Route path="/warehouse" component={Warehouse} />
                </div>
            </div>
        </div>
    </Router>
);

export default App;
