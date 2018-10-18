import React from 'react';
import { Route, Link } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from 'react-redux';
import history from "../routes/history";

class MenuLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {
                    path: '/application/dashboard', 
                    label: 'Dashboard', 
                    icon: 'fas fa-chart-line'
                },
                {
                    path: '/application/support-area', 
                    label: 'Área de apoio', 
                    icon: 'fas fa-file-alt'
                },
                {
                    path: '/application/uniform', 
                    label: 'Uniformes', 
                    icon: 'fas fa-male'
                },
                {
                    path: '/application/order', 
                    label: 'Pedidos / Fornecedor', 
                    icon: 'fas fa-shopping-bag'
                },
                {
                    path: '/application/client', 
                    label: 'Clientes / Contratos', 
                    icon: 'fas fa-id-badge'
                }]
        }
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const { pathname } = this.props.router.location;

        return (
            isAuthenticated ? (
                <div className="menu-left">
                    <div className="logo"></div>
                    <div className="menu-items">
                        <ConnectedRouter history={history}>
                            <div>
                                {this.state.menu.map((menu, i) => {
                                    return <ActiveMenuItem key={i} activeOnlyWhenExact={true} to={menu.path} pathname={pathname} label={menu.label} icon={menu.icon} />
                                })}
                            </div>
                        </ConnectedRouter>
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
        )
    }
}

const ActiveMenuItem = ({ label, to, pathname, activeOnlyWhenExact, icon }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={() => (
            <Link to={to} className={pathname.includes(to) ? "item active" : "item"}>
                <div className="rectangle"></div>
                <div className="label">
                    <i className={icon}></i>
                    <label className="item-name">{label}</label>
                </div>
            </Link>
        )}
    />
);

function mapStateToProps(state) {
    return {
        auth: state.auth,
        router: state.router
    };
}

export default connect(mapStateToProps, {})(MenuLeft);