import React from 'react';
import './XInput.css';

const XInput = ({type, active=false, name, placeholder, value, autoFocus, required, disabled, ...rest}) =>
{
    let klasy = "XInput";

    if(active === true)
    {
        klasy += " XInput-Active";
    }

    return (
        <input
            {...rest}
            autoFocus={autoFocus}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            type={type}
            name={name}
            className={klasy}
        />
    );
}

export default XInput;
