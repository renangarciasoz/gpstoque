import React, { Component } from 'react';

class MenuLeft extends Component {
    render() {
        return (
            <div className="menu-left">
                <div className="logo"></div>
                <div className="menu-items">
                    <a href="" className="item">
                        <div className="rectangle"></div>
                        <div className="label">
                            <i className="fas fa-chart-line"></i>
                            <label className="item-name">Dashboard</label>
                        </div>
                    </a>

                    <a href="" className="item">
                        <div className="rectangle"></div>
                        <div className="label">
                            <i className="fas fa-people-carry"></i>
                            <label className="item-name">Área de apoio</label>
                        </div>
                    </a>

                    <a href="" className="item">
                        <div className="rectangle"></div>
                        <div className="label">
                            <i className="fas fa-box-open"></i>
                            <label className="item-name">Almoxarifado</label>
                        </div>
                    </a>
                </div>
                <div className="footer">
                    <p>versão 1.0 copryght</p>
                </div>
            </div>
        );
    }
}

export default MenuLeft;