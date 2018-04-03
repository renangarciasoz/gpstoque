import React from 'react';
import { Route, Link } from "react-router-dom";

const MenuLeft = ({ auth }) => (
    auth.isAuthenticated ? (
        <div className="menu-left">
            <div className="logo"></div>
            <div className="menu-items">
                <ActiveMenuItem activeOnlyWhenExact={true} to="/application/dashboard" label="Dashboard" icon="fas fa-chart-line" />
                <ActiveMenuItem activeOnlyWhenExact={true} to="/application/support-area" label="Área de apoio" icon="fas fa-people-carry" />
                <ActiveMenuItem activeOnlyWhenExact={true} to="/application/warehouse" label="Almoxarifado" icon="fas fa-box-open" />
            </div>
            <div className="footer">
                <p>Versão 1.0 copyright</p>
            </div>
        </div>
    ) : (
        <div className="menu-left">
            <div className="logo"></div>
            <div className="menu-items">
            </div>
            <div className="footer">
                <p>Versão 1.0.1.2</p>
            </div>
        </div>
    )
);

const ActiveMenuItem = ({ label, to, activeOnlyWhenExact, icon }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link to={to} className={match ? "item active" : "item"}>
                <div className="rectangle"></div>
                <div className="label">
                    <i className={icon}></i>
                    <label className="item-name">{label}</label>
                </div>
            </Link>
        )}
    />
);


export default MenuLeft;