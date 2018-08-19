import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from './App';
import Modal from "react-responsive-modal";

function validate(email, password) {
    return {
        email: email.length === 0,
        password: password.length === 0,
    };
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            modalMessage: '',
            modalTitle: '',
            redirectToReferrer: false,
            email: '',
            password: '',

            touched: {
                email: false,
                password: false,
            },
        }
    }

    handleEmailChange = (evt) => {
        this.setState({ email: evt.target.value });
    }

    handlePasswordChange = (evt) => {
        this.setState({ password: evt.target.value });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleSubmit = (evt) => {
        const { email, password } = this.state;

        if (!this.canBeSubmitted()) {
            return;
        }

        if (email === 'admin@admin.com' && password === 'admin') {
            auth.authenticate(() => {
                this.setState({ redirectToReferrer: true });
            });
        } else {
            this.setState({
                open: true,
                modalTitle: 'Verifique seu e-mail ou senha.',
                modalMessage: `O E-mail "${email}" ou senha digitados não foi encontrado em nosso banco de dados, tente utilizar outro.`
            });
        }

        evt.preventDefault();
    }

    canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    resetPassword = (evt) => {
        this.setState({
            open: true,
            modalTitle: 'Funcionalidade em construção',
            modalMessage: 'Desculpe o transtorno, estamos desenvolvendo essa funcionalidade.'
        });

        evt.preventDefault();
    }

    render() {
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };

        // const { from } = this.props.location.state || { from: { pathname: '/application/dashboard' } };
        const { from } = { from: { pathname: 'application/support-area/request-list' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className='login-wrapper'>
                <div className='base'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Acesso</h1>
                        <div className="input-group">
                            <label>E-mail</label>
                            <input
                                placeholder="Digite o seu e-mail corporativo"
                                type="text"
                                className={shouldMarkError('email') ? "error" : ""}
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                onBlur={this.handleBlur('email')}
                            />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input
                                placeholder="Digite sua senha"
                                type="password"
                                className={shouldMarkError('password') ? "error" : ""}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                onBlur={this.handleBlur('password')}
                            />
                        </div>
                        <div className='buttons-form-group'>
                            <button value='Entrar' className='submit' disabled={isDisabled} onClick={this.handleSubmit}>Entrar</button>
                            <button value='Esqueci minha senha' className='reset-password' onClick={this.resetPassword}>Esqueci minha senha</button>
                        </div>
                    </form>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} classNames={{ modal: 'custom-modal' }} little>
                    <h2>{this.state.modalTitle}</h2>
                    <p>
                        {this.state.modalMessage}
                    </p>
                </Modal>
            </div>
        );
    }
}

export default Login;