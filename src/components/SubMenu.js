
import React from 'react';
import { Route, Link } from "react-router-dom";

const SubMenu = ({menu}) => (
    <div className="sub-menu">
        <div className="title">{menu.title}</div>
        <div className="items">
            {menu.items.map(function (item, i) {
                if(!item.label) {
                    return false
                }

                return <ActiveMenuItem key={i} activeOnlyWhenExact={true} to={item.route} label={item.label} icon="fas fa-folder-open" />
            })}
        </div>
    </div>
);

const ActiveMenuItem = ({ label, to, activeOnlyWhenExact, icon }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link to={to} className={window.location.href.includes(to) ? "item active" : "item"}>
                <div className="icon"><i className={icon}></i></div>
                <div className="item-name">{label}</div>
            </Link>
        )}
    />
);

export default SubMenu;