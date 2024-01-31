import './Input.css';

const Input = ({className, type, active = false, placeholder, value, autoFocus, disabled, ...rest}) =>
{
    return (
        <input
            {...rest}
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            type={type}
            className={(!active ? "Input" : "Input Input-Active") + " " + className}
        />
    );
}

export default Input;
