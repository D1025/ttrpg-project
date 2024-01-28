import './Input.css';

const Input = ({type, active = false, placeholder, value, autoFocus, disabled, ...rest}) =>
{
    return (
        <input
            {...rest}
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            type={type}
            className={!active ? "Input" : "Input Input-Active"}
        />
    );
}

export default Input;
