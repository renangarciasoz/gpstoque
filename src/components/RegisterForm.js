import React from 'react';
import styled from 'styled-components';
import history from '../routes/history';
import { fetchRequests } from '../actions/fetchRequests';
import { fetchDevolutions } from '../actions/fetchDevolutions';
import { fetchUniforms, fetchTypeuniforms } from '../actions/fetchUniforms';
import { fetchCustomers } from '../actions/fetchCustomers';
import { fetchProviders } from '../actions/fetchProviders';
import { fetchOrders } from '../actions/fetchOrders';
import { fetchStatus } from '../actions/fetchStatus';
import { connect } from 'react-redux';

const Register = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const RegisterWrapper = styled.div`
    max-height: calc(100% - 100px);
    display: flex;
    overflow: scroll;
    margin-top: 20px;

    form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
`

const Fieldset = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    margin-right: 30px;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;

        select {
            outline: none;
        }

        button {
            border: 1px solid #ccc;
            border-radius: 2px;
            margin-left: 2px;
            font-size: 14px;
        }
    }

    label {
        text-transform: uppercase;
        font-size: 14px;
        color: #323c47;
    }

    input {
        border-radius: 2px;
        background: transparent;
        outline: none;
        border: 1px solid #ccc;
        padding: 5px;
    }
`

const ActionsRegister = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
        background: linear-gradient(315deg,#0097f6,#005eea);
        border: none;
        border-radius: 4px;
        padding: 10px;
        color: white;
        cursor: pointer;
        outline: none;
        margin-right: 10px;
    }
`

class RegisterForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            productOnly: '',
            item: null,
            itemPost: {},
            itemParam: false,

            traductions: {
                uniforms: "uniformes",
                code: "Código",
                description: "Descrição",
                devolutions: "Devoluções",
                requests: "Solicitações"
            }
        }
    }

    componentDidMount() {
        let location = this.props.state.router.location.pathname.split('/'),
            product = location[location.length - 1].split('-')[0]
        
        if(!this.props.state[product] || this.props.state[product].length === 0) {
            history.push(`${product}`)
        }

        this.setState({productOnly: product})

        let url = new URL(window.location.href);
        let itemCode = url.searchParams.get("item");
        
        if(itemCode) {
            let itemProduct = this.props.state[product].filter((item, key) => {
                return item && item.code === itemCode;
            })
           return this.setState({itemParam: true, item: itemProduct}) 
        }

        if(!itemCode && this.props.state[product]) {
            return this.setState({itemParam: false, item: this.props.state[product][0]})
        }
    }

    render() {
        return (
            <Register>
                <h3>{this.state.productOnly}</h3>
                <RegisterWrapper>
                    <form>
                        {this.state.item && Object.keys(this.state.item).map((fieldKey, i) => {
                            let field = this.state.item[fieldKey]

                            // Esconder campos desnecessários
                            if (["_", "createdAt", "updatedAt", "active", "id", "_id", "__v"].indexOf(fieldKey) !== -1 || fieldKey === "user" || fieldKey === "status"){
                                return false
                            }
                            
                            if(fieldKey === "description") {
                                if(!this.state.itemParam) {
                                    return (
                                        <Fieldset key={i}>
                                            <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                            <textarea></textarea>
                                        </Fieldset>
                                    )
                                }

                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <textarea value={field}></textarea>
                                    </Fieldset>
                                )
                            }

                            if(fieldKey === "email") {
                                if(!this.state.itemParam) {
                                    return (
                                        <Fieldset key={i}>
                                            <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                            <input type="email"></input>
                                        </Fieldset>
                                    )
                                }

                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <input type="email" value={field}></input>
                                    </Fieldset>
                                )
                            }

                            if(fieldKey === "code") {
                                if(!this.state.itemParam) {
                                    return (
                                        <Fieldset key={i}>
                                            <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                            <input type="number" disabled value={this.props.state[this.state.productOnly].length + 1}></input>
                                        </Fieldset>
                                    )
                                }

                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <input type="number" disabled value={field}></input>
                                    </Fieldset>
                                )                                
                            }

                            // Retornar um select com os tipos.
                            if(field.name) {
                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <select>
                                            <option>1</option>
                                        </select>
                                    </Fieldset>
                                )
                            }

                            // Retornar um select com os items que pode adicionar.
                            if(fieldKey === "uniforms") {
                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <div>
                                            <select>
                                                <option>selecione</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </select>
                                            <button>+</button>
                                        </div>
                                        <div>
                                            <div>
                                                <span>uniforme name</span>
                                                <button>x</button>
                                            </div>
                                        </div>
                                    </Fieldset>
                                )
                            }

                            if(!this.state.itemParam) {
                                return (
                                    <Fieldset key={i}>
                                        <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                        <input type="text"></input>
                                    </Fieldset>
                                )
                            }

                            return (
                                <Fieldset key={i}>
                                    <label>{this.state.traductions[fieldKey] || fieldKey}</label>
                                    <input type="text" value={field}></input>
                                </Fieldset>
                            )
                        })}
                    </form>
                </RegisterWrapper>
                <ActionsRegister>
                    <button>Cancelar</button>
                    <button>Registrar</button>
                </ActionsRegister>
            </Register>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        state: state
    }
}

const mapDispatchToProps = {
    fetchCustomers,
    fetchStatus,
    fetchProviders,
    fetchOrders,
    fetchUniforms,
    fetchTypeuniforms,
    fetchDevolutions,
    fetchRequests
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);