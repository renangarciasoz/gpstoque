import React from 'react';
import styled from 'styled-components';
import history from '../routes/history';
import { connect } from 'react-redux';

const Register = styled.div`
    width: 100%;
    height: 100;
`

class RegisterForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            productOnly: ''
        }
    }

    componentDidMount() {
        let location = this.props.state.router.location.pathname.split('/'),
            product = location[location.length - 1].split('-')[0]
        
        if(!this.props.state[product] || this.props.state[product].length === 0) {
            history.push(`${product}`)
        }

        this.setState({productOnly: product})
    }

    render() {
        return (
            <Register>
                {this.state.productOnly}
                <form>
                    {
                        this.props.state[this.state.productOnly] && Object.keys(this.props.state[this.state.productOnly][0]).map((fieldKey, i) => {
                            let field = this.props.state[this.state.productOnly][0][fieldKey]

                            // Esconder campos desnecessários
                            if (["_", "createdAt", "updatedAt", "active", "id", "_id", "__v"].indexOf(fieldKey) !== -1 || fieldKey === "user" || fieldKey === "code"){
                                return false
                            }

                            // Retornar um select com os tipos.
                            if(field.name) {
                                return false
                            }

                            // Retornar um select com os items que pode adicionar.
                            if(Array.isArray(field)) {
                                return false
                            }

                            return <input key={i} placeholder={fieldKey}></input>
                        })
                    }
                </form>
            </Register>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(RegisterForm);