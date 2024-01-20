import React from 'react';
import './Input.css';

const Input = ({type, active=false, title, placeholder, value, autoFocus, required, disabled, ...rest}) =>
{
    let klasy = "Input";

    if(active === true)
    {
        klasy += " Input-Active";
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
            name={title}
            className={klasy}
        />
    );
}

export default Input;
