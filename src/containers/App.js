import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import MenuLeft from '../components/MenuLeft';
import Dashboard from './Dashboard';
import SupportArea from './SupportArea';
import Warehouse from './Warehouse';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert("Busca ainda está em construção");
        event.preventDefault();
    }

    Protected = () => (
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
                    <AuthButton />
                </div>
            </div>
            <div className="content">
                <Route path="/application/dashboard" component={Dashboard} />
                <Route path="/application/support-area" component={SupportArea} />
                <Route path="/application/warehouse" component={Warehouse} />
            </div>
        </div>
    );

    render() {
        return (
            <Router>
                <div className="app">
                    <MenuLeft auth={auth} />
                    <Route exact path="/" component={Login} />
                    <PrivateRoute path="/application" component={this.Protected} />
                </div>
            </Router>
        );
    };
};

export const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        auth.isAuthenticated ? (
            <button
                style={{backgroundColor: 'transparent', color: '#4da1ff', marginLeft: '10px', border: 'none', outline: 'none', cursor: 'pointer'}}
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sair
          </button>
        ) : (
                <p>Você não está mais logado</p>
            )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default App;
