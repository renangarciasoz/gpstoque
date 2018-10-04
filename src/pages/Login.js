import React from 'react';
import { Redirect } from 'react-router-dom';
// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';
import TextFieldGroup from '../components/TextFieldGroup';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { clickButton } from '../actions';
import { login } from '../actions/authActions';
import Modal from "react-responsive-modal";
import history from "../routes/history";

// function validate(email, password) {
//     return {
//         email: email.length === 0,
//         password: password.length === 0,
//     };
// }

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // inputValue: 'teste dois com redux',
            open: false,
            modalMessage: '',
            modalTitle: '',
            redirectToReferrer: false,
            // email: '',
            identifier: '',
            password: '',
            errors: {},
            isLoading: false,

            touched: {
                email: false,
                password: false,
            },
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.auth.isAuthenticated ? history.push('/application') :  history.push('/')
    }

    // inputChange = event => {
    //     this.setState({
    //         inputValue: event.target.value
    //     })
    // }

    // handleEmailChange = (evt) => {
    //     this.setState({ email: evt.target.value });
    // }

    // handlePasswordChange = (evt) => {
    //     this.setState({ password: evt.target.value });
    // }

    // handleBlur = (field) => (evt) => {
    //     this.setState({
    //         touched: { ...this.state.touched, [field]: true },
    //     });
    // }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    // handleSubmit = (evt) => {
    //     const { email, password } = this.state;

    //     if (!this.canBeSubmitted()) {
    //         return;
    //     }

    //     if (email === 'admin@admin.com' && password === 'admin') {
    //         auth.authenticate(() => {
    //             this.setState({ redirectToReferrer: true });
    //         });
    //     } else {
    //         this.setState({
    //             open: true,
    //             modalTitle: 'Verifique seu e-mail ou senha.',
    //             modalMessage: `O E-mail "${email}" ou senha digitados não foi encontrado em nosso banco de dados, tente utilizar outro.`
    //         });
    //     }

    //     evt.preventDefault();
    // }

    // canBeSubmitted() {
    //     const errors = validate(this.state.email, this.state.password);
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    //     return !isDisabled;
    // }

    resetPassword = (evt) => {
        this.setState({
            open: true,
            modalTitle: 'Funcionalidade em construção',
            modalMessage: 'Desculpe o transtorno, estamos desenvolvendo essa funcionalidade.'
        });

        evt.preventDefault();
    }

    validateInput(data) {
        let errors = {};

        // if (Validator.isNull(data.identifier)) {
        //     errors.identifier = 'This field is required';
        // }

        // if (Validator.isNull(data.password)) {
        //     errors.password = 'This field is required';
        // }

        return {
            errors,
            isValid: true
        };
    }

    isValid() {
        const { errors, isValid } = this.validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                (res) => this.setState({ redirectToReferrer: true }),
                // (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                (err) => this.setState({
                    open: true,
                    modalTitle: 'Verifique seu e-mail ou senha.',
                    modalMessage: `O E-mail "${this.state.identifier}" ou senha digitados não foi encontrado em nosso banco de dados, tente utilizar outro.`,
                    isLoading: false
                })
            );
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, password, isLoading } = this.state;
        
        const { from } = { from: { pathname: 'application/support-area/request-list' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className='login-wrapper'>
                <div className='base'>
                    <form onSubmit={this.onSubmit}>
                        <h1>Acesso</h1>

                        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                        <TextFieldGroup
                            placeholder="Digite o seu e-mail corporativo"
                            field="identifier"
                            label="E-mail"
                            value={identifier}
                            error={errors.identifier}
                            onChange={this.onChange}
                        />

                        <TextFieldGroup
                            field="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            value={password}
                            error={errors.password}
                            onChange={this.onChange}
                            type="password"
                        />

                        <div className='buttons-form-group'>
                            <button value='Entrar' className='submit' disabled={isLoading} onClick={this.onSubmit}>Entrar</button>
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

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, {login})(Login);