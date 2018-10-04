import React from 'react';
// import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
// import Dashboard from './components/Dashboard';
// import SupportArea from './components/SupportArea/SupportArea';
// import Uniform from './components/Uniform';
// import Warehouse from './components/Warehouse';
// import Login from './pages/Login';
// import Modal from "react-responsive-modal";

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { logout } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';

import MenuLeft from './components/MenuLeft';
import Routes from './routes';

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         open: false,
    //         modalMessage: '',
    //         modalTitle: '',
    //     }

    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <MenuLeft />
                    <Routes />
                </div>
                {/* <div className="app"> */}
                    {/* <h1>testeee!!</h1> */}
                    {/* <Route exact path="/" component={Login} /> */}
                    {/* <PrivateRoute path="/application" component={this.Protected} /> */}
                {/* </div> */}
            </Provider>
        );
    };

    

    // logout(e) {
    //     e.preventDefault();
    //     this.props.logout();
    // }

    // handleSubmit(event) {
    //     this.setState({
    //         open: true,
    //         modalTitle: 'Funcionalidada em construção',
    //         modalMessage: 'Desculpe o transtorno, estamos desenvolvendo essa funcionalidade.'
    //     })
    //     event.preventDefault();
    // }

    // onOpenModal = () => {
    //     this.setState({ open: true });
    // };

    // onCloseModal = () => {
    //     this.setState({ open: false });
    // };

    // logout(e) {
    //     e.preventDefault();
    //     this.props.logout();
    // }


    // Protected = () => (
    //     <div className="wrapper-right">
    //         <div className="header">
    //             <div className="search">
    //                 <form onSubmit={this.handleSubmit}>
    //                     <div className="icon">
    //                         <i className="fab fa-sistrix"></i>
    //                     </div>
    //                     <input placeholder="Buscar por palavra chave"></input>
    //                 </form>
    //             </div>
    //             <div className="user-infos">
    //                 <div className="ocupation">Operador de máquina</div>
    //                 <div className="image"></div>
    //                 <AuthButton />
    //             </div>
    //         </div>
    //         <div className="app-content">
    //             <Route path="/application/support-area" component={SupportArea} />
    //             <Route path="/application/uniform" component={Uniform} />
    //             <Route path="/application/dashboard" component={Dashboard} />
    //             <Route path="/application/warehouse" component={Warehouse} />
    //         </div>

    //         <Modal open={this.state.open} onClose={this.onCloseModal} little>
    //             <h2>{this.state.modalTitle}</h2>
    //             <p>
    //                 {this.state.modalMessage}
    //             </p>
    //         </Modal>
    //     </div>
    // );

    
};

// const AuthButton = withRouter(
//     ({ history }) =>
//         auth.isAuthenticated ? (
//             <button
//                 style={{ backgroundColor: 'transparent', color: '#4da1ff', marginLeft: '10px', border: 'none', outline: 'none', cursor: 'pointer' }}
//                 onClick={this.logout}
//             >
//                 Sair
//           </button>
//         ) : (
//                 <p>Você não está mais logado</p>
//             )
// );

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             auth.isAuthenticated ? (
//                 <Component {...props} />
//             ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/",
//                             state: { from: props.location }
//                         }}
//                     />
//                 )
//         }
//     />
// );

// const mapStateToProps = store => ({
//     auth: store.auth
// });

// const mapDispatchToProps = dispatch =>
//     bindActionCreators({ logout }, dispatch);

export default App;
