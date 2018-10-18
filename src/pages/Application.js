import React from 'react';
import { Route } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import SupportArea from '../components/SupportArea/SupportArea';
import Uniform from '../components/Uniform';
import Warehouse from '../components/Warehouse';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { fetchUser } from '../actions/fetchUser';

class Application extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="wrapper-right">
                <div className="header">
                    <div className="search">
                        <form onSubmit={this.handleSubmit}>
                            <div className="icon">
                                <i className="fab fa-sistrix"></i>
                            </div>
                            <input placeholder="Buscar por palavra chave"></input>
                        </form>
                    </div>
                    <div className="user-infos">
                        <div className="ocupation">Operador de máquina</div>
                        <div className="image"></div>
                        <button
                            style={{ backgroundColor: 'transparent', color: '#4da1ff', marginLeft: '10px', border: 'none', outline: 'none', cursor: 'pointer' }}
                            onClick={this.logout.bind(this)}
                        >
                            Sair
                        </button>
                    </div>
                </div>
                <div className="app-content">
                    <Route path="/application/support-area" component={SupportArea} />
                    <Route path="/application/uniform" component={Uniform} />
                    <Route path="/application/dashboard" component={Dashboard} />
                    <Route path="/application/warehouse" component={Warehouse} />
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        userInfos: state.userInfos
    };
}

export default connect(mapStateToProps, { logout, fetchUser })(Application);