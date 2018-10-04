import React from 'react';
// import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, placeholder, onChange, checkUserExists }) => {
    return (
        <div className="input-group">
            <label className="control-label">{label}</label>
            <input
                placeholder={placeholder}
                onChange={onChange}
                onBlur={checkUserExists}
                value={value}
                type={type}
                name={field}
                // className="form-control"

            // type="text"
            // className={shouldMarkError('email') ? "error" : ""}
            // value={this.state.identifier}
            // onChange={this.onChange}
            // onBlur={this.handleBlur('email')}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;