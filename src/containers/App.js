import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import MenuLeft from '../components/MenuLeft';
import Dashboard from './Dashboard';
import SupportArea from './SupportArea/SupportArea';
import Uniform from './Uniform';
import Warehouse from './Warehouse';
import Login from './Login';
import Modal from "react-responsive-modal";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modalMessage: '',
            modalTitle: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            open: true,
            modalTitle: 'Funcionalidada em construção',
            modalMessage: 'Desculpe o transtorno, estamos desenvolvendo essa funcionalidade.'
        })
        event.preventDefault();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

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
            <div className="app-content">
                <Route path="/application/support-area" component={SupportArea} />
                <Route path="/application/uniform" component={Uniform} />
                <Route path="/application/dashboard" component={Dashboard} />
                <Route path="/application/warehouse" component={Warehouse} />
            </div>

            <Modal open={this.state.open} onClose={this.onCloseModal} little>
                <h2>{this.state.modalTitle}</h2>
                <p>
                    {this.state.modalMessage}
                </p>
            </Modal>
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
