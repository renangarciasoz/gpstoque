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
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;