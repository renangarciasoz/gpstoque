import React from 'react';

class LoginInput extends React.Component {
    render() {
        return (
            <div className="input-group">
                <label>{this.props.title}</label>
                <input placeholder={this.props.placeholder} type={this.props.type}/>
            </div>
        );
    };
}

export default LoginInput;